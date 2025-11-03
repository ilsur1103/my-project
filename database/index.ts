/**
 * Database Index
 * Auto-generated file - provides easy access to all collections
 */

export interface CollectionData {
  collectionId: string;
  version: number;
  records: Record<string, any>[];
  recordCount: number;
  lastModified: string;
}

export interface CollectionMeta {
  id: string;
  name: string;
  description?: string;
  type: 'simple' | 'supabase' | 'api' | 'csv';
  icon?: string;
  fields: any[];
  dataFileId: string;
  createdAt: string;
  updatedAt: string;
  supabaseConfig?: any;
  apiConfig?: any;
}

export const collectionFiles = {
  'collection_1762158479582': () => import('./collections/collection_1762158479582.json')
};

export async function loadCollectionData(collectionId: string): Promise<CollectionData | null> {
  const loader = collectionFiles[collectionId];
  if (!loader) {
    console.warn(`Collection ${collectionId} not found`);
    return null;
  }
  
  try {
    const module = await loader();
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load collection ${collectionId}:`, error);
    return null;
  }
}

export async function loadAllCollections(): Promise<Map<string, CollectionData>> {
  const collections = new Map<string, CollectionData>();
  
  for (const [id, loader] of Object.entries(collectionFiles)) {
    const data = await loadCollectionData(id);
    if (data) {
      collections.set(id, data);
    }
  }
  
  return collections;
}

/**
 * Production Runtime Service
 * Handles collection data operations in the deployed application
 */
export class ProductionCollectionService {
  private static collections: Map<string, any> = new Map();
  private static initialized = false;
  
  /**
   * Initialize collections from database files
   */
  static async initialize(collectionMetas: CollectionMeta[]): Promise<void> {
    if (this.initialized) return;
    
    // Try to load from database files
    try {
      const data = await loadAllCollections();
      
      collectionMetas.forEach(meta => {
        const collectionData = data.get(meta.id);
        if (collectionData) {
          this.collections.set(meta.id, {
            meta,
            records: collectionData.records,
          });
        } else {
          // Initialize with empty data
          this.collections.set(meta.id, {
            meta,
            records: [],
          });
        }
      });
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize collections from database:', error);
      // Initialize with empty data
      collectionMetas.forEach(meta => {
        this.collections.set(meta.id, {
          meta,
          records: [],
        });
      });
      this.initialized = true;
    }
  }
  
  /**
   * Get collection data
   */
  static getCollection(collectionId: string): { meta: CollectionMeta, records: Record<string, any>[] } | null {
    return this.collections.get(collectionId) || null;
  }
  
  /**
   * Get all records from a collection
   */
  static getRecords(collectionId: string): Record<string, any>[] {
    const collection = this.collections.get(collectionId);
    return collection?.records || [];
  }
  
  /**
   * Get a single record by ID
   */
  static getRecord(collectionId: string, recordId: string): Record<string, any> | null {
    const records = this.getRecords(collectionId);
    return records.find(r => r.id === recordId) || null;
  }
  
  /**
   * Add a record (in-memory only, or sync to Supabase if configured)
   */
  static addRecord(collectionId: string, record: Record<string, any>): void {
    const collection = this.collections.get(collectionId);
    if (!collection) {
      console.error(`Collection ${collectionId} not found`);
      return;
    }
    
    const newRecord = {
      ...record,
      id: record.id || `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    
    collection.records.push(newRecord);
    
    // If Supabase is configured, sync there
    // This would be implemented based on the collection's supabaseConfig
  }
  
  /**
   * Update a record
   */
  static updateRecord(collectionId: string, recordId: string, updates: Record<string, any>): void {
    const collection = this.collections.get(collectionId);
    if (!collection) {
      console.error(`Collection ${collectionId} not found`);
      return;
    }
    
    const index = collection.records.findIndex(r => r.id === recordId);
    if (index !== -1) {
      collection.records[index] = { ...collection.records[index], ...updates };
    }
  }
  
  /**
   * Delete a record
   */
  static deleteRecord(collectionId: string, recordId: string): void {
    const collection = this.collections.get(collectionId);
    if (!collection) {
      console.error(`Collection ${collectionId} not found`);
      return;
    }
    
    collection.records = collection.records.filter(r => r.id !== recordId);
  }
  
  /**
   * Query records with filters
   */
  static queryRecords(
    collectionId: string,
    filter?: (record: Record<string, any>) => boolean,
    sort?: { field: string, order: 'asc' | 'desc' },
    limit?: number,
    offset?: number
  ): Record<string, any>[] {
    let records = this.getRecords(collectionId);
    
    // Apply filter
    if (filter) {
      records = records.filter(filter);
    }
    
    // Apply sort
    if (sort) {
      records = [...records].sort((a, b) => {
        const aVal = a[sort.field];
        const bVal = b[sort.field];
        
        if (aVal < bVal) return sort.order === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.order === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Apply pagination
    if (offset !== undefined || limit !== undefined) {
      const start = offset || 0;
      const end = limit ? start + limit : undefined;
      records = records.slice(start, end);
    }
    
    return records;
  }
}

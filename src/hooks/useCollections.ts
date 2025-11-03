/**
 * Collection Hooks
 * Provides React hooks for working with collections in production
 */

import { useState, useEffect, useCallback } from 'react';
import { ProductionCollectionService } from '../database/index';

export interface UseCollectionResult {
  records: Record<string, any>[];
  loading: boolean;
  error: string | null;
  addRecord: (record: Record<string, any>) => void;
  updateRecord: (recordId: string, updates: Record<string, any>) => void;
  deleteRecord: (recordId: string) => void;
  queryRecords: (
    filter?: (record: Record<string, any>) => boolean,
    sort?: { field: string; order: 'asc' | 'desc' },
    limit?: number,
    offset?: number
  ) => Record<string, any>[];
}

/**
 * Hook to use a collection
 */
export function useCollection(collectionId: string): UseCollectionResult {
  const [records, setRecords] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const collectionRecords = ProductionCollectionService.getRecords(collectionId);
      setRecords(collectionRecords);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load collection');
      setLoading(false);
    }
  }, [collectionId]);

  const addRecord = useCallback((record: Record<string, any>) => {
    try {
      ProductionCollectionService.addRecord(collectionId, record);
      setRecords(ProductionCollectionService.getRecords(collectionId));
    } catch (err) {
      console.error('Failed to add record:', err);
    }
  }, [collectionId]);

  const updateRecord = useCallback((recordId: string, updates: Record<string, any>) => {
    try {
      ProductionCollectionService.updateRecord(collectionId, recordId, updates);
      setRecords(ProductionCollectionService.getRecords(collectionId));
    } catch (err) {
      console.error('Failed to update record:', err);
    }
  }, [collectionId]);

  const deleteRecord = useCallback((recordId: string) => {
    try {
      ProductionCollectionService.deleteRecord(collectionId, recordId);
      setRecords(ProductionCollectionService.getRecords(collectionId));
    } catch (err) {
      console.error('Failed to delete record:', err);
    }
  }, [collectionId]);

  const queryRecords = useCallback((
    filter?: (record: Record<string, any>) => boolean,
    sort?: { field: string; order: 'asc' | 'desc' },
    limit?: number,
    offset?: number
  ) => {
    return ProductionCollectionService.queryRecords(collectionId, filter, sort, limit, offset);
  }, [collectionId]);

  return {
    records,
    loading,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    queryRecords,
  };
}


/**
 * Hook for New Simple Collection collection
 */
export function useNew Simple CollectionCollection() {
  return useCollection('collection_1762158479582');
}


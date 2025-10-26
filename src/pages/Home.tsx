import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import Custom17614079904442 from '../components/Custom17614079904442';

export default function Home() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({ isOpen: false, pageId: null, title: '', closable: true });
  const [variable1, setVariable1] = useState("765");

  return (
    <>
      <div
        id="page-1761407980108"
        style={{
        width: '1440px',
        minHeight: '1024px',
        backgroundColor: '#ffffff',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif'
        }}
      >
      <Input
        type="text"
        placeholder="Enter text..."
        value={variable1}
        onChange={(e) => setVariable1(e.target.value)}
        style={{"position":"absolute","left":"50px","top":"50px","width":"200px","height":"40px"}}
      />
      <Custom17614079904442 text={variable1} title="Custom Component" count={0} isActive={false} />
      <Button onClick={() => navigate('/page2')} style={{"position":"relative","left":"50px","top":"230px","width":"120px","height":"40px"}}>
        Button
      </Button>
      <Button onClick={() => setModalState({ isOpen: true, pageId: 'page-1761489007826', title: '', closable: true })} style={{"position":"relative","left":"184px","top":"190px","width":"144px","height":"40px"}}>
        Open in modal
      </Button>
      </div>
  
  {/* Modal Dialog */}
  <Dialog open={modalState.isOpen} onOpenChange={(open) => {
    if (!open && modalState.closable) {
      setModalState({ isOpen: false, pageId: null, title: '', closable: true });
    }
  }}>
    <DialogContent 
      className="max-w-4xl max-h-[90vh] overflow-y-auto"
      onInteractOutside={(e) => {
        if (!modalState.closable) {
          e.preventDefault();
        }
      }}
    >
      {modalState.title && (
        <DialogHeader>
          <DialogTitle>{modalState.title}</DialogTitle>
        </DialogHeader>
      )}
      <div className="mt-4">
      {modalState.pageId === 'page-1761489007826' && (
        <div style={{
          backgroundColor: '#ffffff',
          minHeight: '400px',
          position: 'relative'
        }}>
            <div style={{"position":"relative","left":"50px","top":"50px","width":"200px","height":"auto"}}>
              This is Page 2
            </div>
        </div>
      )}
      </div>
    </DialogContent>
  </Dialog>
    </>
  );
}

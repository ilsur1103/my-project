import { useState } from 'react';
import Custom17614079904442 from '../components/Custom17614079904442';

export default function Home() {
  const [variable1, setVariable1] = useState("765");

  return (
    <div
      id="page-1761407980108"
      style={{
        width: '1440px',
        minHeight: '1024px',
        backgroundColor: '#ffffff',
        position: 'relative',
        margin: '0 auto'
      }}
    >
      <input
        type="text"
        placeholder="Enter text..."
        value={variable1}
        onChange={(e) => setVariable1(e.target.value)}
        style={{"position":"absolute","left":"50px","top":"50px","width":"200px","height":"40px"}}
      />
      <Custom17614079904442 text={variable1} title="Custom Component" count={0} isActive={false} />
    </div>
  );
}

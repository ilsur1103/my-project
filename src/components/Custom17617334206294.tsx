import React, { useState } from 'react';

const runBlockingTest = (iterations: number): number => {
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i);
  }
  return result;
};

const CPUTestBlocking: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const iterations = 500000; // Adjust for test intensity

  const handleStartTest = () => {
    setIsTesting(true);
    setTimeTaken(null);
    
    // Start measuring time
    const startTime = performance.now();
    
    // This blocks the main thread
    runBlockingTest(iterations);
    
    // Stop measuring time
    const endTime = performance.now();
    
    setIsTesting(false);
    setTimeTaken(endTime - startTime);
  };

  return (
    <div>
      <h3>Simple Blocking CPU Test</h3>
      <p>This test runs on the main thread and will freeze the UI.</p>
      <button onClick={handleStartTest} disabled={isTesting}>
        {isTesting ? 'Testing...' : 'Start Test'}
      </button>
      {timeTaken !== null && (
        <p>Test completed in {timeTaken.toFixed(2)} ms.</p>
      )}
    </div>
  );
};

export default CPUTestBlocking;
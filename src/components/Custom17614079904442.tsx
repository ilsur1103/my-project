import React from 'react';

interface CustomComponentProps {
  // Define your props here (these will appear in the Property Panel)
  text?: string;
  title?: string;
  count?: number;
  isActive?: boolean;
  className?: string;
}

export default function CustomComponent({ 
  text = 'Hello', 
  title = 'Custom Component',
  count = 0,
  isActive = false,
  className 
}: CustomComponentProps) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <p>{text}</p>
      <p>Count: {count}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
    </div>
  );
}

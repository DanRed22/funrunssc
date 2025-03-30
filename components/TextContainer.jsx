import React from 'react';

function TextContainer({ message, className }) {
  return <div className={`border-4  text-wrap ${className}`}>{message}</div>;
}

export default TextContainer;

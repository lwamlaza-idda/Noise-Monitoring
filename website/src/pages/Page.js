import React from 'react';

const Page = ({ title, children }) => {
  return (
    <div className="page">
      <h1>{title}</h1>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default Page; 
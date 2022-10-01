import React from 'react';
import SignForm from '../components/Sign'


const Sign = () => {
  return (
    <div className="page_container">
      <SignForm signin={false} signup={true} />
    </div>
  );
};

export default Sign;
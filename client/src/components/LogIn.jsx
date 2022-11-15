import React from 'react';

const { useState } = React;

const LogIn = ({ setEmail }) => {
  const [emailInput, setEmailInput] = useState('');

  const handleSubmitClick = () => {
    if (emailInput !== '') {
      let emailSplit1 = emailInput.split('@');
      if (emailSplit1.length >= 2) {
        let emailSplit2 = emailInput.split('.');
        if (emailSplit2.length >= 2) {
          setEmail(emailInput);
        }
      }
    }
  };

  return(
    <div className='log-in-container'>
      <div className='log-in'>
        <h2> Log In </h2>
        <label> Enter Your Email: </label>
        <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)}></input>
        <button onClick={() => handleSubmitClick()}> Submit </button>
      </div>
    </div>
  );
};

export default LogIn;
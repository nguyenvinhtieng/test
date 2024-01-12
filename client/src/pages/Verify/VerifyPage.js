import React, { useState } from 'react';
import axios from 'axios';

const VerifyPage = ({ onVerify }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/verify', { verificationCode });
      onVerify(response.data.user);
    } catch (error) {
      console.error('Failed to verify email', error);
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyPage;
'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

export default function Page() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const in30Minutes = 1 / 48;
  const handleSubmit = async () => {
    if (!data.email || !data.password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/login', data);

      if (response.status === 200) {
        // Store the token in cookies
        Cookies.set('token', response.data.token, { expires: in30Minutes }); // 1 day expiry

        alert('Login Successful');
      } else {
        alert(`Login failed with error ${response.status}`);
      }
    } catch (error) {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col">
        <p className="text-5xl !mt-4">Login</p>
        <input
          className="nes-input !my-4 !w-[30rem] !text-2xl"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          className="nes-input !w-[30rem] !text-2xl"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`nes-btn is-primary !my-8 !text-2xl ${
            loading ? 'opacity-50' : ''
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

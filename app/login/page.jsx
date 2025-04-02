'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async () => {
    if (!data.email || !data.password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/login', data);

      if (response.status === 200) {
        console.log('resdata', response.data);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('name', response.data.name);
        setRedirecting(true); // Trigger useEffect for redirection
      } else {
        alert(`Login failed with error ${response.status}`);
      }
    } catch (error) {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (redirecting) {
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 500); // Delay to ensure proper execution
    }
  }, [redirecting, router]);

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
          disabled={true}
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

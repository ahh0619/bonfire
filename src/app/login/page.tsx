'use client';

import { login } from './actions';

const LoginPage = () => {
  return (
    <form action={login}>
      <label htmlFor="email">Email:</label>
      <input
        className="border border-gray-300 rounded-md p-2"
        id="email"
        name="email"
        type="email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        className="border border-gray-300 rounded-md p-2"
        id="password"
        name="password"
        type="password"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Log in
      </button>
    </form>
  );
};

export default LoginPage;

'use client';
import Image from 'next/image';
import { signup } from '../login/actions';
import { useState } from 'react';

const SignUpPage = () => {
  return (
    <form action={signup} className="mt-40">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          id="email"
          name="email"
          type="text"
          required
        />
      </div>
      <div>
        <label htmlFor="nickname">Nickname:</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          id="nickname"
          name="nickname"
          type="text"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          className="border border-gray-300 rounded-md p-2"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          required
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignUpPage;

'use client';

import { useForm } from 'react-hook-form';

type InputProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: ReturnType<typeof useForm>['register'];
  error?: string;
  validation?: object;
};

const Input = ({
  id,
  label,
  type,
  placeholder,
  register,
  error,
  validation,
}: InputProps) => {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id}
        className="block text-base font-semibold text-gray-800 mb-1"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full border-b py-2 text-sm placeholder-gray-400 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-red-500'
        }`}
        {...register(id, validation)}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;

'use client';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
};

const Input = <T extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  register,
  error,
}: InputProps<T>) => {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id as string}
        className="block text-base font-semibold text-gray-800 mb-1"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={id as string}
        placeholder={placeholder}
        className={`w-full border-b py-2 text-sm placeholder-gray-400 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-red-500'
        }`}
        {...register(id)}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;

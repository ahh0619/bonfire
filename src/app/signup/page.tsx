'use client';
import Image from 'next/image';
import { signup } from '../login/actions';
import { useState } from 'react';

const SignUpPage = () => {
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = e.target.files?.[0];
    if (fileObj) {
      setProfileImgFile(fileObj);
      const objectUrl = URL.createObjectURL(fileObj);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        if (profileImgFile) {
          formData.append('profileImage', profileImgFile);
        }

        await signup(formData);
      }}
    >
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
      <div>
        <label htmlFor="profileImage">Profile Image:</label>
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="미리보기 이미지"
            width={200}
            height={200}
          />
        ) : (
          <p>이미지 없음</p>
        )}
        <input
          className="border border-gray-300 rounded-md p-2"
          id="profileImage"
          name="profileImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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

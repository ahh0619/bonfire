'use client';

import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="font-semibold">
        @ Copyright 2024 Hyun&I. All rights reserved{' '}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-16 pt-8">
        <a
          className="text-center"
          href="https://github.com/ahh0619"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold">안현희</p>
          <Image
            src="/images/leader_github_logo.png"
            alt="default-profile"
            width="50"
            height="50"
          />
        </a>

        <a
          className="text-center"
          href="https://github.com/hyeonjy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold">김현지</p>
          <Image
            src="/images/github_logo.png"
            alt="default-profile"
            width="50"
            height="50"
          />
        </a>

        <a
          className="text-center"
          href="https://github.com/DevIruka"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold">박민준</p>
          <Image
            src="/images/github_logo.png"
            alt="default-profile"
            width="50"
            height="50"
          />
        </a>
        <a
          className="text-center"
          href="https://github.com/Choi-kanggun/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold">최강건</p>
          <Image
            src="/images/github_logo.png"
            alt="default-profile"
            width="50"
            height="50"
          />
        </a>
        <a
          className="text-center"
          href="https://github.com/chay140"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold">박채현</p>
          <Image
            src="/images/github_logo.png"
            alt="default-profile"
            width="50"
            height="50"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;

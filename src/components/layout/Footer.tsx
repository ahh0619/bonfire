import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center mx-auto mobile:max-w-[320px] sm:max-w-[480px] md:max-w-[500px]">
      <p className="font-semibold text-xs sm:text-base">
        © Copyright 2024 Hyun&I. All rights reserved{' '}
      </p>
      <div className="grid grid-cols-5 pt-8 w-full">
        <a
          className="text-center"
          href="https://github.com/ahh0619"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold text-[10px] sm:text-sm">안현희</p>
          <div className="relative w-full max-w-[30px] mx-auto aspect-square sm:max-w-[40px] md:max-w-[50px]">
            <Image
              src="/images/leader_github_logo.png"
              alt="default-profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </a>

        <a
          className="text-center"
          href="https://github.com/hyeonjy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold text-[10px] sm:text-sm">김현지</p>
          <div className="relative w-full max-w-[30px] mx-auto aspect-square sm:max-w-[40px] md:max-w-[50px]">
            <Image
              src="/images/github_logo.png"
              alt="default-profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </a>

        <a
          className="text-center"
          href="https://github.com/DevIruka"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold text-[10px] sm:text-sm">박민준</p>
          <div className="relative w-full max-w-[30px] mx-auto aspect-square sm:max-w-[40px] md:max-w-[50px]">
            <Image
              src="/images/github_logo.png"
              alt="default-profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </a>
        <a
          className="text-center"
          href="https://github.com/Choi-kanggun/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold text-[10px] sm:text-sm">최강건</p>
          <div className="relative w-full max-w-[30px] mx-auto aspect-square sm:max-w-[40px] md:max-w-[50px]">
            <Image
              src="/images/github_logo.png"
              alt="default-profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </a>
        <a
          className="text-center"
          href="https://github.com/chay140"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-semibold text-[10px] sm:text-sm">박채현</p>
          <div className="relative w-full max-w-[30px] mx-auto aspect-square sm:max-w-[40px] md:max-w-[50px]">
            <Image
              src="/images/github_logo.png"
              alt="default-profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;

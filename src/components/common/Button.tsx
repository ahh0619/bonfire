const Button = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="bg-[#FD470E] text-white text-base font-semibold w-full py-2 rounded-md hover:bg-[#e0400e] transition-colors mb-4"
    >
      {text}
    </button>
  );
};

export default Button;

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="py-2 text-center bg-slate-50 border-t border-slate-500 flex gap-1 items-center justify-center">
      By{' '}
      <a
        className="text-blue-500 underline"
        href="https://zunnoorain.vercel.app/"
        target="_blank"
      >
        Muhammad Zunnoorain Rafi
      </a>
      <p>{date}</p>
    </div>
  );
}

export default Footer;

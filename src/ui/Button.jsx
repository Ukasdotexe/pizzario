import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none disabled:cursor-not-allowed ';

  const style = {
    primary: base + ' px-4 py-3 sm:px-6 md:py-3',
    small: base + '  px-4 py-2 text-sm md:px-5 md:py-2.5',
    secondary:
      'inline-block text-sm rounded-full border-b-2 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 focus:outline-none disabled:cursor-not-allowed sm:px-6 md:py-3',
    quantity: base + ' px-2.5 py-1 md:px-[14px] md:py-2',
  };

  // If "to" is provided, render a Link component, otherwise render a button
  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={style[type]}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

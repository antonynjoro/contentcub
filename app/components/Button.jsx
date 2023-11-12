export default function Button({
  handleClick,
  children,
  isSecondary = false,
  isDestructive = false,
}) {
  let buttonClass = 'flex justify-center gap-1 rounded-md px-4 py-2 ';

  if (isDestructive) {
    buttonClass += 'border border-transparent bg-red-50 text-red-900 hover:border-red-300 hover:bg-red-100';
  } else if (isSecondary) {
    buttonClass += 'bg-gray-200 text-gray-900 hover:bg-gray-300';
  } else {
    buttonClass += 'bg-gray-900 text-white hover:bg-gray-800';
  }

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      aria-label={children}
    >
      {children}
    </button>
  );
}

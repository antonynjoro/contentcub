export default function Button({
  handleClick,
  children,
  isSecondary = false,
  isDestructive = false,
}) {
  return (
    <button
      className={`flex  justify-center gap-1 rounded-md  px-4 py-2   ${
        isSecondary
          ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
          : "bg-gray-900 text-white hover:bg-gray-800"
      }
      ${
        isDestructive &&
        "border border-transparent bg-red-50 text-red-900 hover:border-red-300 hover:bg-red-100"
      }
      `}
      onClick={handleClick}
      aria-label={children}
    >
      {children}
    </button>
  );
}

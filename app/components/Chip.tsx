type ChipType =
  | "default"
  | "error"
  | "warning"
  | "success"
  | "info"
  | "primary"
  | "secondary"
  | "tertiary";

interface ChipProps {
  children: React.ReactNode;
  chipType?: ChipType;
}

const chipStyles = {
  default: "bg-gray-50 text-gray-600 ring-gray-500/10",
  error: "bg-red-50 text-red-700 ring-red-600/10",
  warning: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
  success: "bg-green-50 text-green-700 ring-green-600/20",
  info: "bg-blue-50 text-blue-700 ring-blue-700/10",
  primary: "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
  secondary: "bg-purple-50 text-purple-700 ring-purple-700/10",
  tertiary: "bg-pink-50 text-pink-700 ring-pink-700/10"
};

export default function Chip({ children, chipType = "default" }: ChipProps) {
  const style = chipStyles[chipType];

  return (
    <span className={`inline-flex shrink self-center items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset  ${style}`}>
      {children}
    </span>
  );
}

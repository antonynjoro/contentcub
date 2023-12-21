import { HiPlus } from "react-icons/hi";

/**
 * IconButton Component
 * 
 * Props:
 * - tooltipText: Text to display in the tooltip when hovered over the button.
 * - handleClick: Callback function to be executed when the button is clicked.
 * - size: Size of the button ('sm', 'md', 'lg', ...). Default is 'md'.
 * - destructive: Boolean prop that changes the button to have a more warning-like appearance for potentially destructive actions. Default is false.
 * - IconComponent: React component to be used as the button's icon. It can be from any icon library or custom SVG component.
 *                  Defaults to the HiPlus icon from `react-icons/hi`.
 * 
 * Example Usage:
 * ```jsx
 * import { FaEdit } from "react-icons/fa";
 * 
 * <IconButton 
 *    tooltipText="Edit item" 
 *    handleClick={handleEditAction} 
 *    IconComponent={FaEdit} 
 * />
 * ```
 * 
 * This will render a button with a FontAwesome edit icon and a tooltip that displays "Edit item" when hovered.
 */
const SIZES = {
  sm: {
    padding: "p-0.5",
    iconSize: "h-4 w-4",
  },
  md: {
    padding: "p-1.5",
    iconSize: "h-6 w-6",
  },
  lg: {
    padding: "p-2.5",
    iconSize: "h-8 w-8",
  },
};

export default function IconButton({
    tooltipText,
    handleClick,
    size = "md",
    IconComponent = HiPlus,
    destructive = false,
  }) {
    const sizeConfig = SIZES[size] || SIZES.md;
  
    const buttonStyles = destructive
      ? " hover:bg-red-100 hover:border-red-300 text-gray-600 hover:text-red-800 "
      : " hover:bg-slate-100 text-gray-600 group-hover:text-gray-800 ";
  
    return (
      <div className="group relative flex flex-shrink" title={tooltipText}>
        
        <button
          aria-label="Icon Action"
          className={`
            ${sizeConfig.padding}
            group rounded-md border border-gray-300
            bg-white text-gray-400
            ${buttonStyles}
            focus:outline-none focus:ring-2 focus:ring-slate-200
            active:bg-slate-200 active:text-gray-700
            transition-transform duration-150 transform hover:scale-105
          `}
          onClick={handleClick}
        >
          <IconComponent className={`${sizeConfig.iconSize}`} />
        </button>
      </div>
    );
  }
  

import { BsImages, BsImage, BsTextParagraph } from "react-icons/bs";
import { MdShortText } from "react-icons/md";
import { HiOutlineUpload } from "react-icons/hi";

/**
 * QuestionVisualizer Component
 * -----------------------------
 *
 * Overview:
 * This component visually represents a type of question that can be asked to a website client
 * for content submission. It shows an icon and background color based on the type of question.
 *
 * Props:
 * - `questionType`: Specifies the type of question. Default is 'textShort'.
 *    Acceptable values are:
 *    textShort, textLong, fileUpload, imageUpload, ImageUploadMultiple
 *
 * - `label`: The textual label for the question. Not currently used but reserved for future enhancement.
 *
 * - `helptext`: Additional help text or description. Not currently used but reserved for future enhancement.
 *
 * Usage:
 * ```jsx
 * <QuestionVisualizer questionType="textLong" />
 * ```
 *
 * Dependencies:
 * - React Icons: The component uses icons from the 'react-icons' library.
 *
 * Notes:
 * - The component will return a placeholder with "Invalid Type" if an unrecognized `questionType` is passed.
 * - Ensure that you've imported the necessary icons from 'react-icons' when adding or modifying question types.
 *
 * Last Updated: [DATE]
 * Author: Antony
 */

// Curated set of question types relevant for website content requests with assigned colors
const questionTypes = {
  textShort: {
    description: "Short Text Answer",
    icon: MdShortText,
    colorClass: "bg-teal-200",
  },
  textLong: {
    description: "Long Text Answer",
    icon: BsTextParagraph,
    colorClass: "bg-lime-200",
  },
  fileUpload: {
    description: "File Upload",
    icon: HiOutlineUpload,
    colorClass: "bg-green-200",
  },
  imageUpload: {
    description: "Image Upload",
    icon: BsImage,
    colorClass: "bg-rose-200",
  },
  imageUploadMultiple: {
    description: "Multiple Image Upload",
    icon: BsImages,
    colorClass: "bg-yellow-200",
  },
};

export default function QuestionNavItem({
  type = "textShort",
  id,
  label,
  helptext,
  isCurrentQuestion = false,
  handleClick,
}) {
  // Check if the provided questionType is valid
  if (!questionTypes.hasOwnProperty(type)) {
    console.error(`Invalid questionType: ${type}`);
    return (
      <div className="rounded-md bg-gray-200 px-2 py-1 text-center text-black">
        Invalid Type
      </div>
    );
  }

  // Get the Icon component dynamically from the questionTypes object
  const IconComponent = questionTypes[type].icon;

  return (
    <button
      className={`flex w-full items-center gap-2 px-4 py-2 ${
        isCurrentQuestion ? "bg-gray-100 font-bold" : ""
      }`}
      title={label}
      onClick={() => handleClick(id)}
    >
      {" "}
      {/* Ensure this container has a width */}
      <div
        className={`${questionTypes[type].colorClass} flex gap-2 rounded-md px-2 py-2 text-black`}
      >
        <IconComponent className="h-6 w-6" />
      </div>
      <p className="min-w-0 flex-shrink overflow-hidden truncate whitespace-nowrap text-sm">
        {label}
      </p>
    </button>
  );
}



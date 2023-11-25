import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export default function QuestionNavigationButtons({handleNextButtonClick, handlePreviousButtonClick}) {
  return (
    <div className="flex gap-[1px]">
      
      <button
        className="rounded-l-md bg-gray-900 px-4 py-2 hover:bg-gray-800"
        title="Previous Question"
        onClick={() => handlePreviousButtonClick()}
      >
        <HiOutlineChevronUp className="h-6 w-6 text-white" />
      </button>
      <button
        className=" rounded-r-md bg-gray-900 px-4 py-2 hover:bg-gray-800"
        title="Next question"
        onClick={() => handleNextButtonClick()}
      >
        <HiOutlineChevronDown className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

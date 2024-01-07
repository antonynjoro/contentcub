import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export default function QuestionNavigationButtons({handleNextButtonClick, handlePreviousButtonClick}) {
  return (
    <div className="flex w-full gap-[1px] text-white md:w-min ">
      <button
        className="flex grow  items-center justify-center gap-1 rounded-l-md bg-gray-900 px-4 py-3 hover:bg-gray-800 md:py-2"
        title="Previous Question"
        onClick={() => handlePreviousButtonClick()}
      >
        <HiOutlineChevronUp className="h-6 w-6 text-white " />
        <p className="sr-only">Previous Question</p>
        <p className="md:hidden">Prev</p>
      </button>
      <button
        className=" flex grow items-center justify-center gap-1 rounded-r-md bg-gray-900 px-4 py-3 hover:bg-gray-800 md:py-2"
        title="Next question"
        onClick={() => handleNextButtonClick()}
      >
        <HiOutlineChevronDown className="h-6 w-6 text-white" />
        <p className="sr-only">Next Question</p>
        <p className="md:hidden">Next</p>
      </button>
    </div>
  );
}

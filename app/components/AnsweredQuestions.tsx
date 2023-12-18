import Chip from "./Chip"

export default function AnsweredQuestions({currentQuestion}) {
  return (
    <div><p className="text-white">Center content</p>
    {currentQuestion && (
      <>
        <div className="flex items-center gap-1 p-3">
          <p className=" text-sm">Status: </p>
          <Chip
            chipType={
              currentQuestion?.answers?.length > 0 ? "success" : "warning"
            }
          >
            {currentQuestion?.answers?.length > 0
              ? "Answered"
              : "Unanswered"}
          </Chip>
        </div>
        
      </>
    )}</div>
  )
}

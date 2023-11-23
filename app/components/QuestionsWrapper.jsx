import { motion, AnimatePresence } from "framer-motion";
import { HiTrash } from "react-icons/hi";
import Question from "./Question";
import Button from "./Button";
import QuestionNavigationButtons from "./QuestionNavigationButtons";

export default function QuestionsWrapper({
  isLoading,
  currentQuestion,
  handleDeleteQuestion,
  setCurrentQuestion,
  requestId,
  questions,
}) {
  const variants = {
    initial: { opacity: 0, y: 50 }, // Start a bit down from the final position
    animate: { opacity: 1, y: 0 }, // Move to the final position and become fully opaque
    exit: { opacity: 0, y: -50 }, // Move up a bit and fade out
  };

  function handleNextButtonClick() {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestion.id,
    );
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestion(questions[0]);
    } else {
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
    }
  }

  function handlePreviousButtonClick() {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestion.id,
    );
    if (currentQuestionIndex === 0) {
      setCurrentQuestion(questions[questions.length - 1]);
    } else {
      setCurrentQuestion(questions[currentQuestionIndex - 1]);
    }
  }
  return (
    <>
      {isLoading ? (
        <div className="m-4 flex flex-grow items-center justify-center rounded-md border bg-white p-12 shadow-sm">
          Loading...
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {currentQuestion === undefined ? (
            <div className="m-4 flex flex-grow overflow-hidden rounded-md border bg-white p-12 shadow-sm">
              No questions yet
            </div>
          ) : (
            <motion.div
              key={currentQuestion.id}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, type: "tween" }} // You can adjust the type of transition if you want to
              className="m-4 flex flex-grow flex-col justify-stretch overflow-hidden rounded-md border bg-white p-6 shadow-sm sm:p-12"
            >
              <Question
                questionId={currentQuestion.id}
                type={currentQuestion.type}
                title={currentQuestion.title}
                description={currentQuestion.description}
                requestId={requestId}
              />
              {/* <div className="flex justify-between"> */}
                
              <div className="bg-blue flex justify-end gap-3 items-center">
              <p className="text-gray-700">
                    {questions.findIndex(
                        (question) => question.id === currentQuestion.id,
                    ) + 1}{" "}
                    of {questions.length}
                </p>
                { handleDeleteQuestion &&
                    <Button handleClick={handleDeleteQuestion} isDestructive={true}>
                  <HiTrash className="h-5 w-5 text-red-500 " />
                  Delete Question
                </Button>}
                <QuestionNavigationButtons
                  handleNextButtonClick={handleNextButtonClick}
                  handlePreviousButtonClick={handlePreviousButtonClick}
                />
              </div>
              {/* </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

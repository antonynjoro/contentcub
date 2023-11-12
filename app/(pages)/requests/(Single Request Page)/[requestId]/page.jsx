"use client";
import NavBar from "../../../../components/NavBar";
import React, { Suspense, use } from "react";
import IconButton from "../../../../components/IconButton.jsx";
import QuestionNavItem from "../../../../components/QuestionNavItem.jsx";
import Question from "../../../../components/Question.jsx";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddQuestionModal from "../../../../components/AddQuestionModal.jsx";
import { HiTrash } from "react-icons/hi2";
import QuestionNavigationButtons from "../../../../components/QuestionNavigationButtons.jsx";
import Button from "../../../../components/Button";
import fetchRequest from "./fetchRequest";
import RequestHeader from "../../../../components/RequestHeader.jsx";
import Chip from "../../../../components/Chip";
import deleteQuestion from"../../../../actions/deleteQuestion"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation.js";

// const questions = [
//   {
//     id: "Wcvoew2330sc20c",
//     type: "textShort",
//     title: "What is your name?",
//     description: "Please enter your name below",
//   },
//   {
//     id: "Wcvoew2330sc20d",
//     type: "textLong",
//     title: "What does your company do?",
//     description: "In a few sentences, please describe what your company does",
//   },
//   {
//     id: "Wcvoew2330sc20e",
//     type: "fileUpload",
//     title: "any other files?",
//     description:
//       "Please upload any other files that you think would be helpful",
//   },
//   {
//     id: "Wcvoew2330sc20f",
//     type: "imageUpload",
//     title: "Upload your Logo",
//     description: "Please upload your company logo in a high resolution format",
//   },
//   {
//     id: "Wcvoew2330sc20g",
//     type: "textShort",
//     title: "What is your email address?",
//     description: "Please enter your email address below",
//   },
//   {
//     id: "Wcvoew2330sc20h",
//     type: "textShort",
//     title: "What is your phone number?",
//     description: "Please enter your phone number below",
//   },
//   {
//     id: "Wcvoew2330sc20i",
//     type: "textShort",
//     title: "What is your company name?",
//     description: "Please enter your company name below",
//   },
//   {
//     id: "Wcvoew2330sc20j",
//     type: "textShort",
//     title: "What is your job title?",
//     description: "Please enter your job title below",
//   },

//   {
//     id: "Wcvoew2330sc20m",
//     type: "textShort",
//     title: "What is your age?",
//     description: "Please enter your age below",
//   },
//   {
//     id: "Wcvoew2330sc20n",
//     type: "textShort",
//     title: "What is your address?",
//     description: "Please enter your address below",
//   },
//   {
//     id: "Wcvoew2330sc20o",
//     type: "textShort",
//     title: "What is your favorite color?",
//     description: "Please enter your favorite color below",
//   },
//   {
//     id: "Wcvoew2330sc20p",
//     type: "textShort",
//     title: "What is your favorite food?",
//     description: "Please enter your favorite food below",
//   },
//   {
//     id: "Wcvoew2330sc20q",
//     type: "textShort",
//     title: "What is your favorite movie?",
//     description: "Please enter your favorite movie below",
//   },
//   {
//     id: "Wcvoew2330sc20t",
//     type: "fileUpload",
//     title: "Upload your resume",
//     description: "Please upload your resume in a PDF format",
//   },
//   {
//     id: "Wcvoew2330sc20u",
//     type: "imageUpload",
//     title: "Upload your profile picture",
//     description: "Please upload a profile picture in a high resolution format",
//   },
//   {
//     id: "Wcvoew2330sc20v",
//     type: "textLong",
//     title: "What is your company's mission statement?",
//     description: "Please enter your company's mission statement below",
//   },
// ];

export default function Page({ params }) {
  const router = useRouter();
  const [requestId] = useState(params.requestId);
  const { isLoaded, isSignedIn, user } = useUser();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(undefined);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(""); // ["draft", "sent", "answered" "closed"]
  const [requestTitle, setRequestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch questions from the server
    async function fetchQuestions() {
      setIsLoading(true);
      if (!isLoaded) return;
      if (!isSignedIn) return;
      console.log("fetching questions");
      const request = await fetchRequest(requestId, user.id);
      if (!request) {
        router.push("/404");
        return;
      }
      console.log("request", request);
      setQuestions(request.questions);
      console.log("questions", questions);
      setRequestStatus(request.status);
      console.log("status", request.status);
      setRequestTitle(request.title);
      console.log("title", request.title);
      setIsLoading(false);
    }
    fetchQuestions();
  }, [isLoaded, isSignedIn, user, requestId]);

  useEffect(() => {
    if (!isLoading) {
      if (questions.length === 0) {
        setAddQuestionModalOpen(true);
      } else {
        setAddQuestionModalOpen(false);
        console.log("setting current question");
        console.log(questions);
        setCurrentQuestion(questions[0]);
      }
    }
  }, [questions, isLoading]);


  function handleNavItemClick(id) {
    setCurrentQuestion(questions.find((question) => question.id === id));
  }

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

  function handleDeleteQuestion() {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestion.id,
    );

    const newQuestions = questions.filter(
      (question) => question.id !== currentQuestion.id,
    );

    setQuestions(newQuestions);

    if (questions.length <= 1) {
      setCurrentQuestion(undefined);
    }

    // delete question from server
    deleteQuestion(requestId, currentQuestion.id);
  }

  const variants = {
    initial: { opacity: 0, y: 50 }, // Start a bit down from the final position
    animate: { opacity: 1, y: 0 }, // Move to the final position and become fully opaque
    exit: { opacity: 0, y: -50 }, // Move up a bit and fade out
  };

  return (
    <div className="flex h-screen flex-col  ">
      <div className="flex-shrink">
        <RequestHeader
          title={requestTitle}
          status={requestStatus}
          requestId={requestId}
        />
      </div>
      <div className=" flex flex-grow overflow-hidden    sm:grid sm:grid-cols-12">
        {/* first column */}
        <div className="col-span-2 flex h-full flex-col overflow-hidden bg-white ">
          <div className="flex items-center  border-b p-4 pt-5">
            <h2 className="flex-grow align-middle  text-base  ">Content</h2>
            <IconButton
              size="sm"
              tooltipText={"Create a new Question"}
              handleClick={() =>
                setAddQuestionModalOpen((prevState) => !prevState)
              }
            />
            {addQuestionModalOpen && (
              <AddQuestionModal
                handleModalClose={() =>
                  setAddQuestionModalOpen((prevState) => !prevState)
                }
                setQuestions={setQuestions}
                requestId={requestId}
              />
            )}
          </div>
          {/* Content Nav */}
          <Suspense fallback={<div>Loading...</div>}>
          <div className="flex h-full flex-grow flex-col items-stretch gap-2 overflow-y-auto border-b py-2">
            {questions.map((question) => (
              <div className="flex gap-1" key={question.id}>
                <QuestionNavItem
                  type={question.type}
                  label={question.title}
                  id={question.id}
                  handleClick={handleNavItemClick}
                  isCurrentQuestion={question.id === currentQuestion?.id}
                />
              </div>
            ))}
            
          </div>
          </Suspense>
          <div className="px-3 py-2 flex-col flex flex-grow ">
            <Button 
              handleClick={() => setAddQuestionModalOpen(true)}

            >
              Add Question
            </Button>
            </div>
        </div>
        {/* Second Column */}
        <div className="col-span-8  flex flex-col border-x bg-gray-100 ">
          {isLoading ? (
            <div className="m-4 flex flex-grow justify-center items-center rounded-md border bg-white p-12 shadow-sm">
              Loading...
            </div>
          ) : (
          <AnimatePresence mode="wait">

            {currentQuestion === undefined ? (
              <div className="m-4 flex flex-grow rounded-md border bg-white p-12 shadow-sm">
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
                className="m-4 flex flex-grow flex-col justify-stretch rounded-md border bg-white p-6 sm:p-12 shadow-sm"
              >
                <Question
                  id={currentQuestion.id}
                  type={currentQuestion.type}
                  title={currentQuestion.title}
                  description={currentQuestion.description}
                />
                <div className="bg-blue flex justify-end gap-3">
                  <Button
                    handleClick={handleDeleteQuestion}
                    isDestructive={true}
                  >
                    <HiTrash className="h-5 w-5 text-red-500 " />
                    Delete Question
                  </Button>
                  <QuestionNavigationButtons
                    handleNextButtonClick={handleNextButtonClick}
                    handlePreviousButtonClick={handlePreviousButtonClick}
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
          )}
        </div>
        {/* Third Colun */}
        <div className="col-span-2 overflow-y-auto bg-white">
          {currentQuestion && (
          <div className="flex p-3 gap-1 items-center">
            <p className=" text-sm">Status: </p>
            <Chip chipType={currentQuestion?.answers?.length>0 ? "success" : "warning"} >
              {currentQuestion?.answers?.length > 0 ? "Answered" : "Unanswered"}
            </Chip>
         
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

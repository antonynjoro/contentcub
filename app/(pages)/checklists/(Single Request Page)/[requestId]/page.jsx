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
import deleteQuestion from "../../../../actions/deleteQuestion";
import { currentUser, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation.js";
import { toast } from "react-hot-toast";
import QuestionsWrapper from "../../../../components/QuestionsWrapper.jsx";
import QuestionNav from "../../../../components/QuestionNav.jsx";
import Comments from "../../../../components/Comments";
import fetchCurrentUser from "../../../../actions/fetchCurrentUser";
import AnsweredQuestions from "../../../../components/AnsweredQuestions";

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

  const [currentUserData, setCurrentUserData] = useState({}); 

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(undefined);
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(""); // ["draft", "sent", "answered" "closed"]
  const [requestTitle, setRequestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [columnOneActive, setColumnOneActive] = useState(false);
  const [columnThreeActive, setColumnThreeActive] = useState(false);

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
      if (user.id !== request.user.externalId) {
        router.push(`/checklists/${requestId}/submit`);
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

  // set current question to first question
  useEffect(() => {
    if (!isLoading) {
      if (questions.length < 1) {
        setAddQuestionModalOpen(true);
      } else {
        setAddQuestionModalOpen(false);
        console.log("setting current question");
        console.log(questions);
        setCurrentQuestion(questions[0]);
      }
    }
  }, [questions, isLoading]);


  // fetch current user data for comments
  useEffect(() => {
    if (currentUserData && isLoaded) {
      fetchCurrentUser(user.id)
        .then((res) => {
          setCurrentUserData(res)
          console.log("currentUserType", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);



  useEffect(() => {
    if (currentQuestion?.answers?.length > 0) {
      setCurrentQuestionAnswered(true);
    } else {
      setCurrentQuestionAnswered(false);
    }

    console.log("currentQuestionAnswered", currentQuestionAnswered);
    console.log("currentQuestion", currentQuestion);
  }
  , [currentQuestion]);
  

  

  async function handleDeleteQuestion(questionToDelete) {

    const newQuestions = questions.filter(
      (question) => question.id !== questionToDelete.id
    );

    setQuestions(newQuestions);
    

    if (questions.length <= 1) {
      setCurrentQuestion(undefined);
    }

    // delete question from server
    deleteQuestion(requestId, questionToDelete.id)
    .then((res) => {toast.success("Question deleted")})

    const request = await fetchRequest(requestId, user.id);
    if (!request) {
      router.push("/404");
      return;
    }
    console.log("request", request);
    setQuestions(request.questions);
  }
  

  

  return (
    <div className="flex h-screen flex-col  ">
      <div className="flex-shrink">
        <RequestHeader
          title={requestTitle}
          status={requestStatus}
          requestId={requestId}
          isLoading={isLoading}
        />
      </div>
      <div className=" flex flex-grow overflow-hidden    sm:grid sm:grid-cols-12">
        {/* first column */}
        <div className={`col-span-full md:col-span-2  h-full overflow-hidden bg-white md:flex flex-col 
        ${columnOneActive ? " flex grow " : "hidden"}
        `}>
          <QuestionNav
            questions={questions}
            setQuestions={setQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            requestId={requestId}
            isLoading={isLoading}
            setAddQuestionModalOpen={setAddQuestionModalOpen}
            addQuestionModalOpen={addQuestionModalOpen}
            setQuestionNavOpen={setColumnOneActive}
          />
        </div>
        {/* Second Column */}
        {(!columnOneActive && !columnThreeActive) && (
        <div className=" col-span-full md:col-span-8 flex h-full flex-col overflow-hidden border-x  ">
          <AnsweredQuestions
            requestTitle={requestTitle}
            currentQuestion={currentQuestion}
            requestId={requestId}
            handleDeleteQuestion={handleDeleteQuestion}
            openQuestionNav={setColumnOneActive}
          />
        </div>
        )}

        {/* Third Colun */}
        <div className={`col-span-2 hidden md:flex h-full flex-col overflow-hidden border-x bg-white  
        ${columnThreeActive ? " flex" : ""}
        `}>
          <Comments
            questionId={currentQuestion?.id}
            senderType={currentUserData.type}
            senderId={currentUserData.id}
          />
        </div>
      </div>
    </div>
  );
}

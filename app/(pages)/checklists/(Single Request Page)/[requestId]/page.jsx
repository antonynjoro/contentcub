"use client";
import React, { Suspense, use } from "react";
import { useState, useEffect } from "react";
import QuestionNavigationButtons from "../../../../components/QuestionNavigationButtons.jsx";
import fetchRequest from "./fetchRequest";
import RequestHeader from "../../../../components/RequestHeader.jsx";
import deleteQuestion from "../../../../actions/deleteQuestion";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation.js";
import { toast } from "react-hot-toast";
import QuestionNav from "../../../../components/QuestionNav.jsx";
import Comments from "../../../../components/Comments";
import fetchCurrentUser from "../../../../actions/fetchCurrentUser";
import AnsweredQuestions from "../../../../components/AnsweredQuestions";
import CommentsMobileBubble from "../../../../components/CommentsMobileBubble";



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
  const [commentCount, setCommentCount] = useState(0);

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
  

  // if there are no questions, display the question column on mobile
  useEffect(() => {
    if (questions.length === 0) {
      setColumnOneActive(true);
      setAddQuestionModalOpen(true);
    }
  }, [questions]);
  

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
      <div className=" flex flex-grow overflow-hidden    md:grid md:grid-cols-12">
        {/* first column */}
        <div
          className={`col-span-full h-full  flex-col overflow-hidden bg-white md:col-span-2 md:flex 
        ${columnOneActive ? " flex grow " : "hidden"}
        `}
        >
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
        {!(columnOneActive || columnThreeActive) && (questions.length > 0) && (
          <div className=" col-span-full flex h-full w-full flex-col overflow-hidden border-x md:col-span-8  ">
            <AnsweredQuestions
              requestTitle={requestTitle}
              currentQuestion={currentQuestion}
              requestId={requestId}
              handleDeleteQuestion={handleDeleteQuestion}
              openQuestionNav={setColumnOneActive}
            />
          </div>
        )}

        {/* Second Column - Empty State */}
        {(questions.length === 0)  && (
          <div className={` col-span-full flex h-full w-full flex-col overflow-hidden border-x md:col-span-8  
          ${!(columnOneActive || columnThreeActive) ? " flex-grow" : "hidden md:flex"}
          `}>
            <EmptyChecklistState
              setAddQuestionModalOpen={setAddQuestionModalOpen}
              setColumnOneActive={setColumnOneActive}
            />
          </div>
        )}

        {/* Comments mobile bubble (Absolute) */}
        {!columnOneActive && !columnThreeActive && (
          <div className="fixed bottom-0 right-0 mb-4 mr-4 flex gap-3 md:hidden">
            <CommentsMobileBubble
              commentCount={commentCount}
              setCommentsActive={setColumnThreeActive}
            />
            <QuestionNavigationButtons
              handleNextButtonClick={() => {
                const currentQuestionIndex = questions.findIndex(
                  (question) => question.id === currentQuestion.id,
                );
                if (currentQuestionIndex === questions.length - 1) {
                  setCurrentQuestion(questions[0]);
                } else {
                  setCurrentQuestion(questions[currentQuestionIndex + 1]);
                }
              }}
              handlePreviousButtonClick={() => {
                const currentQuestionIndex = questions.findIndex(
                  (question) => question.id === currentQuestion.id,
                );
                if (currentQuestionIndex === 0) {
                  setCurrentQuestion(questions[questions.length - 1]);
                } else {
                  setCurrentQuestion(questions[currentQuestionIndex - 1]);
                }
              }}
            />
          </div>
        )}

        {/* Third Colun */}
        <div
          className={`col-span-2  h-full flex-col overflow-hidden border-x bg-white md:flex  
        ${columnThreeActive ? " flex-grow" : "hidden"}
        `}
        >
          <Comments
            questionId={currentQuestion?.id}
            senderType={currentUserData.type}
            senderId={currentUserData.id}
            setCommentsTabActive={setColumnThreeActive}
            setCommentCount={setCommentCount}
          />
        </div>
      </div>
    </div>
  );
}



function EmptyChecklistState({ setAddQuestionModalOpen, setColumnOneActive }) {
  return (
    <div className="flex flex-grow items-center justify-center border border-dashed m-4 border-gray-400 rounded-md">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-center">
          Your checklist is empty.
        </p>
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={() => {
            setAddQuestionModalOpen(true);
            setColumnOneActive(true);
          }}
        >
          Add checklist item
        </button>
      </div>
    </div>
  );
}
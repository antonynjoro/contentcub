"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionsWrapper from "../../../../../components/QuestionsWrapper";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import fetchRequest from "../fetchRequest";
import deleteQuestion from "../../../../../actions/deleteQuestion";
import { toast } from "react-hot-toast";
import RequestHeader from "../../../../../components/RequestHeader";
import QuestionNav from "../../../../../components/QuestionNav";

export default function page({ params }) {
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

  // set current question to first question
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

  async function handleDeleteQuestion() {
    const newQuestions = questions.filter(
      (question) => question.id !== currentQuestion.id,
    );

    setQuestions(newQuestions);

    if (questions.length <= 1) {
      setCurrentQuestion(undefined);
    }

    // delete question from server
    deleteQuestion(requestId, currentQuestion.id);

    toast.success("Question deleted");

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
        />
      </div>
      <div className="grid flex-grow grid-cols-12 sm:flex-row">
        {/* first column */}
        <div className="col-span-2 flex h-full flex-col overflow-hidden bg-white border-r ">
          <QuestionNav
            questions={questions}
            setQuestions={setQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            requestId={requestId}
          />
        </div>
        {/* second column */}
        <div className="col-span-10 flex h-full flex-col overflow-hidden bg-gray-50 ">
          <QuestionsWrapper
            isLoading={isLoading}
            currentQuestion={currentQuestion}
            handleNextButtonClick={handleNextButtonClick}
            handlePreviousButtonClick={handlePreviousButtonClick}
            requestId={requestId}
            questions={questions}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      </div>
    </div>
  );
}

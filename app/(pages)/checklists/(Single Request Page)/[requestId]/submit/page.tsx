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
import Comments from "../../../../../components/Comments";
import fetchCurrentUser from "../../../../../actions/fetchCurrentUser";
import { RequestModel } from "../../../../../types/requestTypes";
import { HiMenu, HiChat } from "react-icons/hi";
import CommentsMobileBubble from "../../../../../components/CommentsMobileBubble";


interface CurrentUserDataModel {
  id: string;
  type: string;
}

export default function Page({ params }) {
  const router = useRouter();
  const [requestId] = useState(params.requestId);
  const { isLoaded, isSignedIn, user } = useUser();

  const [currentUserData, setCurrentUserData] = useState<CurrentUserDataModel>({
    id: "",
    type: "",
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(undefined);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState(""); // ["draft", "sent", "answered" "closed"]
  const [requestTitle, setRequestTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [questionNavOpen, setQuestionNavOpen] = useState<boolean>(false); // for mobile`
  const [commentsTabActive, setCommentsTabActive] = useState<boolean>(false);


  // fetch current user data for comments
  useEffect(() => {
    if (currentUserData && isLoaded) {
      fetchCurrentUser(user.id)
        .then((res) => {
          setCurrentUserData(res);
          console.log("currentUserType", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    // TODO: Fetch questions from the server
    async function fetchQuestions() {
      setIsLoading(true);
      if (!isLoaded) return;
      if (!isSignedIn) return;
      console.log("fetching questions");
      const request: RequestModel = await fetchRequest(requestId, user.id);
      if (!request) {
        router.push("/404");
        return;
      }
      // if user is not the owner of the request and not a client of the request
      if (
        request.user.externalId !== user.id &&
        request.clients.every((client) => client.externalId !== user.id)
      ) {
        router.push("/404");
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
          isLoading={isLoading}
        />
      </div>
      {/* Mobile question nav menu button and comments button */}
      {!(questionNavOpen || commentsTabActive) && (
        // Menu button
        <div className=" flex col-span-full h-min w-full md:hidden py-2 px-4 border-b border-gray-200  bg-white">
          <button
            className="flex w-full items-center gap-4   "
            onClick={() => setQuestionNavOpen(!questionNavOpen)}
          >
            <HiMenu className="h-8 w-8" />
            View All Questions
          </button>

          {/* Comments button */}
          <CommentsMobileBubble
            commentCount={commentCount}
            setCommentsActive={setCommentsTabActive}
            size={"sm"}
            isSecondary={true}
          />
        </div>
      )}

      <div className="relative grid flex-grow grid-cols-12 overflow-hidden">
        {/* first column */}
        <div
          className={`col-span-full h-full  flex-col overflow-hidden border-r bg-white md:col-span-2 md:flex 
        ${questionNavOpen ? "flex" : "hidden"}`}
        >
          <QuestionNav
            questions={questions}
            setQuestions={setQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            requestId={requestId}
            setAddQuestionModalOpen={setAddQuestionModalOpen}
            isLoading={isLoading}
            addQuestionModalOpen={addQuestionModalOpen}
            setQuestionNavOpen={setQuestionNavOpen}
          />
        </div>

        {/* second column */}
        {!(questionNavOpen || commentsTabActive) && (
          <div className="col-span-full flex h-full flex-col overflow-hidden bg-gray-50 md:col-span-8 md:mt-0  ">
            <QuestionsWrapper
              isLoading={isLoading}
              currentQuestion={currentQuestion}
              requestId={requestId}
              questions={questions}
              setCurrentQuestion={setCurrentQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          </div>
        )}
        {/* third column */}

        <div
          className={`col-span-full h-full flex-col overflow-hidden border-l bg-white md:col-span-2 md:flex 
        ${commentsTabActive ? "flex" : "hidden"}`}
        >
          <Comments
            questionId={currentQuestion?.id}
            senderType={currentUserData.type}
            senderId={currentUserData.id}
            setCommentCount={setCommentCount}
            setCommentsTabActive={setCommentsTabActive}
          />
        </div>
      </div>
    </div>
  );
}

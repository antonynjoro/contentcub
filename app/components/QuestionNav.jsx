"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import IconButton from "./IconButton";
import AddQuestionModal from "./AddQuestionModal";
import Button from "./Button";
import QuestionNavItem from "./QuestionNavItem";
import { usePathname } from 'next/navigation';

export default function QuestionNav({
  questions,
  setQuestions,
  currentQuestion,
  setCurrentQuestion,
  requestId,
  isLoading,
  setAddQuestionModalOpen,
  addQuestionModalOpen,
}) {
  const [questionEditable, setQuestionEditable] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    console.log("pathname", pathname);
    if (pathname) {
      const pathSegments = pathname.split("/");
      if (
        pathSegments.length === 3 &&
        pathSegments[1] === "checklists" &&
        pathSegments[2] === requestId
      ) {
        setQuestionEditable(true);
      }
    }
  }, [pathname, requestId]);
      



  function handleNavItemClick(id) {
    setCurrentQuestion(questions.find((question) => question.id === id));
  }

  return (
    <>
      <div className="flex items-center  border-b p-4 pt-5">
        <h2 className="flex-grow align-middle  text-base  ">Checklist</h2>
        {!isLoading && questionEditable && (
          <>
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
          </>
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

      {!isLoading && questionEditable && 
        <div className="flex flex-grow flex-col px-3 py-2 ">
        <Button handleClick={() => setAddQuestionModalOpen(true)}>
          Add Item
        </Button>
      </div>}
    </>
  );
}

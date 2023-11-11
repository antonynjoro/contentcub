"use client";
import React from "react";
import ShortAnswerField from "./ShortAnswerField";
import { BsImage, BsImages, BsTextParagraph } from "react-icons/bs";
import { MdShortText } from "react-icons/md";
import { HiOutlineUpload } from "react-icons/hi";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import ModalContainer from "./ModalContainer";
import saveQuestion from "../actions/saveQuestion";


const questionTypes = {
  textShort: {
    description: "Short Text Answer",
    icon: MdShortText,
    colorClass: "bg-teal-200",
  },
  textLong: {
    description: "Long Text Answer",
    icon: BsTextParagraph,
    colorClass: "bg-lime-200",
  },
  fileUpload: {
    description: "File Upload",
    icon: HiOutlineUpload,
    colorClass: "bg-green-200",
  },
  imageUpload: {
    description: "Image Upload",
    icon: BsImage,
    colorClass: "bg-rose-200",
  },
  imageUploadMultiple: {
    description: "Multiple Image Upload",
    icon: BsImages,
    colorClass: "bg-yellow-200",
  },
};

export default function AddQuestionModal({ handleModalClose, setQuestions, requestId }) {
  const [selectedQuestionType, setSelectedQuestionType] = useState(undefined);
  const [questionTypehasError, setQuestionTypehasError] = useState(false);
  const [questionTitlehasError, setQuestionTitlehasError] = useState(false);

  const [question, setQuestion] = useState({
    id: Math.random().toString(36).substring(7),
    type: "textShort",
    title: "",
    description: "",
  });

  function handleClickAddButton() {
    // Validate if a question type is selected and a title is provided
    if (!selectedQuestionType || !question) {
      setQuestionTypehasError(!selectedQuestionType);
      setQuestionTitlehasError(!question.title);
      toast.error("Please select a question type and provide a question");
      return;
    } else if (!selectedQuestionType) {
      setQuestionTypehasError(!selectedQuestionType);
      toast.error("Please select a question type");
      return;
    } else if (!question.title) {
      setQuestionTitlehasError(!question.title);
      toast.error("Please provide a Question");
      return;
    } else {
      setQuestions((prevState) => [...prevState, question]);
      saveQuestion(requestId, question);
      handleModalClose();
    }
  }
  return (
    <ModalContainer handleModalClose={handleModalClose}>
        <h3 className="text-2xl font-bold">Add a new question</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div
              className={`flex flex-wrap gap-2 pb-5
          ${questionTypehasError && "rounded-md border-2 border-red-500 p-2"}
          `}
            >
              {Object.keys(questionTypes).map((type) => {
                const IconComponent = questionTypes[type].icon;
                return (
                  <button
                    key={type}
                    className={`flex items-center gap-2 px-4 py-2 ${
                      questionTypes[type].colorClass
                    } ${
                      selectedQuestionType === type &&
                      "outline-3 outline outline-offset-2 outline-black "
                    } rounded-md`}
                    onClick={() => {
                      setQuestion((prevState) => ({ ...prevState, type }));
                      setSelectedQuestionType(type);
                      setQuestionTypehasError(false);
                    }}
                  >
                    <IconComponent className="h-6 w-6" />
                    <p>{questionTypes[type].description}</p>
                  </button>
                );
              })}
            </div>
            {questionTypehasError && (
              <p className="text-sm text-red-700">
                Please select a question type
              </p>
            )}
          </div>
          <ShortAnswerField
            label={"Question"}
            handleChange={(value) => {
              setQuestion((prevState) => ({ ...prevState, title: value }));
              setQuestionTitlehasError(false);
            }}
            hasError={questionTitlehasError}
          />
          <ShortAnswerField
            label={"Description"}
            handleChange={(value) =>
              setQuestion((prevState) => ({
                ...prevState,
                description: value,
              }))
            }
          />
          <div className="flex justify-end gap-2">
            <Button
              handleClick={() => handleModalClose()}
              isSecondary={true}
            >
              Cancel
            </Button>
            <Button handleClick={handleClickAddButton}>Add</Button>
          </div>
        </div>
      </ModalContainer>
  );
}

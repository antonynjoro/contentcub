"use client";
import NavBar from "../../components/NavBar";
import React from "react";
import BarHeader from "../../components/BarHeader.jsx";
import IconButton from "../../components/IconButton.jsx";
import QuestionNavItem from "../../components/QuestionNavItem.jsx";
import Question from "../../components/Question.jsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "Wcvoew2330sc20c",
    type: "textShort",
    title: "What is your name?",
    description: "Please enter your name below",
  },
  {
    id: "Wcvoew2330sc20d",
    type: "textLong",
    title: "What does your company do?",
    description: "In a few sentences, please describe what your company does",
  },
  {
    id: "Wcvoew2330sc20e",
    type: "fileUpload",
    title: "any other files?",
    description:
      "Please upload any other files that you think would be helpful",
  },
  {
    id: "Wcvoew2330sc20f",
    type: "imageUpload",
    title: "Upload your Logo",
    description: "Please upload your company logo in a high resolution format",
  },
  {
    id: "Wcvoew2330sc20g",
    type: "textShort",
    title: "What is your email address?",
    description: "Please enter your email address below",
  },
  {
    id: "Wcvoew2330sc20h",
    type: "textShort",
    title: "What is your phone number?",
    description: "Please enter your phone number below",
  },
  {
    id: "Wcvoew2330sc20i",
    type: "textShort",
    title: "What is your company name?",
    description: "Please enter your company name below",
  },
  {
    id: "Wcvoew2330sc20j",
    type: "textShort",
    title: "What is your job title?",
    description: "Please enter your job title below",
  },

  {
    id: "Wcvoew2330sc20m",
    type: "textShort",
    title: "What is your age?",
    description: "Please enter your age below",
  },
  {
    id: "Wcvoew2330sc20n",
    type: "textShort",
    title: "What is your address?",
    description: "Please enter your address below",
  },
  {
    id: "Wcvoew2330sc20o",
    type: "textShort",
    title: "What is your favorite color?",
    description: "Please enter your favorite color below",
  },
  {
    id: "Wcvoew2330sc20p",
    type: "textShort",
    title: "What is your favorite food?",
    description: "Please enter your favorite food below",
  },
  {
    id: "Wcvoew2330sc20q",
    type: "textShort",
    title: "What is your favorite movie?",
    description: "Please enter your favorite movie below",
  },
  {
    id: "Wcvoew2330sc20t",
    type: "fileUpload",
    title: "Upload your resume",
    description: "Please upload your resume in a PDF format",
  },
  {
    id: "Wcvoew2330sc20u",
    type: "imageUpload",
    title: "Upload your profile picture",
    description: "Please upload a profile picture in a high resolution format",
  },
  {
    id: "Wcvoew2330sc20v",
    type: "textLong",
    title: "What is your company's mission statement?",
    description: "Please enter your company's mission statement below",
  },
];

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  function handleNavItemClick(id) {
    setCurrentQuestion(questions.find((question) => question.id === id));
  }

  const variants = {
    initial: { opacity: 0, y: 50 }, // Start a bit down from the final position
    animate: { opacity: 1, y: 0 }, // Move to the final position and become fully opaque
    exit: { opacity: 0, y: -50 }, // Move up a bit and fade out
  };

  return (
    <div className="flex h-screen flex-col  ">
      <div className="flex-shrink">
        <NavBar />
      </div>
      <div className=" flex flex-grow overflow-hidden    sm:grid sm:grid-cols-12">
        {/* first column */}
        <div className="col-span-2 flex h-full flex-col overflow-hidden bg-white ">
          <div className="flex flex-shrink flex-row items-center justify-between border-b p-4">
            <BarHeader headerText={"Content"} />
            <IconButton
              size="sm"
              helptext={"Create a new Question"}
              handleClick={() => alert("I got clicked")}
            />
          </div>
          {/* Content Nav */}
          <div className="flex h-full flex-grow flex-col items-stretch gap-2 overflow-y-auto border-b py-2">
            {questions.map((question) => (
              <div className="flex gap-1" key={question.id}>
                <QuestionNavItem
                  type={question.type}
                  label={question.title}
                  id={question.id}
                  handleClick={handleNavItemClick}
                  isCurrentQuestion={question.id === currentQuestion.id}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Second Column */}
        <div className="col-span-8  flex flex-col border-x bg-gray-100 ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, type: "tween" }} // You can adjust the type of transition if you want to
              className="m-4 flex flex-grow rounded-md border bg-white p-12 shadow-sm"
            >
              <Question
                id={currentQuestion.id}
                type={currentQuestion.type}
                title={currentQuestion.title}
                description={currentQuestion.description}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Third Colun */}
        <div className="col-span-2 overflow-y-auto bg-white">hello</div>
      </div>
    </div>
  );
}

"use client";
import React, { use } from "react";
import { UploadDropzone, UploadButton } from "./uploadthing";
import ShortAnswerField from "./ShortAnswerField.jsx";
import LongAnswerField from "./LongAnswerField";
import { toast } from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import debounce from "../utils/debounce";
import submitAnswer from "../actions/submitAnswer";
import fetchAnswer from "../actions/fetchAnswer";
import Image from "next/image";
import { HiXCircle } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import Link from "next/link";

export default function Question({
  questionId,
  type,
  title,
  description,
  requestId,
}) {
  const [answers, setAnswers] = useState([]);
  const [initiallyFetchedAnswers, setInitiallyFetchedAnswers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const debouncedSubmitAnswer = useCallback(
    debounce((requestId, questionId, answerList) => {
      submitAnswer(requestId, questionId, answerList)
        .then((res) => {
          console.log(res);
          const updatedAnswers = res.answers.map((answer) => answer.value);
          setAnswers(updatedAnswers);
          setInitiallyFetchedAnswers(updatedAnswers);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000),
    [requestId, questionId],
  );

  useEffect(() => {
    console.log("answers: ", answers[0]);
  }, [answers]);

  // Separate useEffect for initial data fetch
  useEffect(() => {
    if (!dataFetched) {
      fetchAnswer(requestId, questionId)
        .then((res) => {
          if (res.answers.length > 0) {
            const fetchedAnswers = res.answers.map((answer) => answer.value);
            setAnswers(fetchedAnswers);
            setInitiallyFetchedAnswers(fetchedAnswers);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setDataFetched(true); // Ensure this is set to true after fetching
        });
    }
  }, [requestId, questionId, dataFetched]); // Include dataFetched in the dependency array

  // Helper function to compare two arrays
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  // Separate useEffect for handling answer submission
  useEffect(() => {
    const hasAnswersChanged = !arraysAreEqual(answers, initiallyFetchedAnswers);
    if (dataFetched && hasAnswersChanged) {
      debouncedSubmitAnswer(requestId, questionId, answers);
    }

  }, [answers, debouncedSubmitAnswer, questionId, requestId, dataFetched]);


  // Helper function to handle the type of question
  function handleType(type) {
    if (type === "textShort") {
      return (
        <div className="w-full sm:w-2/3">
          <ShortAnswerField
            handleChange={(value) =>
              setAnswers((prevAnswers) => [...prevAnswers.slice(0, -1), value])
            }
            autoFocus={true}
            value={answers[answers.length - 1] || ""}
          />
        </div>
      );
    } else if (type === "textLong") {
      return (
        <LongAnswerField
          onEditorChange={(value) =>
            setAnswers((prevAnswers) => [...prevAnswers.slice(0, -1), value])
          }
          value={answers[answers.length - 1] || null}
        />
      );
    } else if (type === "fileUpload") {
      return (
        <UploadButton
          className=" left"
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            // Append the uploaded file URL to the answers array
            setAnswers((prevAnswers) => [
              ...prevAnswers.slice(0, -1),
              res[0].url,
            ]);
            toast.success("Upload Completed");
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
            console.log(error);
          }}
        />
      );
    } else if (type === "imageUpload") {
      return (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Append the uploaded file URL to the answers array
            setAnswers((prevAnswers) => [
              ...prevAnswers.slice(0, -1),
              res[0].url,
            ]);
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
            console.log(error);
          }}
          className=" flex-grow-0"
        />
      );
    } else if (type === "imageUploadMultiple") {
      return (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Append all uploaded image URLs to the answers array
            const newAnswers = res.map((file) => file.url);
            setAnswers([...answers, ...newAnswers]);
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          className=" w-full  ut-button:bg-gray-950 ut-button:hover:bg-gray-800   ut-label:text-gray-900 ut-upload-icon:text-yellow-400"
        />
      );
    } else {
      return <p>Invalid Type</p>;
    }
  }

  function ImagePreview({ url, index=0 }) {
    return (
      <Link className="relative max-w-[200px]" href={url}>
        <Image
          src={url}
          width={100}
          height={50}
          className="h-auto w-full rounded-md"
        />
        <button
          className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5"
          onClick={(e) => {
            e.preventDefault();
            setAnswers((prevAnswers) => [
              ...prevAnswers.slice(0, index),
              ...prevAnswers.slice(index + 1),
            ]);
          }}
        >
          <HiX className="text-white" />
        </button>
      </Link>
    );
  }

  const renderImages = (
    <div className="grid h-full auto-rows-min grid-cols-6 gap-2.5 pl-1 pt-6	">
      {answers.map((url, index) => (
        <ImagePreview key={index} index={index} url={url} />
      ))}
    </div>
  );

  return (
    <div
      className={`flex w-full max-w-full flex-grow flex-col flex-nowrap items-stretch justify-center  overflow-hidden p-6 sm:p-20 ${
        type === "textLong" && "sm:p-4 sm:pb-6"
      }`}
    >
      <h2 className="pl-1 text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-base text-gray-600">{description}</p>
      <div
        className={`flex max-w-full overflow-hidden pl-1 pt-4 ${
          type === "textLong" && " h-full flex-grow"
        } ${type === "imageUploadMultiple" && " h-full flex-grow"}`}
      >
        {handleType(type)}
      </div>
      {type === "imageUploadMultiple" && answers.length > 0 && renderImages}
      {type === "imageUpload" && answers.length > 0 && (
        <ImagePreview url={answers[answers.length - 1]} />
      )}
    </div>
  );
}

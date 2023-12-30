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
import { HiDocument, HiXCircle } from "react-icons/hi2";
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
  const [metadataObjects, setMetadataObjects] = useState([]);

  const debouncedSubmitAnswer = useCallback(
    debounce((requestId, questionId, answerList, metadataObjects) => {
      submitAnswer(requestId, questionId, answerList, metadataObjects)
        .then((res) => {
          const updatedAnswers = res.answers.map((answer) => answer.value);
          setAnswers(updatedAnswers);
          setInitiallyFetchedAnswers(updatedAnswers);
        })
        .then(() => {
          toast.success("saved");
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000),
    [requestId, questionId],
  );



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
      debouncedSubmitAnswer(requestId, questionId, answers, metadataObjects);
    }

  }, [answers, debouncedSubmitAnswer, questionId, requestId, dataFetched]);


  // Helper function to handle the type of question
  function handleType(type) {
    if (type === "textShort") {
      return (
        <div className="w-full sm:w-2/3">
          <ShortAnswerField
            handleChange={(value) =>
              {
                setAnswers((prevAnswers) => [
                  ...prevAnswers.slice(0, -1),
                  value,
                ]);
                setMetadataObjects((prevMetadataObjects) => [
                  ...prevMetadataObjects.slice(0, -1),
                  {},
                ]);
              }}
            autoFocus={true}
            value={answers[answers.length - 1] || ""}
          />
        </div>
      );
    } else if (type === "textLong") {
      return (
        <LongAnswerField
          onEditorChange={(value) => {
            setAnswers((prevAnswers) => [...prevAnswers.slice(0, -1), value]);
            setMetadataObjects((prevMetadataObjects) => [
              ...prevMetadataObjects.slice(0, -1),
              {},
            ]);
          }}
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
            setMetadataObjects((prevMetadataObjects) => [
              ...prevMetadataObjects.slice(0, -1),
              res[0],
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
            setMetadataObjects((prevMetadataObjects) => [
              ...prevMetadataObjects.slice(0, -1),
              res[0],
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
          endpoint="multiImageUploader"
          onClientUploadComplete={(res) => {
            // Append all uploaded image URLs to the answers array
            const newAnswers = res.map((file) => file.url);
            setAnswers([...answers, ...newAnswers]);
            setMetadataObjects((prevMetadataObjects) => [
              ...prevMetadataObjects,
              ...res,
            ]);
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          className="  min-h-[100px] w-full ut-button:min-h-[40px]  ut-button:bg-gray-950 ut-button:hover:bg-gray-800   ut-label:text-gray-900 ut-upload-icon:text-yellow-400"
        />
      );
    } else {
      return <p>Invalid Type</p>;
    }
  }

  function ImagePreview({ url, index=0 }) {
    return (
      <Link className="relative max-w-[200px] max-h-40 group" href={url}>
        <Image
          src={url}
          width={100}
          height={50}
          className="h-auto w-full rounded-md"
        />
        <button
          className=" opacity-0 group-hover:opacity-100 transition ease-in-out delay-150 absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5"
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
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-base text-gray-600">{description}</p>
      <div
        className={`flex max-w-full overflow-hidden  pt-4 ${
          type === "textLong" && " h-full flex-grow "
        } ${
          type === "imageUploadMultiple" && " h-full min-h-[200px] flex-grow "
        }
        ${((type === "imageUpload")|| (type === "fileUpload")) && " min-h-[64px] "}`}
      >
        {handleType(type)}
      </div>
      {type === "imageUploadMultiple" && answers.length > 0 && renderImages}
      {type === "imageUpload" && answers.length > 0 && (
        <ImagePreview url={answers[answers.length - 1]} />
      )}
      {type === "fileUpload" && answers.length > 0 && (
        <a
          className="text-gray-500 hover:underline justify-self-start flex justify-start gap-1"
          href={answers[answers.length - 1]}
        >
          <div className="group relative flex w-max flex-col justify-center gap-1 pt-4">
            <div className=" flex h-[150px] w-[150px] items-center justify-center rounded-md border border-gray-300">
              <HiDocument className=" h-16 w-16 text-gray-500 " />
            </div>
            <p className="">View Uploaded PDF</p>
          </div>
        </a>
      )}
    </div>
  );
}

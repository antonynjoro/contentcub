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

export default function Question({
  questionId,
  type,
  title,
  description,
  requestId,
}) {
  const [answer, setAnswer] = useState("");
  const [initiallyFetchedAnswer, setInitiallyFetchedAnswer] = useState("");
  const [dataFetched, setDataFetched] = useState(false);


  const debouncedSubmitAnswer = useCallback(
    debounce((requestId, questionId, answer) => {
      submitAnswer(requestId, questionId, answer)
        .then((res) => {
          console.log(res);
          setAnswer(res.answers[0].value);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000),
    [],
  );

  useEffect(() => {
    if (!dataFetched) {
      // Fetch data only once
      fetchAnswer(requestId, questionId)
        .then((res) => {
          console.log("res: ", res);
          if (res.answers.length > 0) {
            setAnswer(res.answers[0].value);
            setInitiallyFetchedAnswer(res.answers[0].value);
          }
          setDataFetched(true);
        })
        .catch((err) => {
          console.log(err);
          setDataFetched(true); // Ensure this is set to true even if there is an error
        });
    } else if (answer !== initiallyFetchedAnswer) {
      // Submit answer if it's different from the initially fetched one
      debouncedSubmitAnswer(requestId, questionId, answer);
    }
  }, [answer, debouncedSubmitAnswer, questionId, requestId, dataFetched]);

  function handleType(type) {
    if (type === "textShort") {
      return (
        <ShortAnswerField
          handleChange={setAnswer}
          autoFocus={true}
          value={answer}
        />
      );
    } else if (type === "textLong") {
      return <LongAnswerField />;
    } else if (type === "fileUpload") {
      return (
        <UploadButton
          className=" left"
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Upload Failed, please try again.");
          }}
        />
      );
    } else if (type === "imageUpload") {
      return (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            setAnswer(res[0].url);
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
    } else if (type === "imageUploadMultiple") {
      return (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            setAnswer(res[0].url);
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          className="h-full w-full ut-label:text-gray-900 ut-upload-icon:text-yellow-400"
        />
      );
    } else {
      return <p>Invalid Type</p>;
    }
  }

  return (
    <div
      className={`flex w-full max-w-full flex-grow flex-col items-stretch justify-center p-6 sm:p-20 ${
        type === "textLong" && "sm:p-4 sm:pb-6"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-base text-gray-600">{description}</p>
      <div
        className={`flex max-w-full pt-4 ${type === "textLong" && "h-full"}`}
      >
        {handleType(type)}
      </div>
      {(((type === "imageUploadMultiple") 
        || (type === "imageUpload") ) && (answer!=="")) && (
        <Image src={answer} width={100} height={100} className="pt-6" />
        )
      }
    </div>
  );
}

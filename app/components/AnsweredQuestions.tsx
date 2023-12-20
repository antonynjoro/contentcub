"use client";
import Button from "./Button";
import Chip from "./Chip";
import { LongAnswerDisplay } from "./LongAnswerField";
import { useRouter } from "next/navigation";
import EmptyAnswerDisplay from "./EmptyAnswerDisplay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineClipboard } from "react-icons/hi2";
import copyToClipboard from "../utils/copyToClipboard";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { HiDownload } from "react-icons/hi";
import ImageAnswerDisplay from "./ImageAnswerDisplay";

export default function AnsweredQuestions({ currentQuestion, requestId, requestTitle }) {
  const [copyValue, setcopyValue] = useState(null); // this is the value that will be copied to the clipboard
  const [copyButtonLabel, setCopyButtonLabel] = useState("Copy Text"); // this is the label of the copy button
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false); // this is the label of the copy button
  const [filename, setFilename] = useState(null); // this is the name of the file to be downloaded if the question is a file upload

  const router = useRouter();

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }

    if (currentQuestion?.answers?.length === 0) {
      // if the question has no answer, set the copied value to null
      setcopyValue(null);
      setCopyButtonDisabled(true);
    } else {
      // if the question has an answer, set the copied value to the first answer
      setcopyValue(currentQuestion.answers[0].value);
      setCopyButtonDisabled(false);
    }

    if (currentQuestion.type === "imageUpload") {
      setCopyButtonLabel("Download Image");
    } else if (currentQuestion.type === "fileUpload") {
      setCopyButtonLabel("Download File");
    } else if (currentQuestion.type === "imageUploadMultiple") {
      setCopyButtonLabel("Download Images");
    } else if ((currentQuestion.type === "textShort") || (currentQuestion.type === "textLong")) {
      setCopyButtonLabel("Copy Text");
    } 
  }, [currentQuestion]);

  useEffect(() => {
    // make the filename the combination of the request title and the question title
    if (currentQuestion && requestTitle) {
      if ((currentQuestion.type === "imageUpload") || (currentQuestion.type === "fileUpload") || (currentQuestion.type === "imageUploadMultiple")) {
        setFilename(`${requestTitle} - ${currentQuestion.title}`);
      }
    }
  }, [currentQuestion, requestTitle]);

  function handleCopyButtonClicked() {
     // copy contents of the answer to the clipboard
     copyToClipboard(copyValue).then(() => {
      setCopyButtonLabel("Copied!");
      toast.success("Copied text to the clipboard!");
      setTimeout(() => {
        setCopyButtonLabel("Copy Text");
      }, 2000);
    });
  }

  function getFileExtension(url:string) {
    // Extracts the extension from a URL (e.g., '.jpg', '.png', '.svg', '.pdf')
    return url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
  }
  
  function handleDownload() {
    if (
      currentQuestion.type === "imageUpload" ||
      currentQuestion.type === "fileUpload"
    ) {
      // Download the image or file
      const url = currentQuestion.answers[0].value;
      const extension = getFileExtension(url);
      const downloadFilename = `${filename}.${extension}`;
  
      saveAs(url, downloadFilename);
    } else if (currentQuestion.type === "imageUploadMultiple") {
      // Download all images in a zip file
      const zip = new JSZip();
      const zipFilename = `${filename} - images.zip`;
  
      const downloadPromises = currentQuestion.answers.map(async (answer, index) => {
        const response = await fetch(answer.value);
        const blob = await response.blob();
        const extension = getFileExtension(answer.value);
        const newFilename = `${filename} - ${index + 1}.${extension}`;
        
        zip.file(newFilename, blob);
      });
  
      Promise.all(downloadPromises).then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, zipFilename);
        });
      });
    }
  }

  return (
    currentQuestion && (
      <div className=" flex flex-grow flex-col">
        <div className="flex h-[3.8rem] items-center gap-2 border-b border-gray-300 bg-white px-4 py-2.5">
          <div className="flex flex-grow gap-2">
            <h2 className="  text-lg font-medium text-gray-800">
              {currentQuestion.title}
            </h2>
            <Chip
              chipType={
                currentQuestion?.answers?.length > 0 ? "success" : "warning"
              }
            >
              {currentQuestion?.answers?.length > 0 ? "Answered" : "Unanswered"}
            </Chip>
          </div>
          <div className="justify-self-end"></div>
          {currentQuestion?.answers?.length > 0 &&
            (currentQuestion.type === "textShort" ||
              currentQuestion.type === "textLong") && (
              <Button
                size="sm"
                isDisabled={copyButtonDisabled}
                handleClick={() => {
                  handleCopyButtonClicked();
                }}
              >
                <HiOutlineClipboard className="h-4 w-4" />

                {copyButtonLabel}
              </Button>
            )}
          {currentQuestion?.answers?.length > 0 &&
            (currentQuestion.type === "imageUpload" ||
              currentQuestion.type === "imageUploadMultiple" ||
              currentQuestion.type === "fileUpload") && (
              <Button
                size="sm"
                handleClick={() => {
                  handleDownload();
                }}
              >
                <HiDownload className="h-4 w-4" />

                {copyButtonLabel}
              </Button>
            )}
        </div>
        <div className="flex flex-grow flex-col gap-2 p-4">
          {currentQuestion.answers.length === 0 && (
            <EmptyAnswerDisplay
              requestId={requestId}
              questionId={currentQuestion.id}
            />
          )}
          {currentQuestion.type === "textShort" &&
            currentQuestion.answers.map((answer) => (
              <div
                key={answer.id}
                className="flex flex-col items-center gap-2 rounded-md border-2 border-dashed border-gray-300 p-6"
              >
                <p className="text-lg font-medium text-gray-800">
                  {answer.value}
                </p>
              </div>
            ))}
          {currentQuestion.type === "textLong" &&
            currentQuestion.answers.map((answer) => (
              <div key={answer.id}>
                <LongAnswerDisplay
                  answerId={answer.id}
                  answerJSON={answer.value}
                  setCopyValue={setcopyValue}
                />
              </div>
            ))}
          {(currentQuestion.type === "imageUpload" || currentQuestion.type === "imageUploadMultiple") &&
            <div className="grid grid-cols-4 gap-4 items-stretch">
            {currentQuestion.answers.map((answer) => (
              <div key={answer.id}>
                <ImageAnswerDisplay
                  src={answer.value}
                  alt={currentQuestion.title}
                />
              </div>
            ))}
            </div>
          }

        </div>
      </div>
    )
  );
}

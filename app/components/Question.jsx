import React from "react";
import { UploadDropzone, UploadButton } from "./uploadthing";
import ShortAnswerField from "./ShortAnswerField.jsx";
import LongAnswerField from "./LongAnswerField.jsx";
import { toast } from "react-hot-toast";

export default function Question({ id, type, title, description }) {
  function handleType(type) {
    if (type === "textShort") {
      return <ShortAnswerField />;
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
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Upload Failed, please try again.");
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
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          className="w-full h-full ut-label:text-gray-900 ut-upload-icon:text-yellow-400"
          
        />
      );
    } 
    
    else {
      return <p>Invalid Type</p>;
    }
  }

  return (
    <div className="flex w-full flex-col items-stretch justify-center flex-grow p-20 max-w-full">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-base text-gray-600">{description}</p>
      <div className="flex max-w-full pt-4">{handleType(type)}</div>
    </div>
  );
}

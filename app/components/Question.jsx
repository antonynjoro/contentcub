import React from "react";
import { UploadDropzone, UploadButton } from "./uploadthing";
import ShortAnswerField from "./ShortAnswerField.jsx";
import LongAnswerField from "./LongAnswerField.jsx";

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
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
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
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      );
    } else {
      return <p>Invalid Type</p>;
    }
  }

  return (
    <div className="flex w-full flex-col items-stretch justify-center p-20">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-base text-gray-600">{description}</p>
      <div className="flex pt-4">{handleType(type)}</div>
    </div>
  );
}

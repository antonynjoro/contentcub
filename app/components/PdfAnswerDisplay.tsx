"use client";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import toast from "react-hot-toast";
import IconButton from "./IconButton";
import { saveAs } from "file-saver";
import { HiDocument } from "react-icons/hi2";
import generateReadableFileSize from "../utils/generateReadableFileSize";

export default function PdfAnswerDisplay({
  pdfLink,
  metadata,
  requestTitle,
  questionTitle,
}) {
  function handleDownload() {
    const url = pdfLink;
    const extension = url.split(".").pop();
    const downloadFilename = `${requestTitle} - ${questionTitle}.${extension}`;

    saveAs(url, downloadFilename);

    return Promise.resolve();
  }

  return (
    <div className="group relative flex w-max flex-col justify-center gap-1">
      <div className="absolute right-1 top-1 flex shrink gap-2 opacity-0 transition-all delay-75 duration-300 ease-in-out group-hover:opacity-100">
        <Button
          size="sm"
          isOutlined
          handleClick={() => {
            handleDownload().then(() => {
              toast.success("Image downloaded successfully");
            });
          }}
        >
          Download
        </Button>
      </div>
      <div className=" flex items-center justify-center rounded-md border border-gray-300 h-[200px] w-[200px]">
        <HiDocument className=" h-16 w-16 text-gray-500 " />
      </div>
      <Link className="hover:underline" href={pdfLink}>
        {metadata.name}
      </Link>
      <div className="flex gap-2 text-sm text-gray-500">
        <p>PDF - {generateReadableFileSize(metadata.size)}</p>
      </div>
    </div>
  );
}

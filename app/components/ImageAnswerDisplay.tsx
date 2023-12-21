"use client";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import toast from "react-hot-toast";
import IconButton from "./IconButton";
import { HiTrash } from "react-icons/hi2";
import { saveAs } from "file-saver";
import generateReadableFileSize from "../utils/generateReadableFileSize";


export default function ImageAnswerDisplay({ imageLink, metadata, requestTitle, questionTitle }) {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageType, setImageType] = useState("");
  const [imageSize, setImageSize] = useState("");

  // function that sets the image size and type
  function handleImageloaded(e) {
    const img = e.target as HTMLImageElement;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });

    setImageType(imageLink.split(".").pop().toUpperCase());

    // convert the string to a number
    const fileSize = Number(metadata.fileSize);

    setImageSize(generateReadableFileSize(fileSize));
  }

  // function that downloads the image
  function handleDownload() {
    const url = imageLink;
    const extension = url.split('.').pop();
    const downloadFilename = `${requestTitle} - ${questionTitle}.${extension}`;
  
    saveAs(url, downloadFilename);

    return Promise.resolve();
  }
  


  

  return (
    <div className="flex flex-col items-start justify-center gap-1 relative group">
      <div className="flex gap-2 absolute top-1 right-1 group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-300 delay-75">
        <Button
          size="sm"
          isOutlined
          handleClick={() => {
            handleDownload().then(() => {
              toast.success("Image downloaded successfully")
          }
            );
          }
          }
        >
          Download
        </Button>
        
      </div>
      <img
        src={imageLink}
        alt={metadata.name}
        width={400}
        height={400}
        className="rounded-md"
        onLoad={(e) => {
          handleImageloaded(e);
        }}
      />
      <Link className="hover:underline"
      href={imageLink}
      >{metadata.name}</Link>
      <div className="flex gap-2 text-sm text-gray-500">
      <p >
      {imageType} - {imageSize}
        
      </p>
      <p>•</p>
      <p>
        {imageDimensions.width} x {imageDimensions.height} px
      </p>
      </div>
    </div>
  );
}

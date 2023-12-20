import Image from "next/image";

export default function ImageAnswerDisplay({src, alt}) {
  return (
    <div className="flex flex-col items-center justify-center">
        <Image
            src={src}
            alt={alt}
            width={400}
            height={400}
            className="rounded-md"
        />
        <p className="">
            {alt}
        </p>
    </div>
    
  )
}

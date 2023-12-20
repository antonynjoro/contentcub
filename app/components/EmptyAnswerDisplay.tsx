import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function EmptyAnswerDisplay({ requestId, questionId }) {
  const router = useRouter();
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-300 p-6">
      <p className="">Answer will be displayed here</p>
      <Button
        handleClick={() => {
          router.push(`/checklists/${requestId}/submit`);
        }}
      >
        Add Answer
      </Button>
    </div>
  );
}

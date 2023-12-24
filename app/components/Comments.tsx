"use client";
// Comments side bar that allows user and the client to communicate with each other
import ChatBubble from "./ChatBubble";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { fetchComments } from "../actions/fetchComments";
import PostCommentField from "./PostCommentField";
import toast from "react-hot-toast";
import postCommentToServer from "../actions/postCommentToServer";

// Mock comment data
const mockComments = [
  {
    commentId: "1",
    senderId: "656a167818b2a2b7c8a4784b",
    senderFullName: "John Doe",
    senderImageUrl: "/profile-placeholder-image.png",
    senderType: "client",
    createdAt: "2021-09-19T17:30:00.000Z",
    commentText: "Hello, I have a question about the project",
  },
];

export default function Comments({ questionId, senderType, senderId }) {
  const { user } = useUser();
  const [comments, setComments] = useState([]); // [{commentId, senderId,senderFullName, senderImageUrl, senderType, createdAt, commentText}]
  const [newComment, setNewComment] = useState({
    commentText: "",
    senderId: "",
    senderType: senderType as "client" | "user",
    questionId: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);


  // // TODO remove this when we have the real data
  // useEffect(() => {
  //   // set mockdata for now
  //   setComments(mockComments);
  // }
  // , []);

  useEffect(() => {
    console.log("QuestionId", questionId);
    if (questionId) {
      //fetch comments from server
      fetchComments(questionId).then((res) => {
        console.log("Comments", res);
        setComments(res);

      }
      ).catch((err) => {
        console.log(err);
      });
    }
  }, [questionId]);

  useEffect(() => {
    setNewComment((prevState) => ({
      ...prevState,
      senderId: senderId,
      senderType: senderType,
      questionId: questionId,
    }));

  }, [senderId, senderType, questionId]);

  // clear comment text when questionId changes
  useEffect(() => {
    setNewComment((prevState) => ({ ...prevState, commentText: "" }));
  }, [questionId]);

  function handlePostComment() {
    

    console.log("Post Comment");
    
    console.log("New Comment Haiya!", newComment);
    if (senderType == 'client' || senderType == 'user') {
      setIsDisabled(true);

      if (!newComment.commentText) {
        toast.error("Comment cannot be empty");
        setIsDisabled(false);
        return;
      }

      postCommentToServer(newComment)
      .then((res) => {
        setComments(res);
        setNewComment((prevState) => ({ ...prevState, commentText: "" }));
        toast.success("Comment posted");
      })
      .catch((err) => {
        toast.error("Error posting comment");
      })
      .finally(() => {
        setIsDisabled(false);
      });
    } else return
    
    
  }

  return (
    <>
      <div className="border-b border-gray-300 bg-white">
        <h2 className=" p-4 text-lg font-medium text-gray-800">
          Comments ({comments.length})
        </h2>
      </div>
      <div className="flex flex-grow flex-col-reverse gap-6 overflow-hidden overflow-y-scroll p-4">
        {!questionId || comments.length === 0 ? (
          <p className="p-4 text-center text-gray-400">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <ChatBubble
              key={comment.id}
              commentText={comment.commentText}
              senderId={comment.senderId}
              fullName={comment.senderFullName}
              imageUrl={comment.senderImageUrl}
              createdAt={comment.createdAt}
              senderType={comment.senderType}
            />
          ))
        )}
      </div>
      {questionId && (
        <div className="border-t p-2">
          <PostCommentField
            isDisabled={isDisabled}
            placeholder="Post a comment..."
            buttonLabel="Post"
            commentText={newComment.commentText}
            setCommentText={(value: string) =>
              setNewComment((prevState) => ({
                ...prevState,
                commentText: value,
              }))
            }
            handlePostComment={handlePostComment}
          />
        </div>
      )}
    </>
  );
}

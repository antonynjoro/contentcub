"use client";
import ModalContainer from "./ModalContainer";
import Button from "./Button";
import ShortAnswerField from "./ShortAnswerField";
import { useState } from "react";

export default function AddRequestModal({handleModalClose, handleAddRequestName}) {
    const [requestName, setRequestName] = useState("");
    const [fieldHasError, setFieldHasError] = useState(false);

    function handleAddButtonClicked() {
        if (requestName === "") {
            setFieldHasError(true);
        } else {
            handleAddRequestName(requestName);
        }
    }
  return (
    <ModalContainer  handleModalClose={handleModalClose}>
        <div className="flex flex-col gap-6">
            <div className="flex flex-col">
            <h2 className=" text-xl md:text-2xl font-bold">Create a new Checklist</h2>
            <p className="text-gray-500 text-sm">Create a new checklist to send to your clients.</p>
            </div>
            <ShortAnswerField
                label="Name of the request"
                placeholder="eg. ###.com Website Content Checklist"
                helpText="This is the name of the checklist that will be displayed to the client."
                handleChange={setRequestName}
                hasError={fieldHasError}
                value={requestName}
            />
            <div className="flex flex-row justify-end gap-4">
            <Button handleClick={handleModalClose} isSecondary={true} >Cancel</Button>
            <Button handleClick={handleAddButtonClicked}>Create Checklist</Button>
            </div>
        </div>
    </ModalContainer>
  )
}

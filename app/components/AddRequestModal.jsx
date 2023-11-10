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
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Add Request</h2>
            <ShortAnswerField
                label="Name of the request"
                placeholder="eg. ###.com Website Content Request"
                helpText="This is the name of the request that will be displayed to the client."
                handleChange={setRequestName}
                hasError={fieldHasError}
            />
            <div className="flex flex-row justify-end gap-4">
            <Button handleClick={handleModalClose} isSecondary={true} >Cancel</Button>
            <Button handleClick={handleAddButtonClicked}>Add Request</Button>
            </div>
        </div>
    </ModalContainer>
  )
}

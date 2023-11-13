"use client";
import ModalContainer from "./ModalContainer"
import Button from "./Button"
import ShortAnswerField from "./ShortAnswerField"
import { useState } from "react"
import sendRequest from "../actions/sendRequest.ts"

export default function SendRequestModal({handleModalClose, requestId, }) {
    const [clientEmail, setClientEmail] = useState("");
    const [fieldHasError, setFieldHasError] = useState(false);

    function handleSendRequestButtonClicked() {
        console.log("requestId", requestId)
        console.log("clientEmail", clientEmail)
        if (clientEmail === "") {
            setFieldHasError(true);
        } else {
            sendRequest(requestId, clientEmail);
            handleModalClose((prev) => !prev);
        }
    }
  return (
    <ModalContainer>
         <h2 className="text-2xl font-bold">Send Request</h2>
         <ShortAnswerField type="email"
            label="Email address"
            helpText={"They will receive an email with a link to the request."}
            handleChange={setClientEmail}
            hasError={fieldHasError}
            value={clientEmail}
            autoFocus={true}
        />
        <div className="flex flex-row justify-end gap-4">
            <Button handleClick={handleModalClose} isSecondary={true} >Cancel</Button>
            <Button handleClick={handleSendRequestButtonClicked}>Send Request</Button>
            </div>
    </ModalContainer>
  )
}

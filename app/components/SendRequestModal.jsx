"use client";
import ModalContainer from "./ModalContainer";
import Button from "./Button";
import ShortAnswerField from "./ShortAnswerField";
import { useState, useEffect } from "react";
import sendRequest from "../actions/sendRequest.ts";
import { toast } from "react-hot-toast";
import IconButton from "./IconButton";
import { MdOutlineInsertLink } from "react-icons/md";
import { HiX } from "react-icons/hi";

import fetchClientsOnRequest from "../actions/fetchClientsOnRequest";
import removeClientFromRequest from "../actions/removeClientFromRequest";

export default function SendRequestModal({
  handleModalClose,
  requestId,
  setIsRequestSent,
}) {
  const [clientEmail, setClientEmail] = useState("");
  const [fieldHasError, setFieldHasError] = useState(false);
  const [clientsOnRequest, setClientsOnRequest] = useState([]);

  useEffect(() => {
    fetchClientsOnRequest(requestId)
      .then((clients) => {
        setClientsOnRequest(clients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [requestId]);

  function handleSendRequestButtonClicked() {
    console.log("requestId", requestId);
    console.log("clientEmail", clientEmail);
    if (clientEmail === "") {
      setFieldHasError(true);
    } else {
      // Using toast.promise to handle the loading, success, and error states
      toast.promise(
        sendRequest(requestId, clientEmail), // Promise
        {
          loading: "Sending the Checklist...",
          success: "Checklist sent!",
          error: (err) => {
            // Check if the error message matches the specific error from sendRequest
            if (err.message.includes("is already in the request")) {
              return "The client is already in the checklist!";
            } else {
              return "Something went wrong!"; // Generic error message for other errors
            }
          },
        },
        {
          // Optional: Additional toast options like styling
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 5000,
          },
        },
      );

      handleModalClose((prev) => !prev);
    }
  }

  function handleRemoveClientButtonClicked(clientId) {
    removeClientFromRequest(requestId, clientId)
      .then((res) => {
        setClientsOnRequest((prevClients) =>
          prevClients.filter((client) => client.id !== clientId),
        );
      })
      .then((data) => {
        toast.success("Contact removed!");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  }

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <h2 className="text-2xl font-bold">Send Checkist</h2>
      <ShortAnswerField
        type="email"
        label="Email address"
        helpText={"They will receive an email with a link to the checklist."}
        handleChange={setClientEmail}
        hasError={fieldHasError}
        value={clientEmail}
        autoFocus={true}
      />

      <div className="flex flex-col gap-2 md:pt-4">
        <h3 className="text-lg font-bold">Clients in this request</h3>
        <div className="flex flex-col gap-2">
          {clientsOnRequest.length === 0 ? (
            <p className=" text-sm text-gray-500">No clients added yet.</p>
          ) : (
            clientsOnRequest.map((client) => (
              <div
                className="flex flex-row items-center justify-between"
                key={client.id}
              >
                <div className="flex flex-col gap-x-3  md:flex-row md:items-center">
                  {client.firstName?.length > 0 ? (
                    <p>
                      {client.firstName} {client?.lastName}
                    </p>
                  ) : (
                    <p>{client.email}</p>
                  )}
                  {client.email === clientsOnRequest[0].email && (
                    <p className="text-xs text-gray-500">Main Contact</p>
                  )}
                </div>
                <IconButton
                  size="sm"
                  tooltipText={"Remove client"}
                  handleClick={() => {
                    handleRemoveClientButtonClicked(client.id);
                  }}
                  IconComponent={HiX}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-6 md:flex-row md:gap-4">
        {clientsOnRequest.length > 0 && (
          <Button
            size="md"
            tooltipText={"Copy the link to the checklist"}
            handleClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/checklists/${requestId}/submit`,
              );
              toast.success("Link copied to clipboard!");
            }}
            isOutlined
          >
            <div className="flex items-center gap-x-3">
              <MdOutlineInsertLink />
              Copy Link
            </div>
          </Button>
        )}
        <div className="flex flex-grow flex-col justify-end gap-2 md:flex-row md:gap-4">
          <div className="hidden md:block">
            <Button
              handleClick={() => handleModalClose((prev) => !prev)}
              isSecondary={true}
            >
              Cancel
            </Button>
          </div>
        
        <Button handleClick={handleSendRequestButtonClicked}>
          Send Checklist
        </Button>
        <div className="absolute right-2 top-2 md:hidden">
          <IconButton
            handleClick={() => handleModalClose((prev) => !prev)}
            IconComponent={HiX}
            size="md"
            tooltipText={"Close"}
          />
        </div>
      </div>
      </div>
    </ModalContainer>
  );
}

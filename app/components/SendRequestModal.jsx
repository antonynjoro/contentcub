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

export default function SendRequestModal({ handleModalClose, requestId }) {
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
      sendRequest(requestId, clientEmail)
        .then((data) => {
          toast.success("Request sent!");
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });

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
        toast.success("Client removed!");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  }

  
  return (
    <ModalContainer
        handleModalClose={handleModalClose}
    >
      <h2 className="text-2xl font-bold">Send Request</h2>
      <ShortAnswerField
        type="email"
        label="Email address"
        helpText={"They will receive an email with a link to the request."}
        handleChange={setClientEmail}
        hasError={fieldHasError}
        value={clientEmail}
        autoFocus={true}
      />

      <div className="flex flex-col gap-2 pt-4">
        <h3 className="text-lg font-bold">Clients in this request</h3>
        <div className="flex flex-col gap-2">
          {clientsOnRequest.length === 0 ? (
            <p className=" text-sm text-gray-500">No clients added yet.</p>
          ) : (
            clientsOnRequest.map((client) => (
              <div className="flex flex-row justify-between items-center" key={client.id}>
                <div className="flex items-center gap-x-3">
                {client.firstName?.length > 0 ? <p>{client.firstName} {client?.lastName}</p>
                    : <p>{client.email}</p>
                }
                {client.email === clientsOnRequest[0].email && <p className="text-xs text-gray-500">Main Contact</p>}
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

      <div className="flex gap-4 pt-6">
        {clientsOnRequest.length > 0 && (
            
        <IconButton
          size="md"
          tooltipText={"Copy link"}
          handleClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/checklists/${requestId}/submit`,
            );
            toast.success("Link copied to clipboard!");
          }}
          IconComponent={MdOutlineInsertLink}
        />
        )}
        <div className="flex flex-grow flex-row justify-end gap-4">
          <Button handleClick={
            () => handleModalClose((prev) => !prev)
          } isSecondary={true}>
            Cancel
          </Button>
          <Button handleClick={handleSendRequestButtonClicked}>
            Send Request
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}

"use client";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import toast from "react-hot-toast";
import EditIconButton from "./EditIconButton";
import DeleteIconButton from "./DeleteIconButton";
import ImageUploader from "./ImageUploader";

export default function SampleFormBuilder() {
  const [fields, setFields] = useState([]);
  const [builderError, setBuilderError] = useState(null);
  const [labelError, setLabelError] = useState(null);
  const [currentlyEditingIndex, setCurrentlyEditingIndex] = useState(null);
  const [fieldAttributes, setFieldAttributes] = useState({
    type: "text",
    placeholder: "",
    label: "",
    required: false,
    helpText: "",
  });
  const [commonFields, setCommonFields] = useState([
    {
      type: "text",
      placeholder: "",
      label: "First Name",
      required: false,
      helpText: "",
    },
    {
      type: "text",
      placeholder: "",
      label: "Last Name",
      required: false,
      helpText: "",
    },
    {
      type: "email",
      placeholder: "",
      label: "Email",
      required: false,
      helpText: "",
    },
    {
      type: "text",
      placeholder: "",
      label: "Phone",
      required: false,
      helpText: "",
    },
  ]);

  function addField() {
    if (!fieldAttributes.label) {
      console.log("Please enter a label");
      console.log("here are the current field attributes:", fieldAttributes)
      const errorText = "Please enter a label";
      toast.error(errorText);
      setBuilderError(errorText);
      setLabelError(errorText);
      return;
    }

    // if the field is being edited, update the fields array
    if (currentlyEditingIndex !== null) {
      const newFields = [...fields];
      newFields[currentlyEditingIndex] = { ...fieldAttributes };
      setFields(newFields);
      setCurrentlyEditingIndex(null);
    } else {
      setFields([...fields, { ...fieldAttributes }]);
    }

    // Clear errors if any
    setBuilderError(null);
    setLabelError(null);

    // reset the field attributes
    setFieldAttributes({
      type: "text",
      placeholder: "",
      label: "",
      required: false,
      helpText: "",
      value: "",
    });
  }

  useEffect(() => {
    console.log("Fields:", fields);
    console.log("Field Attributes:", fieldAttributes);
  }, [fields, fieldAttributes]);

  function saveForm() {
    console.log("Form saved:", fields);
  }

  function handleAttributeChange(attr, value) {
    setFieldAttributes({ ...fieldAttributes, [attr]: value });
  }

  function editField(field) {
    console.log("Edit field:", field);
    setFieldAttributes({ ...field });
    setCurrentlyEditingIndex(fields.indexOf(field));
  }

  function deleteField(field) {
    console.log("Delete field:", field);
    const newFields = [...fields];
    newFields.splice(fields.indexOf(field), 1);
    setFields(newFields);
  }

  function addPredefinedField(field) {
    console.log("Add predefined field:", field);
    setFields([...fields, { ...field }]);

  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full p-6">
      {/* Builder */}
      <div className="flex flex-col max-w-sm space-y-6">
        <h1 className=" text-xl">Form Builder</h1>
        <select
          onChange={(e) => handleAttributeChange("type", e.target.value)}
          className="border border-gray-300 rounded-sm p-3"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="image">Image</option>
          <option value="paragraph">Paragraph</option>
        </select>

        <InputField
          type="text"
          label="Label"
          placeholder="eg. First Name"
          required={true}
          helpText="Add a label for your field"
          value={fieldAttributes.label}
          handleChange={(value) => handleAttributeChange("label", value)}
          hasError={true}
          errorText={labelError}
        />

        <InputField
          type="text"
          label="Placeholder"
          placeholder="eg. John"
          required={false}
          helpText="Add a placeholder for your field"
          value={fieldAttributes.placeholder}
          handleChange={(value) => handleAttributeChange("placeholder", value)}
          hasError={true}
        />

        <InputField
          type="text"
          label="Help Text"
          placeholder="eg. Enter your first name"
          required={false}
          helpText="Add a help text for your field"
          value={fieldAttributes.helpText}
          handleChange={(value) => handleAttributeChange("helpText", value)}
          hasError={true}
        />

        <div className="flex gap-4">
          <input
            type="checkbox"
            onChange={(e) =>
              handleAttributeChange("required", e.target.checked)
            }
            checked={fieldAttributes.required}
          />
          <label>Required</label>
        </div>
        <button onClick={addField}>
          {currentlyEditingIndex !== null ? "Update Field" : "Add Field"}
        </button>
        <button onClick={saveForm}>Save Form</button>

        {/* Common Fields suggestions */}
        <div className="flex flex-col gap-4">
          <h1 className=" text-xl">Common Fields</h1>
          <div className="flex gap-4 flex-wrap">
            {commonFields.map((field, index) => (
              <button
                key={index}
                className="border border-gray-300 rounded-sm p-3"
                onClick={() => addPredefinedField(field)}
              >
                {field.label}
              </button>
            ))}
            
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex gap-4 flex-col border rounded-md p-8 bg-slate-50 ">
        <h1 className=" text-xl mb-6">Preview of the created form</h1>
        {fields.length === 0 && (
          <p className=" text-gray-600">Add a field to see it here</p>
        )}

        {fields.map((field, index) => (
          <div key={index}>
            {["text", "email", "phone"].includes(field.type) && (
              <div className="flex gap-4 items-center">
                <div
                  className={`flex-grow ${
                    currentlyEditingIndex === index &&
                    "border border-dashed border-orange-300 rounded-md p-2"
                  }`}
                >
                  <InputField
                    type={field.type}
                    placeholder={field.placeholder}
                    label={field.label}
                    required={field.required}
                    helpText={field.helpText}
                    value={field.value}
                  />
                </div>
                <DeleteIconButton
                  handleClick={() => deleteField(field)}
                  tooltipText="Delete this field"
                />
                <EditIconButton
                  tooltipText="Edit this field"
                  handleClick={() => editField(field)}
                />
              </div>
            )}

            {field.type === "image" && (
              <div className="flex gap-4 items-center">
                <div
                  className={`flex-grow ${
                    currentlyEditingIndex === index &&
                    "border border-dashed border-orange-300 rounded-md p-2"
                  }`}
                >
                  <p className="">Image Uploader</p>
                </div>
                <DeleteIconButton
                  handleClick={() => deleteField(field)}
                  tooltipText="Delete this field"
                />
                <EditIconButton
                  tooltipText="Edit this field"
                  handleClick={() => editField(field)}
                />
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

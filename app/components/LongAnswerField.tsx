import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { generateHTML } from "@tiptap/html";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";

import { useEffect, useState, useCallback, useMemo } from "react";

import copyToClipboard from "../utils/copyToClipboard";

import DOMPurify from "dompurify";

import {
  BsLine,
  BsTypeBold,
  BsTypeItalic,
  BsBlockquoteLeft,
} from "react-icons/bs";
import {
  MdOutlineHorizontalRule,
  MdUndo,
  MdRedo,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { TextSelection } from "prosemirror-state";

export default function LongAnswerField({ onEditorChange, value }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2] }),
      BulletList,
      OrderedList,
      BulletList,
      Blockquote,
      Link,
      HorizontalRule,
      // ... other extensions
    ],
    content: "",
    onUpdate: ({ editor }) => {
      onEditorChange(JSON.stringify(editor.getJSON()));
    },
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  const updateInternalValue = useCallback(
    (newValue) => {
      if (editor) {
        const currentContent = editor.getJSON();
        if (JSON.stringify(currentContent) !== JSON.stringify(newValue)) {
          const { from, to } = editor.state.selection;
          editor.commands.setContent(newValue);
          editor.view.dispatch(
            editor.state.tr.setSelection(
              TextSelection.create(editor.state.doc, from, to),
            ),
          );
        }
      }
    },
    [editor],
  );

  useEffect(() => {
    if (value) {
      try {
        const parsedValue = JSON.parse(value);
        updateInternalValue(parsedValue);
      } catch (e) {
        console.error("Error parsing value:", e);
      }
    }
  }, [value, updateInternalValue]);

  return (
    <div className="grid max-h-fit min-h-[300px]	 flex-grow auto-rows-min grid-cols-1  overflow-hidden overflow-y-auto  rounded-lg border border-gray-300 ">
      <ToolBar editor={editor} />

      <EditorContent
        editor={editor}
        className="tiptap-editor h-min min-h-[6em] overflow-hidden overflow-y-auto px-4 py-2"
      />
    </div>
  );
}

function ToolBar({ editor }) {
  const defaultButtonStyle = `btn border rounded p-1.5 hover:bg-gray-200`;
  const activeButtonStyle =
    " btn border rounded p-1.5 bg-gray-200 hover:bg-gray-400";
  const iconStyle = "h-5 w-5";

  const toggleHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="sticky top-0 z-10 mb-2 flex gap-2 overflow-hidden border-b bg-gray-50 px-4 py-3">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          defaultButtonStyle +
          `${editor?.isActive("bold") ? activeButtonStyle : ""}`
        }
        title="Bold"
      >
        <BsTypeBold className={iconStyle} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          defaultButtonStyle +
          `${editor?.isActive("italic") ? activeButtonStyle : ""}`
        }
        title="Italic"
      >
        <BsTypeItalic className={iconStyle} />
      </button>
      <button
        onClick={() => toggleHeading(1)}
        className={
          editor?.isActive("heading", { level: 1 })
            ? activeButtonStyle
            : defaultButtonStyle
        }
        title="Heading 1"
      >
        H1
      </button>
      <button
        onClick={() => toggleHeading(2)}
        className={
          editor?.isActive("heading", { level: 2 })
            ? activeButtonStyle
            : defaultButtonStyle
        }
        title="Heading 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor?.isActive("bulletList")
            ? activeButtonStyle
            : defaultButtonStyle
        }
        title="Bullet List"
      >
        <MdOutlineFormatListBulleted className={iconStyle} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor?.isActive("orderedList")
            ? activeButtonStyle
            : defaultButtonStyle
        }
        title="Ordered List"
      >
        <MdOutlineFormatListNumbered className={iconStyle} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor?.isActive("blockquote")
            ? activeButtonStyle
            : defaultButtonStyle
        }
        title="Blockquote"
      >
        <BsBlockquoteLeft className={iconStyle} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={defaultButtonStyle}
        title="Horizontal Rule"
      >
        <MdOutlineHorizontalRule className={iconStyle} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={defaultButtonStyle}
        title="Undo"
      >
        <MdUndo className={iconStyle} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={defaultButtonStyle}
        title="Redo"
      >
        <MdRedo className={iconStyle} />
      </button>
    </div>
  );
}

export function LongAnswerDisplay({ answerId, answerJSON, setCopyValue }) {
  const output = useMemo(() => {
    const html = generateHTML(JSON.parse(answerJSON), [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      Link,
      HardBreak
    ]);
    // Sanitize the HTML with DOMPurify
    return DOMPurify.sanitize(html);
  }, [answerJSON]);

  useEffect(() => {
    setCopyValue(output);
  }, [output, setCopyValue]);

  return (
    <>
      <div
        className="tiptap-editor"
        dangerouslySetInnerHTML={{ __html: output }}
      ></div>
    </>
  );
}

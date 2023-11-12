import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";


export default function LongAnswerField() {
  const editor: BlockNoteEditor = useBlockNote({});

  return (
  
  <BlockNoteView editor={editor} className="w-full -ml-[54px]" />

  );
}

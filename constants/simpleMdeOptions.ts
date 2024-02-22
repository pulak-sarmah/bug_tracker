type ToolOption = [string];

let toolbarOptions: any[];

if (typeof window !== "undefined") {
  const { toggleCodeBlock } = require("easymde");

  toolbarOptions = [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "image",
    "|",
    "preview",
    "side-by-side",
    "fullscreen",
    "|",
    {
      name: "code",
      action: toggleCodeBlock,
      className: "fa fa-code",
      title: "Code",
    },
    {
      name: "code-block",
      action: toggleCodeBlock,
      className: "fa fa-file-code-o",
      title: "Code Block",
    },
    "|",
    "undo",
    "redo",
    "clean-block",
    "|",
    "guide",
  ];
}

export { toolbarOptions };

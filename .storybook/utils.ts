export const copyCanvas = (str: string) => {
  navigator.clipboard
    .writeText(str)
    .then(() => {
      //
    })
    .catch(() => console.log("copy fallback"));
};

export const StoryBookCopyAction = (str: string) => [
  {
    title: "Copy",
    onClick: () => copyCanvas(str),
  },
];

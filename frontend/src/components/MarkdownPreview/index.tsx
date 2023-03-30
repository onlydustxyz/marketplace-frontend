import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type Props = {
  children: string;
};

const MarkdownPreview: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <ReactMarkdown
        skipHtml={true}
        remarkPlugins={[[remarkGfm]]}
        className="text-greyscale-50 font-walsheim font-normal text-sm text-justify max-w-full prose prose-invert"
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;

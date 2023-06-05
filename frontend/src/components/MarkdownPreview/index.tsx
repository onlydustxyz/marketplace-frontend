import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type Props = {
  className?: string;
  children: string;
};

export default function MarkdownPreview({ className, children }: Props) {
  return (
    <div>
      <ReactMarkdown
        skipHtml={true}
        remarkPlugins={[[remarkGfm]]}
        className={`text-greyscale-50 font-walsheim font-normal text-justify max-w-full prose prose-invert ${className}`}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

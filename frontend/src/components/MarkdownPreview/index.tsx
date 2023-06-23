import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type Props = {
  className?: string;
  children: string;
  testId?: string;
};

export default function MarkdownPreview({ className, testId, children }: Props) {
  return (
    <div data-testid={testId}>
      <ReactMarkdown
        skipHtml={true}
        remarkPlugins={[[remarkGfm]]}
        className={`text-greyscale-50 font-walsheim font-normal max-w-full prose prose-invert ${className}`}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

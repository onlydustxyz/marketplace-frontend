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
        className={`prose prose-invert max-w-full font-walsheim font-normal text-greyscale-50 ${className}`}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

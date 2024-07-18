import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";

// @ts-expect-error default export type is not supported by next/dynamic for some reason, but the component works
const ReactMarkdown = dynamic(() => import("react-markdown"));

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
        className={`prose prose-invert max-w-full break-words font-walsheim font-normal text-greyscale-50 ${className}`}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

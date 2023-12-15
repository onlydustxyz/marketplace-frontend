import { PropsWithChildren } from "react";

function Message({ children }: PropsWithChildren) {
  return <p className="whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50">{children}</p>;
}

export default function EmptyTablePlaceholder({ children, colSpan }: PropsWithChildren<{ colSpan: number }>) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="pt-6">
          <Message>{children}</Message>
        </div>
      </td>
    </tr>
  );
}

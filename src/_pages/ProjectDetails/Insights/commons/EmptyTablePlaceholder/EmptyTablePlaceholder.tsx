import { PropsWithChildren } from "react";

import MessagePlaceholder from "src/components/New/Placeholders/MessagePlaceholder";

export default function EmptyTablePlaceholder({ children, colSpan }: PropsWithChildren<{ colSpan: number }>) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="pt-6">
          <MessagePlaceholder>{children}</MessagePlaceholder>
        </div>
      </td>
    </tr>
  );
}

import { ReactNode } from "react";
import Button from "./Button";
import { ButtonSize, ButtonType } from "../../../src/components/Button";
import LogoutBoxRLine from "../../../src/icons/LogoutBoxRLine"; // Replace with actual import path

interface EmptyStateProps {
  illustration: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ illustration, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      {illustration}
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      {description && <p className="mt-2 text-base text-gray-600">{description}</p>}
      {actionLabel && (
        <Button className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
      <Button type={ButtonType.Secondary} size={ButtonSize.Xs} onClick={handleLogoutClick} data-testid="logout-button">
        <LogoutBoxRLine className="border-greyscale-50 text-sm" />
        {T("navbar.logout")}
      </Button>
    </div>
  );
}

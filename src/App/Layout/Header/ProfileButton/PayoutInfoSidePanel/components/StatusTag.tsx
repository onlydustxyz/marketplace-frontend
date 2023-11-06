import Tag, { TagSize } from "src/components/Tag";
import Box from "src/components/Utils/Box";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";

export enum StatusType {
  Contact = "CONTACT",
  Payment = "PAYMENT",
}

const validMessages = {
  [StatusType.Contact]: "profile.form.contactSettingsValidTag",
  [StatusType.Payment]: "profile.form.payoutSettingsValidTag",
};

const invalidMessages = {
  [StatusType.Contact]: "profile.missing.contact",
  [StatusType.Payment]: "profile.missing.payment",
};

const networksMessages = {
  missingAptosWallet: "currencies.network.APT",
  missingEthWallet: "currencies.network.ETH",
  missingOptimismWallet: "currencies.network.OP",
  missingSepaAccount: "currencies.network.USD",
  missingUsdcWallet: "currencies.network.ETH",
  missingStarknetWallet: "currencies.network.STARK",
};

type StatusTagType = {
  isValid: boolean;
  type: StatusType;
  requiredNetworks?: Record<string, boolean>;
  isFiat?: boolean;
};

export function StatusTag({ isValid, type, requiredNetworks, isFiat }: StatusTagType) {
  const { T } = useIntl();

  const networks = requiredNetworks
    ? Object.entries(requiredNetworks)
        .filter(([, value]) => value)
        .map(([key]) =>
          isFiat && key === "missingUsdcWallet"
            ? T(networksMessages["missingSepaAccount"])
            : T(networksMessages[key as keyof typeof networksMessages])
        )
    : [];

  return (
    <Box className="pb-6">
      <Tag size={TagSize.Medium}>
        <div
          className={cn({
            "text-orange-500": !isValid,
          })}
        >
          {isValid ? (
            <div className="flex flex-row items-center gap-1">
              <CheckLine /> {T(validMessages[type])}
            </div>
          ) : (
            <>
              <ErrorWarningLine className="mr-1 text-orange-500" />
              {T(invalidMessages[type], { count: networks.length, networks: networks.join(", ") })}
            </>
          )}
        </div>
      </Tag>
    </Box>
  );
}

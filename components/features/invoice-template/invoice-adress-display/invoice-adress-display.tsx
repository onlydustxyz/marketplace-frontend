import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoiceTemplate } from "components/features/invoice-template/invoice-template.types";

export function InvoiceAddressDisplay({ name, address, justifyEnd }: TInvoiceTemplate.AddressInfoProps) {
  const [streetAddress, ...restAdress] = address.split(/,(.+)/);
  const paragraphStyles = {
    ...styles["paragraph"],
    ...(justifyEnd && styles["justifyContentEnd"]),
  };

  return (
    <div style={styles["flexRow"]}>
      <p style={paragraphStyles}>{name}</p>
      <p style={paragraphStyles}>{streetAddress}</p>
      <p style={paragraphStyles}>{restAdress.join("").trim()}</p>
    </div>
  );
}

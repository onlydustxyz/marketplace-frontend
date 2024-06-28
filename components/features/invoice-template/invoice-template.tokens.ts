export const InvoiceTokens = {
  header: {
    sampleTitle: "Your invoice number",
    receiptTitle: "Receipt NO:",
    invoiceTitle: "Invoice NO:",
  },
  invoiceInfos: {
    wagmiName: "Wagmi",
    wagmiAddress: "54 Rue Du Faubourg Montmartre, Paris, France, 75009",
    wagmiRegistrationNumber: "908 233 638",
    wagmiEuVATNumber: "FR26908233638",
    companyName: "Company Name",
    individualName: "Name",
    billedTo: "Billed to",
    siren: "SIREN",
    vatNumber: "VAT Number",
    issueDate: "Issue Date",
    dueDate: "Due Date",
    destinationAccounts: "Destination Accounts",
    accountNumber: "Account number",
    bic: "BIC",
  },
  rewardSummary: {
    title: "Rewards granted on: app.onlydust.com",
    table: {
      id: "ID",
      rewardDate: "Reward date",
      project: "Project",
      amount: "Amount",
      equivalent: "USD amount",
      totalBeforeTax: "Total Before Tax",
      totalTax: "Total Tax",
      totalVat: "Total VAT",
      rate: "Rate",
      totalAfterTax: "Total After Tax",
      totalReceipt: "Total",
    },
    specialMentions: "Special Mentions",
    itemsReceived: "received and accepted as payment for this invoice",
    includingVat: " (including 20% VAT) ",
    usdToEurConversionRate: (rate: string | undefined) => `1 USD = ${rate ?? "N/A"} EUR at today's rate`,
    tokenRate: {
      title: "*How is the Token Rate For Each Reward Calculated?",
      descriptionIntro:
        "In your invoice, the token’s exchange rate is based on the market rate on the day the project lead sent the reward.",
      descriptionOutro:
        "You received tokens as a reward for your contributions. Legal and accounting regulations require us to record the token value based on the rate on the day the rewards were sent, not the day the invoice was generated.",
    },
  },
  currencies: {
    usd: "USD",
  },
  vatRegulationStates: {
    vatApplicable: "VAT Applicable",
    vatNotApplicableNonUE: "VAT not applicable – Art. 259-1 of the General Tax Code",
    vatNotApplicableFrenchNotSubject: "VAT not applicable, article 293 B of the General Tax Code",
    vatReverseCharge: "Reverse charge of VAT",
  },
  footer: {
    title: "Important Notes",
    issuedBy: (name: string) => `Invoice issued by Wagmi on behalf and for the account of ${name}, Self-billing`,
    penalities:
      "Late payment penalties: three times the annual legal interest rate in effect calculated from the due date until full payment. Lump sum compensation for recovery costs in the event of late payment: 40 USD",
  },
};

import { gql } from "@apollo/client/core";

export const MARK_INVOICE_AS_RECEIVED = gql(`
mutation markInvoiceAsReceived($paymentReferences:[PaymentReference!]!) {
    markInvoiceAsReceived(paymentReferences: $paymentReferences)
}
`);

export const REJECT_INVOICE = gql(`
mutation rejectInvoice($paymentReferences:[PaymentReference!]!) {
    rejectInvoice(paymentReferences: $paymentReferences)
}
`);

export const ADD_ETH_PAYMENT_RECEIPT = gql(`
mutation addEthPaymentReceipt($projectId:Uuid!, $paymentId:Uuid!, $amount:String!, $currencyCode:String!, $recipientIdentity:EthereumIdentityInput!, $transactionHash:String!) {
    addEthPaymentReceipt(projectId: $projectId, paymentId: $paymentId, amount: $amount, currencyCode: $currencyCode, recipientIdentity: $recipientIdentity, transactionHash: $transactionHash)
}
`);

export const ADD_FIAT_PAYMENT_RECEIPT = gql(`
mutation addFiatPaymentReceipt($projectId:Uuid!, $paymentId:Uuid!, $amount:String!, $currencyCode:String!, $recipientIban:Iban!, $transactionReference:String!) {
    addFiatPaymentReceipt(projectId: $projectId, paymentId: $paymentId, amount: $amount, currencyCode: $currencyCode, recipientIban: $recipientIban, transactionReference: $transactionReference)
}
`);

export const GET_PAYMENT_REQUEST = gql(`
query paymentRequestsByPk($paymentId:uuid!) {
    paymentRequestsByPk(id: $paymentId) {
        id
    }
}
`);

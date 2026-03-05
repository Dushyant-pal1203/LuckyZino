/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 18/12/2025 22:01
 */

export type ApplePayHeader = {
  ephemeralPublicKey: string;
  publicKeyHash: string;
  transactionId: string;
};

export type ApplePayPaymentData = {
  version: string;   // e.g. "EC_v1"
  data: string;
  signature: string;
  header: ApplePayHeader;
};

export type ApplePayValidateMerchantRequest = {
  validationURL?: string;
};

export type ApplePayAuthorizedRequest = {
  invoiceId: string,
  paymentData: ApplePayPaymentData;
};

export type ApplePayAuthorizedResponse = {
  status: 'success' | 'error';
  message?: string;
};

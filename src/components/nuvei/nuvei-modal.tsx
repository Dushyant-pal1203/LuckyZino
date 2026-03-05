/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, FC, useCallback } from 'react';
import Modal from '../ui/modal';
import './index.css';
import { PaymentEvents, ProviderNames } from '@/enum/payments';
import {
  PaymentConfiguration,
  PaymentCreate,
  PaymentEvent,
  PaymentStatus
} from '@/types/payments';

const NuveiModal: FC = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = useCallback(
    (paymentProvider: string | null) => {
      if (sessionId) {
        window.postMessage(
          {
            name: PaymentEvents.PaymentCancelIframe,
            data: {
              status: 'cancel',
              id: sessionId,
              provider: paymentProvider
            }
          },
          '*'
        );
      }
      setPaymentUrl(null);
      setModalOpen(false);
    },
    [sessionId]
  );

  const onFailed = useCallback(
    (paymentProvider: string | null, status: string) => {
      if (sessionId) {
        window.postMessage(
          {
            name: PaymentEvents.PaymentFailedIframe,
            data: {
              status,
              id: sessionId,
              provider: paymentProvider
            }
          },
          '*'
        );
      }
    },
    [sessionId]
  );

  const handleMessage = useCallback(
    (message: MessageEvent) => {
      let eventData = message.data;
      if (eventData && typeof eventData === 'string') {
        try {
          eventData = JSON.parse(eventData);
        } catch {
          return;
        }
      }

      const paymentData: PaymentEvent = eventData;
      const type = paymentData?.name;
      if (type === PaymentEvents.PaymentStatus) {
        const data = paymentData.data as PaymentStatus;
        if (data.status === 'success') {
          setPaymentUrl(null);
          setModalOpen(false);
          return;
        }
        // Handle all non-success cases from here
        if (data.status !== 'cancel') {
          onFailed(data.provider, data.status);
        }

        onClose(data.provider);
      }

      if (type === PaymentEvents.PaymentCreate) {
        const data = paymentData.data as PaymentCreate;
        const config = JSON.parse(data.configuration) as PaymentConfiguration;
        const {
          provider: newProvider,
          data: { url, orderId, description, price }
        } = config;

        setProvider(newProvider);
        setSessionId(data.sessionId);

        if (url) {
          if (newProvider === ProviderNames.NUVEI) {
            setPaymentUrl(url);
          }
          if (newProvider === ProviderNames.WORLDPAY) {
						const paymentData = { url: decodeURIComponent(url), orderId, description, price };
            setPaymentUrl(
              `/world-pay/index.html?paymentData=${btoa(
                JSON.stringify(paymentData)
              )}`
            );
          }
          setModalOpen(true);
        }
      }
    },
    [onClose, sessionId, provider]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  return (
    <Modal isOpen={modalOpen} onClose={() => onClose(provider)}>
      {paymentUrl && (
        <iframe
          allow="payment *"
          className={`iframe-nouvey`}
          src={paymentUrl}
          title="safecharge"
        />
      )}
    </Modal>
  );
};

export default NuveiModal;

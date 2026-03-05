/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, FC } from 'react';
import Modal from '../ui/modal';
import { FormContainer } from '../ui/auth/form-container';
import ReCAPTCHA from 'react-google-recaptcha';

const captchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY || "6LdBjHcrAAAAAI7q77PdNDdyq2LRBynY8t2TdyBb";

const AMOEModal: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleMassage = (message: MessageEvent) => {
    const { name } = message.data;

    if (name === 'amoe.open_captcha_verification') {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMassage);
    return () => {
      window.removeEventListener('message', handleMassage);
    };
  }, []);

  const onClose = () => {
    setModalOpen(false);
  };

  const onRecaptchaChange = (value: string | null) => {
    window.postMessage(
      {
        name: 'amoe.captcha_verification_result',
        data: {
          token: value
        }
      },
      '*'
    );
    if (value) {
      setTimeout(() => setModalOpen(false), 3000);
    }
  };

  return (
    <Modal
      contentClass="!max-w-[20rem] !max-h-[15rem] !bg-transparent"
			btnClass="!text-[#fffbfb] !bg-[#ec67fe4d]"
      isOpen={modalOpen}
      onClose={onClose}
    >
      <FormContainer className="relative">
        <div className="w-full relative">
          <h1
            style={{
              textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
              lineHeight: '88%',
              letterSpacing: '1.12px'
            }}
            className="text-center font-extrabold text-md text-center uppercase text-md font-['Exo_2'] mt-2"
          >
            Click to verify
          </h1>
          <div className="relative flex justify-center mt-8 ml-1">
            {captchaKey ? (
              <ReCAPTCHA sitekey={captchaKey} onChange={onRecaptchaChange} />
            ) : null}
          </div>
        </div>
      </FormContainer>
    </Modal>
  );
};

export default AMOEModal;

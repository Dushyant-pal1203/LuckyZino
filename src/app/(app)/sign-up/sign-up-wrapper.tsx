'use client';

import { useState } from 'react';
import SignUpClient from './sign-up-client';

export default function SignUpWrapper() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <SignUpClient
      ignoreRedirect={isRegistered}
      setParentIsRegistered={setIsRegistered}
    />
  );
}

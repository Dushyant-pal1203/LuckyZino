import { useState } from 'react';
import { SocureDocVSDKEvent } from '@/types/kyc';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import {
  SOCURE_DOCV_CONSENT_DECLINED,
  SOCURE_DOCV_DOCUMENTS_UPLOAD_FAILED,
  SOCURE_DOCV_FAILED,
  SOCURE_DOCV_TOKEN_EXPIRED
} from '@/lib/kyc-utils';

interface DocVErrorDialogProps {
  errorData: SocureDocVSDKEvent;
  onRetry: () => void;
}

export const DocVErrorDialog = ({ errorData, onRetry }: DocVErrorDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getUserFriendlyMessage = () => {
    switch (errorData.status) {
      case 'CONSENT_DECLINED':
        return SOCURE_DOCV_CONSENT_DECLINED;
      case 'DOCUMENTS_UPLOAD_FAILED':
        return SOCURE_DOCV_DOCUMENTS_UPLOAD_FAILED;
      case 'TOKEN_EXPIRED':
        return SOCURE_DOCV_TOKEN_EXPIRED;
      default:
        return SOCURE_DOCV_FAILED;
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setErrorMessage('');

    onRetry();
  };

  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <AlertTriangle className="text-red-600 w-6 h-6" />
        <h3 className="text-lg font-semibold text-red-800">Verification Error</h3>
      </div>

      <p className="text-sm text-red-700 leading-relaxed">
        {getUserFriendlyMessage()}
      </p>

      {errorMessage && (
        <p className="text-sm text-red-600 font-medium bg-red-100 px-3 py-2 rounded-md">
          {errorMessage}
        </p>
      )}

      <div className="flex justify-end">
        <Button onClick={handleRetry} disabled={loading} variant="destructive">
          {loading ? 'Retrying...' : 'Try Again'}
        </Button>
      </div>
    </div>
  );
};

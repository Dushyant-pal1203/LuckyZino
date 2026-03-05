import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useJsApiLoader } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';
import {
  ComplianceDepositDto,
  ComplianceOnboardingDto,
  ComplianceWithdrawalDto,
  getKycSchemaAndDefaultValue
} from '@/schemas/kyc';
import 'react-phone-input-2/lib/style.css';
import * as RadixForm from '@radix-ui/react-form';
import LatLngLiteral = google.maps.LatLngLiteral;
import { KycWizard } from '@/components/kyc-wizard';
import { KycTier, KycUserProfile } from '@/types/kyc';

const libraries = ['places'] as Library[];

interface KycFormProps {
  tier: KycTier,
  handleSubmit: (data: any) => void;
  userKycProfile?: KycUserProfile | null;
}

export const KycForm = ({ tier, handleSubmit, userKycProfile }: KycFormProps) => {
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  });

  const [schema, defaultValues] = getKycSchemaAndDefaultValue(tier, userKycProfile);

  const methods = useForm<ComplianceOnboardingDto | ComplianceDepositDto | ComplianceWithdrawalDto>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
    shouldUnregister: false
  });

  return (
    <FormProvider {...methods}>
      <RadixForm.Root onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        <KycWizard
          isLoaded={isLoaded}
          tier={tier}
          setPosition={setPosition}
          position={position}
        />
      </RadixForm.Root>
    </FormProvider>
  );
};

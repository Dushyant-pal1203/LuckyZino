import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/ui/form-field';
import { FormPhoneField } from '@/components/ui/form-phone-field';
import { FormAddressAutocomplete } from '@/components/ui/form-address-autocomplete';
import { FormDateOfBirth } from '@/components/ui/form-dob-field';
import { KycTier } from '@/types/kyc';
import { FormContainer } from './ui/auth/form-container';
import { AuthButton } from './ui/auth/auth-button';
import { CheckIcon } from 'lucide-react';
import clsx from 'clsx';
import { BonusPanel } from './ui/auth/bonus-panel';
import { capitalizeFirstLetter } from '@/lib/utils';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';

interface KycWizardProps {
  isLoaded: boolean;
  tier: KycTier;
  setPosition: any;
  position: any;
}

export const KycWizard = ({
  isLoaded,
  tier,
  setPosition,
  position
}: KycWizardProps) => {
  if (position) {
    console.log(position);
  }
  const [step, setStep] = useState(tier === 'onboarding' ? 1 : 2);
  const hasSsnStep = tier === 'withdrawal';
  const {
    trigger,
    formState: { isValid }
  } = useFormContext();

  const [isChecked, setIsChecked] = useState(false);

  const goNext = async () => {
    const isValid = await trigger(['address']);

    if (isValid) {
      const nextStep = step + 1;
      setStep(nextStep);
    }
  };
  const goBack = () => {
    const prevStep = step - 1;
    setStep(prevStep);
  };

  const toInputUppercase = (e: any) => {
    (e.target as HTMLInputElement).value = (
      '' + (e.target as HTMLInputElement).value
    ).toUpperCase();
  };

  const toInputCapitalize = (e: any) => {
    (e.target as HTMLInputElement).value =
      '' + capitalizeFirstLetter((e.target as HTMLInputElement).value);
  };

  return (
    <div className="min-w-[22rem] max-w-6xl mx-auto space-y-6">
      {step === 1 && (
        <div className="grid gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="max-w-[27rem] m-auto z-[1] flex flex-col justify-end min-h-[250px]">
              <BonusPanel variant="kyc" className="flow-root" />
            </div>
            <FormContainer className="z-[20]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  name="firstName"
                  label="First Name"
                  type="text"
                  onInput={toInputCapitalize}
                  placeholder="Enter your first name"
                />
                <FormField
                  name="lastName"
                  label="Last Name"
                  type="text"
                  onInput={toInputCapitalize}
                  placeholder="Enter your last name"
                />
                <FormDateOfBirth name="dob" />
                <FormPhoneField name="phoneNumber" />
              </div>
              <div className="flex justify-center w-full min-w-8 mt-4">
                <AuthButton type="submit">Submit</AuthButton>
              </div>
            </FormContainer>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid mt-4">
          <div className="lg:col-span-2">
            {isLoaded && <FormAddressAutocomplete setPosition={setPosition} />}
            <FormContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  name="address.line1"
                  label="Street Address"
                  type="text"
                  placeholder="Street Address"
                />
                <FormField
                  name="address.line2"
                  label="Apt/Suite"
                  type="text"
                  placeholder="Apt. 3C"
                />
                <FormField
                  name="address.locality"
                  label="City"
                  type="text"
                  onInput={toInputCapitalize}
                  placeholder="City"
                />
                <FormField
                  name="address.majorAdminDivision"
                  label="State / Province"
                  type="text"
                  onInput={toInputUppercase}
                  placeholder="NJ"
                />
                <FormField
                  name="address.postalCode"
                  label="Postal Code"
                  type="text"
                  placeholder="07307"
                />
                <FormField
                  name="address.country"
                  label="Country (2-letter code)"
                  type="text"
                  onInput={toInputUppercase}
                  placeholder="US"
                />
              </div>
              <div className="flex justify-center w-full min-w-8 mt-4">
                {hasSsnStep ? (
                  <AuthButton
                    name="next"
                    featureName="kyc.address"
                    type="button"
                    onClick={goNext}
                  >
                    Next
                  </AuthButton>
                ) : (
                  <AuthButton
                    name="submit"
                    featureName="kyc.address"
                    type="submit"
                    disabled={!isValid}
                  >
                    Submit
                  </AuthButton>
                )}
              </div>
            </FormContainer>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid mt-4">
          <div className="lg:col-span-2">
            <FormContainer>
              <FormField
                name="firstName"
                label="First Name"
                type="text"
                onInput={toInputCapitalize}
                placeholder="Enter your first name"
              />
              <FormField
                name="lastName"
                label="Last Name"
                type="text"
                onInput={toInputCapitalize}
                placeholder="Enter your last name"
              />
              <FormDateOfBirth name="dob" />
              <FormField
                name="ssn"
                label="Social Security Number"
                type="text"
                placeholder="Enter Your Social Security Number"
              />
              <div className="relative flex items-flex-start gap-2 my-2">
                <input
                  id="ssn-agreement"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    if (isChecked) {
                      sendBIEvent(TrackerEvents.CheckboxAccept, {
                        legal: { name: 'ssn', version: '1.0' }
                      });
                    }
                  }}
                  className={clsx(
                    'w-6 h-6 mt-[4px] z-10 rounded border-2 appearance-none flex items-center justify-center',
                    isChecked
                      ? 'bg-green-500 border-green-500'
                      : 'bg-transparent border-gray-400'
                  )}
                />
                {isChecked && (
                  <CheckIcon
                    className="w-4 h-4 text-white absolute pointer-events-none"
                    style={{ top: '8px', left: '4px', zIndex: 11 }}
                  />
                )}
                <label
                  htmlFor="ssn-agreement"
                  className="text-sm text-gray-200 max-w-[279px]"
                >
                  I confirm that I am providing my Social Security Number (SSN)
                  for identity verification and for the purpose of complying
                  with applicable U.S. tax reporting requirements. I consent to
                  the collection, processing, storage, and electronic
                  transmission of my information to authorized agents and
                  governmental institutions as required by applicable law.
                </label>
              </div>
              <AuthButton
                name="back"
                featureName="kyc.birthday_name_ssn"
                type="button"
                variant="secondary"
                onClick={goBack}
              >
                Back
              </AuthButton>
              <AuthButton
                name="submit"
                featureName="kyc.birthday_name_ssn"
                type="submit"
                disabled={!isChecked || !isValid}
              >
                Submit
              </AuthButton>
            </FormContainer>
          </div>
        </div>
      )}
    </div>
  );
};

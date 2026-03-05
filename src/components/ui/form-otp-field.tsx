import { Controller, useFormContext } from 'react-hook-form';
import OTPInput from 'react-otp-input';
import { FormGroup } from '@/components/ui/form-group';

interface FormOtpFieldProps {
  name: string;
  label?: string;
  numInputs?: number;
  isMobile: boolean;
}

export const FormOtpField = ({
                               name,
                               label,
                               numInputs = 6,
                               isMobile
                             }: FormOtpFieldProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const gap = isMobile ? 'px-1' : 'px-2';
  const inputsHeight = isMobile ? '!h-10' : '!h-12';
  const inputsWidth = isMobile ? '!w-10' : '!w-12';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormGroup
            label={label || ''}
            error={errors?.[name]?.message}
            iconPosition="inline"
            isValid={field.value?.length === numInputs && !errors?.[name]}
						value={field.value}
          >
            <OTPInput
              value={field.value || ''}
              onChange={(val) => field.onChange(val)}
              numInputs={numInputs}
              inputType="tel"
              renderSeparator={<span className={gap}>&nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  inputMode="numeric"
                  className={`!bg-[#3B2863] !text-white ${inputsHeight} ${inputsWidth} text-center text-3xl
                 !rounded-[14px] !border !border-[#63508B]
                 focus:!outline-none focus:!border-[#8B5CF6]
                 font-bold tracking-widest`}
                />
              )}
            />
          </FormGroup>
        );
      }}
    />
  );
};

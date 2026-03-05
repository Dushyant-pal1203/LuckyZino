import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormGroup } from '@/components/ui/form-group';

interface FormPhoneFieldProps {
  name: string;
  allowedCountries?: string[];
  disableDropDown?: boolean;
}

export const FormPhoneField = ({name, allowedCountries, disableDropDown}: FormPhoneFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormGroup
          label="Phone Number"
          error={errors?.[name]?.message}
          isValid={!!field.value && !errors?.[name]}
					value={field.value}
        >
          <PhoneInput
            disableDropdown={disableDropDown}
            onlyCountries={allowedCountries}
            country="us"
            value={field.value}
						// placeholder='(XXX) XXX-XXXX'
            onChange={field.onChange}
            inputStyle={{ width: '100%', padding: "0 2rem" }}
            onBlur={field.onBlur}
						inputClass="!bg-[#3B2863] !text-white !h-auto !px-8 !pl-[48px] !py-2 !border !rounded-[14px] !border-[#63508B] focus:outline-none"
						dropdownClass="!bg-[#3B2863] !text-white !border-0 [&_.country.highlight]:!bg-[#6360b6] hover:[&_.country]:!bg-[#6360b6]  [&_.dial-code]:!text-gray-300"
						buttonClass="!bg-[#3B2863] [&_div]:!bg-[#3B2863] [&.selected-flag]:!border-0 !z-10 !border-[#63508B] !pl-1 !border-r-0 !rounded-[10px_0_0_10px] [&_div]:!border-t-white"
          />
        </FormGroup>
      )}
    />
  );
};

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup } from '@/components/ui/form-group';
import { DateTime } from "luxon";

interface FormDateOfBirthProps {
  name: string;
}

export const FormDateOfBirth = ({name}: FormDateOfBirthProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, 0, 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormGroup
          label="Date of Birth"
          error={errors?.[name]?.message}
          isValid={!!field.value && !errors?.[name]}
					value={field.value}
        >
          <DatePicker
            selected={field.value ? DateTime.fromISO(field.value.toString()).toJSDate() : null}
            onChange={(date) => field.onChange(date ? DateTime.fromJSDate(date).toISODate()?.split('T')[0]: null)}
            dateFormat="yyyy-MM-dd"
            maxDate={maxDate}
            minDate={minDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className={`w-full px-8 pl-2 pr-12 py-2 text-white border bg-[#3B2863] rounded-[14px] ${errors?.[name] ? "border-red-500 focus:ring-red-500" : "border-[#63508B]"} focus:outline-none`}
            placeholderText="YYYY-MM-DD"
          />
        </FormGroup>
      )}
    />
  );
};

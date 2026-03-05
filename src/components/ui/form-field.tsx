import { useFormContext, Controller } from 'react-hook-form';
import * as RadixForm from '@radix-ui/react-form';
import { FormGroup } from '@/components/ui/form-group';
import { clsx } from 'clsx';
import { useState } from 'react';
import { FormEventHandler } from 'react';

type FormFieldProps = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  showRequirements?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
};

export const FormField = ({
  name,
  label,
  type,
  placeholder,
  ref,
  onInput,
  showRequirements
}: FormFieldProps) => {
  const {
    control,
    formState: { errors },
    trigger
  } = useFormContext();

  const [variableType, setVariableType] = useState(type);
  const onChangeType = () => {
    setVariableType(variableType === 'password' ? 'text' : 'password');
  };

  const fieldError = name
    .split('.')
    .reduce((acc: any, key: string) => acc?.[key], errors as any);

  return (
    <RadixForm.Field className="grid" name={name}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadixForm.Control asChild>
            <FormGroup
              label={label}
              error={fieldError?.message}
              value={field.value}
              isValid={Boolean(field.value)}
              variableType={variableType}
              type={type}
              onChangeType={() => onChangeType()}
              showRequirements={showRequirements}
              iconPosition="absolute"
            >
              <input
                {...field}
                ref={ref}
                type={variableType}
                placeholder={placeholder}
								//Do not remove, this needed for password validation
								//--------------------------
								onChange={(e) => {
									field.onChange(e);
									if(field.name === 'password') {
										trigger('confirmPassword');
									}
									if(field.name === 'confirmPassword') {
										trigger('password');
									}
								}}
                onInput={(e) => {
                  if(typeof onInput === 'function') {
										onInput(e);
									}
									if(field.name === 'password') {
										trigger('confirmPassword');
									}
									if(field.name === 'confirmPassword') {
										trigger('password');
									}
                }}
								//--------------------------
                className={clsx(
                  'w-full px-8 pl-2 py-2 text-white border bg-[#3B2863] rounded-[14px] focus:outline-none',
                  fieldError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#63508B] focus:ring-blue-500'
                )}
              />
            </FormGroup>
          </RadixForm.Control>
        )}
      />
    </RadixForm.Field>
  );
};

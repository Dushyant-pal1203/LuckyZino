import { CheckCircle, AlertCircle, EyeIcon, EyeClosed } from 'lucide-react';

type FormGroupProps = {
  label: string;
  error?: string | any;
  type?: string;
  variableType?: string;
  showRequirements?: boolean;
  iconPosition?: 'absolute' | 'inline';
  value: string;
  isValid: boolean;
  children: React.ReactNode;
  onChangeType?: () => void;
};

const PasswordRequirements = ({ value }: { value: string }) => (
  <ul className="flex flex-wrap items-center text-xs w-full list-disc px-4 py-2">
    <li
      className={`grow w-[50%] ${
        value
          ? value.length >= 8 && value.length <= 32
            ? 'text-green-500'
            : 'text-red-500'
          : 'text-gray-300'
      }`}
    >
      8-32 Charecters
    </li>
    <li
      className={`grow w-[50%] ${
        value
          ? value.match(/[0-9]/)
            ? 'text-green-500'
            : 'text-red-500'
          : 'text-gray-300'
      }`}
    >
      One Digit
    </li>
    <li
      className={`grow w-[50%] ${
        value
          ? value.match(/[A-Z]/)
            ? 'text-green-500'
            : 'text-red-500'
          : 'text-gray-300'
      }`}
    >
      Uppercase Letter
    </li>
    <li
      className={`grow w-[50%] ${
        value
          ? value.match(/[^a-zA-Z0-9 ]/)
            ? 'text-green-500'
            : 'text-red-500'
          : 'text-gray-300'
      }`}
    >
      Special Symbol
    </li>
  </ul>
);

export const FormGroup = ({
  label,
  error,
  children,
  isValid,
  value,
  onChangeType,
  type,
  showRequirements,
  iconPosition = 'absolute',
  variableType
}: FormGroupProps) => {
  const icon =
    error && type !== 'password' ? (
      <AlertCircle className="h-5 w-5 text-lzError-500" />
    ) : isValid && type !== 'password' ? (
      <CheckCircle className="h-5 w-5 text-lzSuccess-500" />
    ) : null;
  return (
    <div className="grid relative">
      <label className="block text-sm font-medium text-[#ffffff80] mb-1">
        {label}
      </label>
      <div className="relative">
        {children}
        {icon && iconPosition === 'absolute' && (
          <div className="absolute right-3 top-3">{icon}</div>
        )}
        {variableType === 'password' && (
          <EyeIcon
            onClick={onChangeType}
            className="absolute right-3 top-3 h-5 w-5 text-gray-500"
          />
        )}
        {variableType === 'text' && type === 'password' && (
          <EyeClosed
            onClick={onChangeType}
            className="absolute right-3 top-3 h-5 w-5 text-gray-500"
          />
        )}
      </div>
      {icon && iconPosition === 'inline' ? (
        <div className="flex items-center justify-center gap-1 mt-1">
          {icon}
          <p className="text-xs text-lzError-500">{error || '\u00A0'}</p>
        </div>
      ) : (
        !showRequirements && (
          <p className="text-xs min-h-[1rem] text-lzError-500 mt-1">
            {error || '\u00A0'}
          </p>
        )
      )}
      {type === 'password' && showRequirements && (
        <PasswordRequirements value={value} />
      )}
    </div>
  );
};

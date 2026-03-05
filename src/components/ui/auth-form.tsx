import { FormProvider, FieldValues } from 'react-hook-form';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import AuthFormInner, {
  AuthFormInnerProps
} from '@/components/ui/auth-form-inner';

type AuthFormLayoutProps<T extends FieldValues> = AuthFormInnerProps<T> & {
  title: string;
	className?: string;
};

export const AuthForm = <T extends FieldValues>({
  title,
  methods,
  onSubmit,
  action = 'submit',
  children,
	className = ""
}: AuthFormLayoutProps<T>) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <FormProvider {...methods}>
        <div className={`flex items-center justify-center bg-trasparent h-auto ${className}`}>
          <div
            className="bg-trasparent p-3 w-[22.5rem] md:w-[27rem] h-full md:h-auto"
          >
            {title && <h2 className="text-2xl none font-bold mb-6 text-center">{title}</h2>}
            <AuthFormInner
              methods={methods}
              onSubmit={onSubmit}
              action={action}
            >
              {children}
            </AuthFormInner>
          </div>
        </div>
      </FormProvider>
    </GoogleReCaptchaProvider>
  );
};

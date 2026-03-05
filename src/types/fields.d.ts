import { ControllerProps } from 'react-hook-form';

export type FieldProps<T> = Partial<ControllerProps> & {
  labelProps?: { text: string; description?: string };
  componentProps?: T;
  name: string;
  orientation?: 'vertical' | 'horizontal';
  description?: string;
  className?: string;
};

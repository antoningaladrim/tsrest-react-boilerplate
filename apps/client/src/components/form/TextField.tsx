import { InputHTMLAttributes } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Input } from '../ui/input';
import { InputProps } from './InputProps';

export interface TextFieldProps<T extends FieldValues> extends InputProps<T> {
  label: string;
  className?: string;
  placeholder?: string;
  description?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
}

export const TextField = <Schema extends FieldValues>({
  label,
  className,
  placeholder,
  disabled = false,
  type = 'text',
  ...props
}: TextFieldProps<Schema>) => (
  <Controller
    {...props}
    render={({ field, fieldState: { error } }) => (
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-400">{label}</p>
        <Input {...field} type={type} placeholder={placeholder} />
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    )}
  />
);

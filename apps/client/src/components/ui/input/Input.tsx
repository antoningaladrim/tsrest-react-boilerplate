import { cn } from '@/utils/cn';
import { InputHTMLAttributes } from 'react';

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn('bg-gray-50 rounded-md px-4 py-2', className)}
    {...props}
  />
);

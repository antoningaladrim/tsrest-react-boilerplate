import { cn } from '@/utils/cn';

export const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn('bg-gray-50 rounded-md px-4 py-2', className)}
    {...props}
  />
);

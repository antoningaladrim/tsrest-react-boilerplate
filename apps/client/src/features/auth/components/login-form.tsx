import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/lib/auth';
import { cn } from '@/utils/cn';
import { LoginPayload } from '@tsrest-react-boilerplate/api';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });

  const { control, handleSubmit } = useForm<LoginPayload>();

  const onSubmit = (data: LoginPayload) => {
    login.mutate(data);
  };

  return (
    <div className={cn('flex flex-col gap-2')}>
      <div className={cn('flex flex-col gap-2')}>
        <p className={cn('text-sm text-gray-500')}>Username</p>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input type="test" onChange={field.onChange} />
          )}
        />
      </div>
      <div className={cn('flex flex-col gap-2')}>
        <p className={cn('text-sm text-gray-500')}>Password</p>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input type="password" onChange={field.onChange} />
          )}
        />
      </div>
      <Link to="/">Do not have an account?</Link>
      <Button onClick={handleSubmit(onSubmit)}>Log in</Button>
    </div>
  );
};

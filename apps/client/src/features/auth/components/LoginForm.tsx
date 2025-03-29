import { TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useSignIn } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { LoginPayload, zLoginPayload } from '../types';

export const LoginForm = ({ redirectTo }: { redirectTo: string | null }) => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { control, handleSubmit, setError } = useForm<LoginPayload>({
    resolver: zodResolver(zLoginPayload),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginPayload) => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: data.username,
        password: data.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        return await navigate(redirectTo ? redirectTo : paths.chat.getHref(), {
          replace: true,
        });
      }
      setError('root', {
        message: 'Une erreur est survenue lors de la connexion',
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-1 bg-transparent"
    >
      <TextField label="Username" name="username" control={control} />
      <TextField
        label="Password"
        name="password"
        control={control}
        type="password"
      />
      <Link to="/">Do not have an account?</Link>
      <Button type="submit">Log in</Button>
    </form>
  );
};

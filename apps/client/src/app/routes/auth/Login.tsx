import { useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { LoginForm } from '@/features/auth/components/LoginForm';

const LoginRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Log in to your account">
      <LoginForm redirectTo={redirectTo} />
    </AuthLayout>
  );
};

export default LoginRoute;

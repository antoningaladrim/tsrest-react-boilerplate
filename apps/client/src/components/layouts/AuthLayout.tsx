import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
import { useAuth } from '@clerk/clerk-react';
import { GridBackground } from '../ui/grid-background';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  subTitle: string;
};

export const AuthLayout = ({ children, title, subTitle }: LayoutProps) => {
  const { isSignedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate(redirectTo ? redirectTo : paths.chatLayout.getHref(), {
        replace: true,
      });
    }
  }, [isSignedIn, navigate, redirectTo]);

  return (
    <GridBackground>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center z-10 gap-4">
        <div className="flex flex-col gap-2 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl text-gray-50 font-extrabold">
            {title}
          </h2>
          <p className="text-gray-300">{subTitle}</p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </GridBackground>
  );
};

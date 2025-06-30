export const dynamic = 'force-dynamic';

import LoginClient from './LoginClient';

type Props = {
  searchParams: { from?: string };
};

export default function LoginPage({ searchParams }: Props) {
  const redirectTo = searchParams.from ?? '/';
  return <LoginClient redirectTo={redirectTo} />;
}

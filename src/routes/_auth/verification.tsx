import useSession from '@/hooks/useSession';
import VerificationPage from '@/pages/auth/Verification'
import VerifyingAuth from '@/Reusables/VerifyingAuth';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_auth/verification')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isFetching, loading } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (!user || user.emailVerified) {
      // Get the redirect parameter from the route or default to login
      const redirect = router.latestLocation.search?.redirect || '/login';
      router.navigate({ to: redirect });
    }
  }, [user, router]);
  
  if (!user || user.emailVerified) {
    return null; // Return null while redirecting
  }

    if (loading || isFetching || user) {
      return <VerifyingAuth />;
    }
  
  return <VerificationPage />
}

import { notFound } from 'next/navigation';
import InstitutionView from './institution-view';
import { institutions as defaultInstitutions } from '@/lib/data';

// This function needs to exist for static generation, but we will rely on client-side fetching.
// So we can return an empty array.
export async function generateStaticParams() {
   return defaultInstitutions.map((institution) => ({
    id: institution.id,
  }));
}

// Re-export this function with a different name to avoid conflict
export { generateStaticParams as unstable_generateStaticParams };

export default function InstitutionPage({ params }: { params: { id: string } }) {
  // The actual finding of the institution will be done on the client
  // in InstitutionView, which will use the useInstitutions hook.
  // We pass the ID to the client component.
  const institution = defaultInstitutions.find((inst) => inst.id === params.id);
  if (!institution) {
    // This check is a fallback for initial build time.
    // Client-side will handle dynamic additions.
  }
  return <InstitutionView institutionId={params.id} />;
}

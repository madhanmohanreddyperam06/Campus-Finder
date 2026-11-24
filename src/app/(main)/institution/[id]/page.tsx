
import InstitutionView from './institution-view';
import { institutions as defaultInstitutions } from '@/lib/data';

// This function needs to exist for static generation
export async function generateStaticParams() {
   return defaultInstitutions.map((institution) => ({
    id: institution.id,
  }));
}

export default async function InstitutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InstitutionView institutionId={id} />;
}

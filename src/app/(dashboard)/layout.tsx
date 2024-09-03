import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Toaster />
      <div className='overflow-hidden'>
        {children}
      </div>
    </Providers>
  );
}

import HeaderAdmin from '@/components/layout/HeaderAdmin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderAdmin />
      {children}
    </div>
  );
}
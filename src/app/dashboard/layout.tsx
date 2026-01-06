

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>Dashboard Menu</nav> {/* Dette er layoutets menu */}
      <section>{children}</section> {/* Her indsættes indhold fra undersider */}
    </div>
  );
}
/* Layout for dashboard-mappen */
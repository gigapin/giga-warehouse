import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <AppSidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--wms-bg)' }}>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </div>
        </div>
    );
}

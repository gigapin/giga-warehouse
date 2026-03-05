import { ThemeProvider } from '@/components/theme-provider';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="p-4">{children}</div>
        </AppLayoutTemplate>
    </ThemeProvider>
);

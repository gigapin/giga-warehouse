import { Link, usePage } from '@inertiajs/react';
import { Box, ClipboardList, LayoutGrid, Settings, Tag, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import { dashboard } from '@/routes';
import { index as categoriesIndex } from '@/routes/categories';
import { index as itemsIndex } from '@/routes/items';
import { index as ordersIndex } from '@/routes/orders';
import { index as suppliersIndex } from '@/routes/suppliers';

type NavItem = {
    id: string;
    label: string;
    href: string;
    icon: ComponentType<{ size?: number }>;
};

type NavGroup = {
    label: string;
    items: NavItem[];
};

const navGroups: NavGroup[] = [
    {
        label: 'Operations',
        items: [
            { id: 'dashboard', label: 'Dashboard', href: dashboard().url, icon: LayoutGrid },
            { id: 'items', label: 'Items', href: itemsIndex().url, icon: Box },
            { id: 'orders', label: 'Orders', href: ordersIndex().url, icon: ClipboardList },
        ],
    },
    {
        label: 'Catalog',
        items: [
            { id: 'categories', label: 'Categories', href: categoriesIndex().url, icon: Tag },
            { id: 'suppliers', label: 'Suppliers', href: suppliersIndex().url, icon: Users },
        ],
    },
    {
        label: 'System',
        items: [
            { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
        ],
    },
];

export function AppSidebar() {
    const { url } = usePage();

    const isActive = (href: string) => {
        if (href === dashboard().url) return url === href || url === '/dashboard';
        return url.startsWith(href);
    };

    return (
        <aside style={{
            width: 260,
            flexShrink: 0,
            background: '#1a1b1d',
            color: '#c9c9cb',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #000',
            height: '100vh',
            position: 'sticky',
            top: 0,
        }}>
            {/* Brand */}
            <div style={{
                padding: '20px 22px 22px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
            }}>
                <div style={{
                    width: 36,
                    height: 36,
                    background: '#000',
                    borderRadius: 6,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M3 7.5 12 3l9 4.5v9L12 21 3 16.5v-9Z" stroke="#fff" strokeWidth="1.6" />
                        <path d="M3 7.5 12 12l9-4.5M12 12v9" stroke="#fff" strokeWidth="1.6" />
                    </svg>
                </div>
                <div>
                    <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.14em', color: '#fff' }}>
                        STOCKYARD
                    </div>
                    <div style={{ fontSize: 11, color: '#7a7b7e', fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
                        WMS · v2.4
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ padding: '14px 12px', flex: 1, overflowY: 'auto' }}>
                {navGroups.map((group) => (
                    <div key={group.label} style={{ marginBottom: 18 }}>
                        <div style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: '0.16em',
                            color: '#7a7b7e',
                            padding: '6px 12px 8px',
                            textTransform: 'uppercase',
                        }}>
                            {group.label}
                        </div>
                        {group.items.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="sidebar-nav-item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '9px 12px',
                                        borderRadius: 6,
                                        color: active ? '#fff' : '#c9c9cb',
                                        fontSize: 13.5,
                                        fontWeight: 500,
                                        position: 'relative',
                                        marginBottom: 1,
                                        background: active ? '#2a2b2e' : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'background 0.12s',
                                    }}
                                >
                                    {active && (
                                        <span style={{
                                            position: 'absolute',
                                            left: -12,
                                            top: 8,
                                            bottom: 8,
                                            width: 3,
                                            background: '#c97a2b',
                                            borderRadius: '0 2px 2px 0',
                                        }} />
                                    )}
                                    <item.icon size={18} />
                                    <span style={{ flex: 1 }}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Footer warehouse card */}
            <div style={{
                padding: '14px 16px 18px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
                <div style={{
                    background: '#0f1011',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 6,
                    padding: '12px 14px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <span style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: '#5fae6e',
                            boxShadow: '0 0 0 3px rgba(95,174,110,0.18)',
                            display: 'inline-block',
                            flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 12, color: '#e5e5e6', fontWeight: 600 }}>
                            Warehouse 03 · Rotterdam
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 11,
                        color: '#7a7b7e',
                        marginBottom: 6,
                    }}>
                        <span>Capacity</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>78%</span>
                    </div>
                    <div style={{ height: 4, background: '#2a2b2e', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#c97a2b', width: '78%' }} />
                    </div>
                </div>
            </div>
        </aside>
    );
}

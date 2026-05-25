import { router, usePage } from '@inertiajs/react';
import { Bell, ChevronDown, HelpCircle, LogOut, PackageOpen, Search, Settings, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { useInitials } from '@/hooks/use-initials';
import type { BreadcrumbItem } from '@/types';

type Props = { breadcrumbs?: BreadcrumbItem[] };

const notifications = [
    { sev: 'warn', title: 'Low stock — Bearing 6204-2RS', meta: 'SKU BR-6204 · 4 left', time: '12m' },
    { sev: 'ok', title: 'Shipment SHP-2241 received', meta: '128 units · Dock B', time: '38m' },
    { sev: 'warn', title: 'Cycle count overdue · Aisle 12', meta: 'Last counted 41 days ago', time: '2h' },
];

export function AppSidebarHeader({ breadcrumbs = [] }: Props) {
    const { auth } = usePage().props;
    const getInitials = useInitials();
    const [openMenu, setOpenMenu] = useState<'profile' | 'notif' | null>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (profileRef.current?.contains(e.target as Node)) return;
            if (notifRef.current?.contains(e.target as Node)) return;
            setOpenMenu(null);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const initials = getInitials(auth.user.name);

    return (
        <header style={{
            height: 56,
            background: '#fff',
            borderBottom: '1px solid #e2e2e2',
            display: 'flex',
            alignItems: 'center',
            padding: '0 28px',
            gap: 24,
            position: 'sticky',
            top: 0,
            zIndex: 20,
            flexShrink: 0,
        }}>
            {/* Breadcrumbs */}
            <div style={{ display: 'flex', alignItems: 'center', minWidth: 180 }}>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Search */}
            <div style={{
                flex: 1,
                maxWidth: 480,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#f3f3f3',
                border: '1px solid transparent',
                borderRadius: 6,
                padding: '0 12px',
                height: 36,
            }}>
                <Search size={16} style={{ color: '#8a8a8a', flexShrink: 0 }} />
                <input
                    placeholder="Search SKU, product, supplier…"
                    readOnly
                    style={{
                        flex: 1,
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: 13,
                        color: '#161616',
                        cursor: 'default',
                    }}
                />
                <kbd style={{
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#6b6b6b',
                    background: '#fff',
                    border: '1px solid #e2e2e2',
                    borderRadius: 4,
                    padding: '2px 6px',
                    flexShrink: 0,
                }}>⌘K</kbd>
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                {/* Help */}
                <button style={{
                    width: 36,
                    height: 36,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 6,
                    color: '#3a3a3a',
                    background: 'transparent',
                }}>
                    <HelpCircle size={18} />
                </button>

                {/* Notifications */}
                <div ref={notifRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => setOpenMenu(openMenu === 'notif' ? null : 'notif')}
                        style={{
                            width: 36,
                            height: 36,
                            display: 'grid',
                            placeItems: 'center',
                            borderRadius: 6,
                            color: '#3a3a3a',
                            position: 'relative',
                            background: openMenu === 'notif' ? '#f0f0f0' : 'transparent',
                        }}
                    >
                        <Bell size={18} />
                        <span style={{
                            position: 'absolute',
                            top: 9,
                            right: 9,
                            width: 7,
                            height: 7,
                            background: '#c97a2b',
                            borderRadius: '50%',
                            border: '1.5px solid #fff',
                        }} />
                    </button>

                    {openMenu === 'notif' && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            right: 0,
                            width: 340,
                            background: '#fff',
                            border: '1px solid #e2e2e2',
                            borderRadius: 8,
                            boxShadow: '0 12px 32px -8px rgba(0,0,0,0.18), 0 4px 12px -4px rgba(0,0,0,0.08)',
                            zIndex: 50,
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                padding: '12px 14px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #e2e2e2',
                            }}>
                                <span style={{ fontWeight: 600, fontSize: 13 }}>Notifications</span>
                                <button style={{ fontSize: 11.5, color: '#6b6b6b', fontWeight: 500, background: 'none' }}>
                                    Mark all read
                                </button>
                            </div>
                            {notifications.map((n, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    gap: 10,
                                    padding: '11px 14px',
                                    borderBottom: '1px solid #e2e2e2',
                                    alignItems: 'flex-start',
                                }}>
                                    <span style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        marginTop: 6,
                                        flexShrink: 0,
                                        background: n.sev === 'warn' ? '#c97a2b' : '#3f7a4a',
                                    }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{n.title}</div>
                                        <div style={{ fontSize: 11.5, color: '#6b6b6b', fontFamily: "'JetBrains Mono', monospace" }}>
                                            {n.meta}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 11, color: '#9a9a9a' }}>{n.time}</span>
                                </div>
                            ))}
                            <button style={{
                                width: '100%',
                                padding: '11px',
                                textAlign: 'center',
                                fontSize: 12,
                                color: '#3a3a3a',
                                fontWeight: 500,
                                background: '#fafafa',
                            }}>
                                View all activity →
                            </button>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 24, background: '#e2e2e2', margin: '0 6px' }} />

                {/* Profile */}
                <div ref={profileRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => setOpenMenu(openMenu === 'profile' ? null : 'profile')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '4px 10px 4px 4px',
                            borderRadius: 8,
                            background: openMenu === 'profile' ? '#f0f0f0' : 'transparent',
                            transition: 'background 0.12s',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <span style={{
                            width: 30,
                            height: 30,
                            borderRadius: 6,
                            background: 'linear-gradient(135deg, #2d2e30, #1a1b1d)',
                            color: '#fff',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: 11.5,
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            flexShrink: 0,
                        }}>
                            {initials}
                        </span>
                        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#161616' }}>{auth.user.name}</div>
                            <div style={{ fontSize: 11, color: '#6b6b6b' }}>Warehouse Lead</div>
                        </div>
                        <ChevronDown
                            size={14}
                            style={{
                                color: '#8a8a8a',
                                transition: 'transform 0.2s',
                                transform: openMenu === 'profile' ? 'rotate(180deg)' : 'none',
                            }}
                        />
                    </button>

                    {openMenu === 'profile' && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            right: 0,
                            width: 280,
                            background: '#fff',
                            border: '1px solid #e2e2e2',
                            borderRadius: 8,
                            boxShadow: '0 12px 32px -8px rgba(0,0,0,0.18), 0 4px 12px -4px rgba(0,0,0,0.08)',
                            zIndex: 50,
                            overflow: 'hidden',
                        }}>
                            {/* Header */}
                            <div style={{
                                padding: '14px',
                                display: 'flex',
                                gap: 12,
                                alignItems: 'center',
                                borderBottom: '1px solid #e2e2e2',
                                background: '#fafafa',
                            }}>
                                <span style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: 6,
                                    background: 'linear-gradient(135deg, #2d2e30, #1a1b1d)',
                                    color: '#fff',
                                    display: 'grid',
                                    placeItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 700,
                                    flexShrink: 0,
                                }}>
                                    {initials}
                                </span>
                                <div style={{ lineHeight: 1.3 }}>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{auth.user.name}</div>
                                    <div style={{ color: '#6b6b6b', fontSize: 12 }}>{auth.user.email}</div>
                                </div>
                            </div>

                            {/* Section 1 */}
                            <div style={{ padding: '6px' }}>
                                <ProfileMenuItem
                                    icon={<User size={16} style={{ color: '#6b6b6b' }} />}
                                    label="My profile"
                                    onClick={() => { setOpenMenu(null); router.visit('/settings/profile'); }}
                                />
                                <ProfileMenuItem
                                    icon={<Settings size={16} style={{ color: '#6b6b6b' }} />}
                                    label="Account settings"
                                    shortcut="⌘,"
                                    onClick={() => { setOpenMenu(null); router.visit('/settings'); }}
                                />
                                <ProfileMenuItem
                                    icon={<PackageOpen size={16} style={{ color: '#6b6b6b' }} />}
                                    label="Switch warehouse"
                                    detail="Rotterdam · 03"
                                />
                            </div>

                            {/* Sign out */}
                            <div style={{ padding: '6px', borderTop: '1px solid #e2e2e2' }}>
                                <ProfileMenuItem
                                    icon={<LogOut size={16} style={{ color: '#b94a3d' }} />}
                                    label="Sign out"
                                    danger
                                    onClick={() => router.post('/logout')}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

function ProfileMenuItem({
    icon,
    label,
    detail,
    shortcut,
    danger,
    onClick,
}: {
    icon: ReactNode;
    label: string;
    detail?: string;
    shortcut?: string;
    danger?: boolean;
    onClick?: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                width: '100%',
                borderRadius: 5,
                fontSize: 13,
                color: danger ? '#b94a3d' : '#161616',
                background: hovered ? '#f3f3f3' : 'transparent',
                transition: 'background 0.1s',
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            {icon}
            <span style={{ flex: 1 }}>{label}</span>
            {detail && (
                <span style={{ fontSize: 11, color: '#9a9a9a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {detail}
                </span>
            )}
            {shortcut && (
                <span style={{ fontSize: 11, color: '#9a9a9a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {shortcut}
                </span>
            )}
        </button>
    );
}

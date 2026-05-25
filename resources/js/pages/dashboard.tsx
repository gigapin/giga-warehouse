import { Head } from '@inertiajs/react';
import { Box, ClipboardList, Plus, Tag } from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as itemsIndex } from '@/routes/items';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

// ── KPI cards ────────────────────────────────────────────────────────────────

type CardData = {
    label: string;
    value: string;
    sub: string;
    delta: string;
    deltaTone: 'pos' | 'neg' | 'warn';
    icon: ComponentType<{ size?: number; style?: CSSProperties }>;
    spark: number[];
};

const cards: CardData[] = [
    {
        label: 'Total SKUs',
        value: '1,284',
        sub: 'across 9 categories',
        delta: '+24 this week',
        deltaTone: 'pos',
        icon: Box,
        spark: [10, 14, 11, 16, 15, 19, 18, 22, 21, 25, 24, 28],
    },
    {
        label: 'In Stock',
        value: '47,219',
        sub: 'units · 78% capacity',
        delta: '−1.2% vs last week',
        deltaTone: 'neg',
        icon: Tag,
        spark: [28, 27, 26, 28, 25, 24, 26, 23, 22, 24, 22, 21],
    },
    {
        label: 'Pending Shipments',
        value: '12',
        sub: '3 awaiting QC',
        delta: '4 due today',
        deltaTone: 'warn',
        icon: ClipboardList,
        spark: [4, 6, 5, 8, 7, 10, 9, 12, 10, 14, 12, 12],
    },
];

const toneColor: Record<CardData['deltaTone'], string> = {
    pos: '#3f7a4a',
    neg: '#b94a3d',
    warn: '#c97a2b',
};

function Sparkline({ data, tone }: { data: number[]; tone: CardData['deltaTone'] }) {
    const w = 88, h = 26;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const pts = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((v - min) / (max - min || 1)) * (h - 2) - 1;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');
    return (
        <svg width={w} height={h} style={{ display: 'block' }}>
            <polyline
                points={pts}
                fill="none"
                stroke={toneColor[tone]}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function KpiCard({ data }: { data: CardData }) {
    const color = toneColor[data.deltaTone];
    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e2e2e2',
            borderRadius: 8,
            padding: '18px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                    width: 28, height: 28,
                    background: '#f3f3f3',
                    borderRadius: 5,
                    display: 'grid',
                    placeItems: 'center',
                }}>
                    <data.icon size={16} style={{ color: '#3a3a3a' }} />
                </div>
                <span style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: '#6b6b6b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                }}>
                    {data.label}
                </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 4 }}>
                <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#161616',
                    lineHeight: 1,
                }}>
                    {data.value}
                </div>
                <Sparkline data={data.spark} tone={data.deltaTone} />
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 12,
                paddingTop: 12,
                borderTop: '1px dashed #e2e2e2',
            }}>
                <span style={{ color: '#6b6b6b' }}>{data.sub}</span>
                <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color }}>
                    {data.delta}
                </span>
            </div>
        </div>
    );
}

// ── Item form ────────────────────────────────────────────────────────────────

type FormValues = { name: string; sku: string; quantity: string };
type Touched = Partial<Record<keyof FormValues, boolean>>;

const inputBase: CSSProperties = {
    width: '100%',
    height: 40,
    padding: '0 12px',
    border: '1px solid #cfcfcf',
    background: '#fff',
    borderRadius: 6,
    outline: 'none',
    fontSize: 13.5,
    boxSizing: 'border-box',
    transition: 'border-color 0.15s, box-shadow 0.15s',
};

const inputErrorStyle: CSSProperties = {
    borderColor: '#b94a3d',
    boxShadow: '0 0 0 3px rgba(185,74,61,0.08)',
};

function FormField({ label, hint, error, id, children }: {
    label: string; hint: string; error?: string; id: string; children: ReactNode;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label htmlFor={id} style={{ fontSize: 12.5, fontWeight: 600, color: '#3a3a3a', display: 'flex', gap: 3 }}>
                {label}
                <span style={{ color: '#c97a2b' }}>*</span>
            </label>
            {children}
            <div style={{ minHeight: 16 }}>
                <span style={{ fontSize: 11.5, color: error ? '#b94a3d' : '#6b6b6b' }}>
                    {error ?? hint}
                </span>
            </div>
        </div>
    );
}

function ItemForm() {
    const [values, setValues] = useState<FormValues>({ name: '', sku: '', quantity: '' });
    const [touched, setTouched] = useState<Touched>({});
    const [saved, setSaved] = useState(false);

    const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((v) => ({ ...v, [k]: e.target.value }));
        setSaved(false);
    };
    const blur = (k: keyof FormValues) => () => setTouched((t) => ({ ...t, [k]: true }));

    const errors: Partial<Record<keyof FormValues, string>> = {
        name: touched.name && !values.name.trim() ? 'Required' : undefined,
        sku: touched.sku
            ? (!values.sku ? 'Required' : !/^[A-Z]{2,3}-\d{3,6}$/.test(values.sku) ? 'Format: XX-1234' : undefined)
            : undefined,
        quantity: touched.quantity && (!values.quantity || +values.quantity < 0)
            ? 'Enter a positive number'
            : undefined,
    };

    const valid = !!values.name.trim() && !!values.sku && !!values.quantity && !Object.values(errors).some(Boolean);

    const onSave = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, sku: true, quantity: true });
        if (valid) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2200);
        }
    };

    const onReset = () => {
        setValues({ name: '', sku: '', quantity: '' });
        setTouched({});
        setSaved(false);
    };

    return (
        <section style={{ background: '#fff', border: '1px solid #e2e2e2', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{
                padding: '20px 24px 18px',
                borderBottom: '1px solid #e2e2e2',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
                <div>
                    <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4 }}>
                        Add new inventory item
                    </div>
                    <div style={{ fontSize: 13, color: '#6b6b6b' }}>
                        Register a new SKU into Warehouse 03 · Rotterdam.
                    </div>
                </div>
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: '#6b6b6b',
                    background: '#f3f3f3',
                    border: '1px solid #e2e2e2',
                    padding: '4px 10px',
                    borderRadius: 999,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                }}>
                    <span style={{ width: 6, height: 6, background: '#9a9a9a', borderRadius: '50%' }} />
                    Draft
                </span>
            </div>

            <form onSubmit={onSave} style={{ padding: '24px 24px 18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 20 }}>
                    <FormField label="Item name" hint="Displayed in product lists and labels." error={errors.name} id="f-name">
                        <input
                            id="f-name"
                            type="text"
                            placeholder="e.g. Stainless bracket 90°"
                            value={values.name}
                            onChange={set('name')}
                            onBlur={blur('name')}
                            style={{ ...inputBase, ...(errors.name ? inputErrorStyle : {}) }}
                        />
                    </FormField>

                    <FormField label="SKU code" hint="Unique product identifier." error={errors.sku} id="f-sku">
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <span style={{
                                position: 'absolute', left: 12,
                                fontSize: 11.5,
                                fontFamily: "'JetBrains Mono', monospace",
                                color: '#9a9a9a', fontWeight: 600, letterSpacing: '0.08em',
                                pointerEvents: 'none',
                            }}>SKU</span>
                            <input
                                id="f-sku"
                                type="text"
                                placeholder="BR-1024"
                                value={values.sku}
                                onChange={(e) => {
                                    const up = e.target.value.toUpperCase();
                                    setValues((v) => ({ ...v, sku: up }));
                                    setSaved(false);
                                }}
                                onBlur={blur('sku')}
                                style={{
                                    ...inputBase,
                                    paddingLeft: 44,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    ...(errors.sku ? inputErrorStyle : {}),
                                }}
                            />
                        </div>
                    </FormField>

                    <FormField label="Quantity on hand" hint="Units available at registration." error={errors.quantity} id="f-qty">
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                id="f-qty"
                                type="number"
                                placeholder="0"
                                min="0"
                                value={values.quantity}
                                onChange={set('quantity')}
                                onBlur={blur('quantity')}
                                style={{
                                    ...inputBase,
                                    paddingRight: 50,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    ...(errors.quantity ? inputErrorStyle : {}),
                                }}
                            />
                            <span style={{
                                position: 'absolute', right: 12,
                                fontSize: 12, color: '#9a9a9a',
                                fontFamily: "'JetBrains Mono', monospace",
                                pointerEvents: 'none',
                            }}>units</span>
                        </div>
                    </FormField>
                </div>

                <div style={{ height: 1, background: '#e2e2e2', margin: '20px -24px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18 }}>
                    <div>
                        {saved && (
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                fontSize: 12.5, fontWeight: 600, color: '#3f7a4a',
                                background: 'rgba(63,122,74,0.08)', padding: '5px 10px', borderRadius: 5,
                            }}>
                                ✓ Item saved
                            </span>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button
                            type="button"
                            onClick={onReset}
                            style={{
                                padding: '0 18px', height: 40, borderRadius: 6,
                                fontSize: 13.5, fontWeight: 600, color: '#3a3a3a',
                                border: '1px solid #cfcfcf', background: 'transparent', cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '0 18px', height: 40, borderRadius: 6,
                                fontSize: 13.5, fontWeight: 600, color: '#fff',
                                background: '#161616', border: 'none',
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                cursor: valid ? 'pointer' : 'not-allowed',
                                opacity: valid ? 1 : 0.55,
                                transition: 'opacity 0.12s',
                            }}
                        >
                            Save item
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div style={{ padding: '28px 36px', flex: 1 }}>
                {/* Page header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-end', marginBottom: 22, gap: 24,
                }}>
                    <div>
                        <div style={{
                            fontSize: 11.5, fontWeight: 600, color: '#6b6b6b',
                            textTransform: 'uppercase', letterSpacing: '0.1em',
                            marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 8,
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c97a2b', display: 'inline-block' }} />
                            Inventory · Warehouse 03
                        </div>
                        <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px', color: '#161616' }}>
                            Inventory Dashboard
                        </h1>
                        <p style={{ fontSize: 14, color: '#6b6b6b', margin: 0, maxWidth: 540, lineHeight: 1.5 }}>
                            Quick overview of stock health and a form to register a new SKU into the system.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                        <button style={{
                            height: 38, padding: '0 16px', background: '#fff',
                            border: '1px solid #cfcfcf', borderRadius: 6,
                            fontSize: 13, fontWeight: 600, color: '#3a3a3a',
                            display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                        }}>
                            <ClipboardList size={15} />
                            Bulk import
                        </button>
                        <a
                            href={`${itemsIndex().url}/create`}
                            style={{
                                height: 38, padding: '0 16px', background: '#161616',
                                border: '1px solid #161616', borderRadius: 6,
                                fontSize: 13, fontWeight: 600, color: '#fff',
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                textDecoration: 'none', cursor: 'pointer',
                            }}
                        >
                            <Plus size={15} />
                            New item
                        </a>
                    </div>
                </div>

                {/* KPI cards */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28,
                }}>
                    {cards.map((c, i) => <KpiCard key={i} data={c} />)}
                </div>

                {/* Form */}
                <ItemForm />
            </div>
        </AppLayout>
    );
}

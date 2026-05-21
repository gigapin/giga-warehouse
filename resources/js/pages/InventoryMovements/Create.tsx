import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { store } from '@/actions/App/Http/Controllers/InventoryMovementController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import type { Causal } from "@/types/causal";
import type { Item } from "@/types/item";
import type { Order } from "@/types/order";

export default function Create({ causals, items, orders }: { causals: Causal[]; items: Item[]; orders: Order[] }) {
    return (
        <AppLayout>
            <Head title="Add new inventory movement" />
            <div className='w-1/2'>
                <Form action={store()}>
                    {({ errors, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="causal_id">Causal</FieldLabel>
                                <Select name="causal_id">
                                    <SelectTrigger><SelectValue placeholder="Select causal" /></SelectTrigger>
                                    <SelectContent>
                                        {causals.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.code}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.causal_id && <div className='text-red-600'>{errors.causal_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="item_id">Item</FieldLabel>
                                <Select name="item_id">
                                    <SelectTrigger><SelectValue placeholder="Select item" /></SelectTrigger>
                                    <SelectContent>
                                        {items.map(i => <SelectItem key={i.id} value={String(i.id)}>{i.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.item_id && <div className='text-red-600'>{errors.item_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="inventory_movement_type">Type</FieldLabel>
                                <Select name="inventory_movement_type">
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inbound">Inbound</SelectItem>
                                        <SelectItem value="outbound">Outbound</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.inventory_movement_type && <div className='text-red-600'>{errors.inventory_movement_type}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="order_id">Order</FieldLabel>
                                <Select name="order_id">
                                    <SelectTrigger><SelectValue placeholder="Select order" /></SelectTrigger>
                                    <SelectContent>
                                        {orders.map(o => <SelectItem key={o.id} value={String(o.id)}>{o.order_number}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.order_id && <div className='text-red-600'>{errors.order_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="detail_order_id">Detail Order ID</FieldLabel>
                                <Input id="detail_order_id" name='detail_order_id' type='number' />
                                {errors.detail_order_id && <div className='text-red-600'>{errors.detail_order_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                                <Input id="quantity" name='quantity' type='number' />
                                {errors.quantity && <div className='text-red-600'>{errors.quantity}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="reference_ddt">Reference DDT</FieldLabel>
                                <Input id="reference_ddt" name='reference_ddt' />
                                {errors.reference_ddt && <div className='text-red-600'>{errors.reference_ddt}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="inventory_movement_date">Movement Date</FieldLabel>
                                <Input id="inventory_movement_date" name='inventory_movement_date' type='date' />
                                {errors.inventory_movement_date && <div className='text-red-600'>{errors.inventory_movement_date}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="purchase_price_cad">Purchase Price CAD</FieldLabel>
                                <Input id="purchase_price_cad" name='purchase_price_cad' type='number' />
                                {errors.purchase_price_cad && <div className='text-red-600'>{errors.purchase_price_cad}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="sale_price_cad">Sale Price CAD</FieldLabel>
                                <Input id="sale_price_cad" name='sale_price_cad' type='number' />
                                {errors.sale_price_cad && <div className='text-red-600'>{errors.sale_price_cad}</div>}
                            </Field>
                            <Field>
                                <Button disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                            </Field>
                        </FieldGroup>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}

import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { store } from '@/actions/App/Http/Controllers/OrderDetailController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import type { Item } from "@/types/item";
import type { Order } from "@/types/order";

export default function Create({ orders, items }: { orders: Order[]; items: Item[] }) {
    return (
        <AppLayout>
            <Head title="Add new order detail" />
            <div className='w-1/2'>
                <Form action={store()}>
                    {({ errors, processing }) => (
                        <FieldGroup>
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
                                <FieldLabel htmlFor="delivery_date">Delivery Date</FieldLabel>
                                <Input id="delivery_date" name='delivery_date' type='date' />
                                {errors.delivery_date && <div className='text-red-600'>{errors.delivery_date}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="qta_ordered">Qty Ordered</FieldLabel>
                                <Input id="qta_ordered" name='qta_ordered' type='number' />
                                {errors.qta_ordered && <div className='text-red-600'>{errors.qta_ordered}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="qta_delivered">Qty Delivered</FieldLabel>
                                <Input id="qta_delivered" name='qta_delivered' type='number' />
                                {errors.qta_delivered && <div className='text-red-600'>{errors.qta_delivered}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="delivered">Delivered</FieldLabel>
                                <Input id="delivered" name='delivered' type='number' />
                                {errors.delivered && <div className='text-red-600'>{errors.delivered}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="note">Note</FieldLabel>
                                <Textarea id='note' name='note' />
                                {errors.note && <div className='text-red-600'>{errors.note}</div>}
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

import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { update } from '@/actions/App/Http/Controllers/OrderController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import type { Customer } from "@/types/customer";
import type { Order } from "@/types/order";
import type { Supplier } from "@/types/supplier";

export default function Edit({ order, customers, suppliers }: { order: Order; customers: Customer[]; suppliers: Supplier[] }) {
    return (
        <AppLayout>
            <Head title={`Edit ${order.order_number}`} />
            <div className='w-1/2'>
                <Form action={update(order.id)}>
                    {({ errors, wasSuccessful, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="typology">Typology</FieldLabel>
                                <Select name="typology" defaultValue={order.typology}>
                                    <SelectTrigger><SelectValue placeholder="Select typology" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="customer">Customer</SelectItem>
                                        <SelectItem value="supplier">Supplier</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.typology && <div className='text-red-600'>{errors.typology}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="customer_id">Customer</FieldLabel>
                                <Select name="customer_id" defaultValue={order.customer_id ? String(order.customer_id) : undefined}>
                                    <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                                    <SelectContent>
                                        {customers.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.company_name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.customer_id && <div className='text-red-600'>{errors.customer_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="supplier_id">Supplier</FieldLabel>
                                <Select name="supplier_id" defaultValue={order.supplier_id ? String(order.supplier_id) : undefined}>
                                    <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
                                    <SelectContent>
                                        {suppliers.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.company_name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.supplier_id && <div className='text-red-600'>{errors.supplier_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="order_number">Order Number</FieldLabel>
                                <Input id="order_number" name='order_number' defaultValue={order.order_number} />
                                {errors.order_number && <div className='text-red-600'>{errors.order_number}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="request_date">Request Date</FieldLabel>
                                <Input id="request_date" name='request_date' type='date' defaultValue={order.request_date} />
                                {errors.request_date && <div className='text-red-600'>{errors.request_date}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="closing_date">Closing Date</FieldLabel>
                                <Input id="closing_date" name='closing_date' type='date' defaultValue={order.closing_date} />
                                {errors.closing_date && <div className='text-red-600'>{errors.closing_date}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="status">Status</FieldLabel>
                                <Select name="status" defaultValue={order.status}>
                                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <div className='text-red-600'>{errors.status}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="note">Note</FieldLabel>
                                <Textarea id='note' name='note' defaultValue={order.note} />
                                {errors.note && <div className='text-red-600'>{errors.note}</div>}
                            </Field>
                            <Field>
                                <Button disabled={processing}>{processing ? 'Saving...' : 'Update'}</Button>
                                {wasSuccessful && <div>Updated successfully</div>}
                            </Field>
                        </FieldGroup>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}

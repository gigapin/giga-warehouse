import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { update } from '@/actions/App/Http/Controllers/CustomerController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import type { Customer } from "@/types/customer";
import type { Municipality } from "@/types/municipality";

export default function Edit({ customer, municipalities }: { customer: Customer; municipalities: Municipality[] }) {
    return (
        <AppLayout>
            <Head title={`Edit ${customer.company_name}`} />
            <div className='w-1/2'>
                <Form action={update(customer.id)}>
                    {({ errors, wasSuccessful, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="company_name">Company Name</FieldLabel>
                                <Input id="company_name" name='company_name' defaultValue={customer.company_name} />
                                {errors.company_name && <div className='text-red-600'>{errors.company_name}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="vat_number">VAT Number</FieldLabel>
                                <Input id="vat_number" name='vat_number' defaultValue={customer.vat_number} />
                                {errors.vat_number && <div className='text-red-600'>{errors.vat_number}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="fiscal_code">Fiscal Code</FieldLabel>
                                <Input id="fiscal_code" name='fiscal_code' defaultValue={customer.fiscal_code} />
                                {errors.fiscal_code && <div className='text-red-600'>{errors.fiscal_code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="municipality_id">Municipality</FieldLabel>
                                <Select name="municipality_id" defaultValue={String(customer.municipality_id)}>
                                    <SelectTrigger><SelectValue placeholder="Select municipality" /></SelectTrigger>
                                    <SelectContent>
                                        {municipalities.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.municipality_id && <div className='text-red-600'>{errors.municipality_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="address">Address</FieldLabel>
                                <Input id="address" name='address' defaultValue={customer.address} />
                                {errors.address && <div className='text-red-600'>{errors.address}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="sdi_code">SDI Code</FieldLabel>
                                <Input id="sdi_code" name='sdi_code' defaultValue={customer.sdi_code} />
                                {errors.sdi_code && <div className='text-red-600'>{errors.sdi_code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="pec">PEC</FieldLabel>
                                <Input id="pec" name='pec' defaultValue={customer.pec} />
                                {errors.pec && <div className='text-red-600'>{errors.pec}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" name='email' type='email' defaultValue={customer.email} />
                                {errors.email && <div className='text-red-600'>{errors.email}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                <Input id="phone" name='phone' defaultValue={customer.phone} />
                                {errors.phone && <div className='text-red-600'>{errors.phone}</div>}
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

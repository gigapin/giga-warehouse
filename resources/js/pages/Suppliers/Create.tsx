import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { store } from '@/actions/App/Http/Controllers/SupplierController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import type { Municipality } from "@/types/municipality";

export default function Create({ municipalities }: { municipalities: Municipality[] }) {
    return (
        <AppLayout>
            <Head title="Add new supplier" />
            <div className='w-1/2'>
                <Form action={store()}>
                    {({ errors, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="company_name">Company Name</FieldLabel>
                                <Input id="company_name" name='company_name' />
                                {errors.company_name && <div className='text-red-600'>{errors.company_name}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="vat_number">VAT Number</FieldLabel>
                                <Input id="vat_number" name='vat_number' />
                                {errors.vat_number && <div className='text-red-600'>{errors.vat_number}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="fiscal_code">Fiscal Code</FieldLabel>
                                <Input id="fiscal_code" name='fiscal_code' />
                                {errors.fiscal_code && <div className='text-red-600'>{errors.fiscal_code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="municipality_id">Municipality</FieldLabel>
                                <Select name="municipality_id">
                                    <SelectTrigger><SelectValue placeholder="Select municipality" /></SelectTrigger>
                                    <SelectContent>
                                        {municipalities.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.municipality_id && <div className='text-red-600'>{errors.municipality_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="address">Address</FieldLabel>
                                <Input id="address" name='address' />
                                {errors.address && <div className='text-red-600'>{errors.address}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="sdi_code">SDI Code</FieldLabel>
                                <Input id="sdi_code" name='sdi_code' />
                                {errors.sdi_code && <div className='text-red-600'>{errors.sdi_code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="pec">PEC</FieldLabel>
                                <Input id="pec" name='pec' />
                                {errors.pec && <div className='text-red-600'>{errors.pec}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" name='email' type='email' />
                                {errors.email && <div className='text-red-600'>{errors.email}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                <Input id="phone" name='phone' />
                                {errors.phone && <div className='text-red-600'>{errors.phone}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="service">Service</FieldLabel>
                                <Input id="service" name='service' type='number' />
                                {errors.service && <div className='text-red-600'>{errors.service}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="punctuality">Punctuality</FieldLabel>
                                <Input id="punctuality" name='punctuality' type='number' />
                                {errors.punctuality && <div className='text-red-600'>{errors.punctuality}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="quality">Quality</FieldLabel>
                                <Input id="quality" name='quality' type='number' />
                                {errors.quality && <div className='text-red-600'>{errors.quality}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="prices">Prices</FieldLabel>
                                <Input id="prices" name='prices' type='number' />
                                {errors.prices && <div className='text-red-600'>{errors.prices}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="assistance">Assistance</FieldLabel>
                                <Input id="assistance" name='assistance' type='number' />
                                {errors.assistance && <div className='text-red-600'>{errors.assistance}</div>}
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

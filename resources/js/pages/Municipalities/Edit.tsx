import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { update } from '@/actions/App/Http/Controllers/MunicipalityController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import type { Municipality } from "@/types/municipality";

export default function Edit({ municipality }: { municipality: Municipality }) {
    return (
        <AppLayout>
            <Head title={`Edit ${municipality.name}`} />
            <div className='w-1/2'>
                <Form action={update(municipality.id)}>
                    {({ errors, wasSuccessful, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input id="name" name='name' defaultValue={municipality.name} />
                                {errors.name && <div className='text-red-600'>{errors.name}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="postal_code">Postal Code</FieldLabel>
                                <Input id="postal_code" name='postal_code' defaultValue={municipality.postal_code} />
                                {errors.postal_code && <div className='text-red-600'>{errors.postal_code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="district">District</FieldLabel>
                                <Input id="district" name='district' defaultValue={municipality.district} />
                                {errors.district && <div className='text-red-600'>{errors.district}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="region">Region</FieldLabel>
                                <Input id="region" name='region' defaultValue={municipality.region} />
                                {errors.region && <div className='text-red-600'>{errors.region}</div>}
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

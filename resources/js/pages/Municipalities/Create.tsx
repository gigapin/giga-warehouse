import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { store } from '@/actions/App/Http/Controllers/MunicipalityController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";

export default function Create() {
    return (
        <AppLayout>
            <Head title="Add new municipality" />
            <div className='w-1/2'>
                <Form action={store()}>
                    {({ errors, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input id="name" name='name' />
                                {errors.name && <div className='text-red-600'>{errors.name}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="postal_code">Postal Code</FieldLabel>
                                <Input id="postal_code" name='postal_code' />
                                {errors.postal_code && <div className='text-red-600'>{errors.postal_code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="district">District</FieldLabel>
                                <Input id="district" name='district' />
                                {errors.district && <div className='text-red-600'>{errors.district}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="region">Region</FieldLabel>
                                <Input id="region" name='region' />
                                {errors.region && <div className='text-red-600'>{errors.region}</div>}
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

import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { store } from '@/actions/App/Http/Controllers/CausalController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";

export default function Create() {
    return (
        <AppLayout>
            <Head title="Add new causal" />
            <div className='w-1/2'>
                <Form action={store()}>
                    {({ errors, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="code">Code</FieldLabel>
                                <Input id="code" name='code' />
                                {errors.code && <div className='text-red-600'>{errors.code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea id='description' name='description' />
                                {errors.description && <div className='text-red-600'>{errors.description}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="typology">Typology</FieldLabel>
                                <Select name="typology">
                                    <SelectTrigger><SelectValue placeholder="Select typology" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inbound">Inbound</SelectItem>
                                        <SelectItem value="outbound">Outbound</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.typology && <div className='text-red-600'>{errors.typology}</div>}
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

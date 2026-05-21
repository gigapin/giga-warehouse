import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { update } from '@/actions/App/Http/Controllers/CausalController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import type { Causal } from "@/types/causal";

export default function Edit({ causal }: { causal: Causal }) {
    return (
        <AppLayout>
            <Head title={`Edit ${causal.code}`} />
            <div className='w-1/2'>
                <Form action={update(causal.id)}>
                    {({ errors, wasSuccessful, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="code">Code</FieldLabel>
                                <Input id="code" name='code' defaultValue={causal.code} />
                                {errors.code && <div className='text-red-600'>{errors.code}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea id='description' name='description' defaultValue={causal.description} />
                                {errors.description && <div className='text-red-600'>{errors.description}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="typology">Typology</FieldLabel>
                                <Select name="typology" defaultValue={causal.typology}>
                                    <SelectTrigger><SelectValue placeholder="Select typology" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inbound">Inbound</SelectItem>
                                        <SelectItem value="outbound">Outbound</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.typology && <div className='text-red-600'>{errors.typology}</div>}
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

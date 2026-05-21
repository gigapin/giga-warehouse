import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { update } from '@/actions/App/Http/Controllers/ItemController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import type { Category } from "@/types/category";
import type { Item } from "@/types/item";

export default function Edit({ item, categories }: { item: Item; categories: Category[] }) {
    return (
        <AppLayout>
            <Head title={`Edit ${item.name}`} />
            <div className='w-1/2'>
                <Form action={update(item.id)}>
                    {({ errors, wasSuccessful, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input id="name" name='name' defaultValue={item.name} />
                                {errors.name && <div className='text-red-600'>{errors.name}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea id='description' name='description' defaultValue={item.description} />
                                {errors.description && <div className='text-red-600'>{errors.description}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="category_id">Category</FieldLabel>
                                <Select name="category_id" defaultValue={String(item.category_id)}>
                                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && <div className='text-red-600'>{errors.category_id}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="stock_beginning_year">Stock Beginning Year</FieldLabel>
                                <Input id="stock_beginning_year" name='stock_beginning_year' type='number' defaultValue={item.stock_beginning_year} />
                                {errors.stock_beginning_year && <div className='text-red-600'>{errors.stock_beginning_year}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="safety_stock">Safety Stock</FieldLabel>
                                <Input id="safety_stock" name='safety_stock' type='number' defaultValue={item.safety_stock} />
                                {errors.safety_stock && <div className='text-red-600'>{errors.safety_stock}</div>}
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

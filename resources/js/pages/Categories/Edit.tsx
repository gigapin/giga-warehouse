import { Head } from "@inertiajs/react";
import { Form } from "@inertiajs/react";
import { update } from '@/actions/App/Http/Controllers/CategoryController';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import type { Category } from "@/types/category";


export default function EditCategory({ category }: { category: Category }) {
    return (
        <AppLayout>
            <Head title={`Edit ${category.name}`} />
            <div className='w-1/2'>
                <div>{category.name}</div>
                <Form action={update(category.id)}>
                    {({ errors, wasSuccessful, processing }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input id="name" name='name' defaultValue={category.name} />
                                {errors.name && <div className='text-red-600'>{errors.name}</div>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">
                                    Description
                                </FieldLabel>
                                <Textarea id='description' name='description' />
                                {/* <Textarea value={data.description} id="description" name="description" onChange={(e) => setData('description', e.target.value)} />*/}
                            </Field>
                            <Field>
                                <Button disabled={processing}>{processing ? 'Editing category...' : 'Update'}</Button>
                                {wasSuccessful && <div>Category updated successfully</div>}
                            </Field>
                        </FieldGroup>
                    )}
                {/*<form onSubmit={handleSubmit}>*/}

               {/* </form>*/}
                </Form>
            </div>
        </AppLayout>
    );
}
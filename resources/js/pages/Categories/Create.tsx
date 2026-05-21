import { Head } from '@inertiajs/react';
import * as React from "react"
import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    /* const { post, data, setData, errors } = useForm({
        name: '',
        description: '',
    });

    const { flash } = usePage();

    function handleSubmit(evt: React.SubmitEvent) {
        evt.preventDefault();
        console.log(data);
        post('/categories');
    }
 */
    return (
        <AppLayout>
            <Head title="Add new category" />
            {/*  <div className='w-1/2'>
              {flash.toast && <div className="bg-green-600 text-white py-2">{flash.toast.message}</div>}
              <form onSubmit={handleSubmit}>
                  <FieldGroup>
                      <Field>
                          <FieldLabel htmlFor="name">Name</FieldLabel>
                          <Input id="name" onChange={(e) => setData('name', e.target.value)} />
                          {errors.name && <div className='text-red-600'>{errors.name}</div>}
                      </Field>
                      <Field>
                          <FieldLabel htmlFor="description">
                              Description
                          </FieldLabel>
                          <Textarea id="description" name="description" onChange={(e) => setData('description', e.target.value)} />
                      </Field>
                      <Field>
                          <Button>Save</Button>
                      </Field>
                  </FieldGroup>
              </form>
          </div> */}

            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Bug Report</CardTitle>
                    <CardDescription>
                        Help us improve by reporting bugs you encounter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="form-rhf-demo"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Bug Title
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Login button not working on mobile"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Description
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="form-rhf-demo-description"
                                                placeholder="I'm having an issue with the login button on mobile."
                                                rows={6}
                                                className="min-h-24 resize-none"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value.length}/100
                                                    characters
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <FieldDescription>
                                            Include steps to reproduce, expected
                                            behavior, and what actually
                                            happened.
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                        >
                            Reset
                        </Button>
                        <Button type="submit" form="form-rhf-demo">
                            Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}

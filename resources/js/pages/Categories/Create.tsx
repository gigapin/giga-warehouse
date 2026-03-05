import { Head } from '@inertiajs/react';
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const { post, data, setData, errors } = useForm({
        name: '',
        description: ''
    });

    const { flash } = usePage();

    function handleSubmit(evt: React.SubmitEvent) {
        evt.preventDefault();
        console.log(data)
        post('/categories');
    }

    return (
      <AppLayout>
          <Head title="Add new category" />
          <div className='w-1/2'>
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
          </div>
      </AppLayout>
    );
}

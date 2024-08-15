"use client"

import formSchema from '@/components/forms/PatientForm/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import CustomFormField from '@/components/forms/CustomFormField';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there &#128075;</h1>
          <p className='text-dark-700'>Schedule your first appointment.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='name'
          label='Full name'
          placeholder='John doe'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='Email'
          placeholder='johndoe@jsmastery.pro'
          iconSrc='/assets/icons/email.svg'
          iconAlt='user'
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE}
          control={form.control}
          name='phone'
          label='Phone number'
          placeholder='+359 1244 556'
          iconSrc='/assets/icons/email.svg'
          iconAlt='user'
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default PatientForm;
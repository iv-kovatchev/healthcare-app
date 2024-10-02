"use client"

import { patientFormSchema } from '@/components/forms/PatientForm/patientFormSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import CustomFormField, { FormFieldType } from '@/components/forms/CustomFormField';
import SubmitButton from '@/components/forms/SubmitButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    },
  })

  const onSubmit = async ({ name, email, phone }: z.infer<typeof patientFormSchema>) => {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if(user) {
        router.push(`/patients/${user.$id}/register`);
      }
    }
    catch (error) {
      console.log(error);
    }

    setIsLoading(false);
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

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm;
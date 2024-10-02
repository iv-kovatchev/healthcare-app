'use client'

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
import { Doctors } from '@/constants';
import { SelectItem } from '@/components/ui/select';
import Image from 'next/image';

interface AppointmentFormProps {
  userId: string,
  patientId: string,
  type: 'create' | 'cancel'| 'schedule'
}

const AppointmentForm = ({ userId, patientId, type }: AppointmentFormProps) => {
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

  let buttonLabel;

  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'create':
      buttonLabel = 'Create Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      break;
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>New Appointment</h1>
          <p className='text-dark-700'>Request a new appointment in 10 seconds.</p>
        </section>

        {
          type !== 'cancel' && (
            <>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a doctor"
              >
                {Doctors.map((doctor) => (
                    <SelectItem
                      key={doctor.name}
                      value={doctor.name}
                      className='cursor-pointer'
                    >
                      <div className='flex cursos-pointer items-center gap-2'>
                        <Image
                          className='rounded-full border border-dark-500'
                          src={doctor.image}
                          alt={doctor.name}
                          width={32}
                          height={32}
                        />
                        <p>{doctor.name}</p>
                      </div>
                    </SelectItem>
                  )
                )}
              </CustomFormField>

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name='schedule'
                label='Expected appointment date'
                showTimeSelect
                dateFormat='MM/dd/yyyy - h:mm aa'
              />


              <div className='flex flex-col gap-6 xl:flex-row'>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name='reason'
                  label='Reason for appointment'
                  placeholder='Enter reason for appointment'
                />

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name='notes'
                  label='Notes'
                  placeholder='Enter notes'
                />
              </div>
            </>
          )
        }

        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label='Reason for cancellation'
            placeholder='Enter reason for cancellation'
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm;
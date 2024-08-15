'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from '@/components/forms/PatientForm/PatientForm';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';
import { E164Number } from 'libphonenumber-js';

interface CustomFormFieldProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: string,
  children?: React.ReactNode,
  renderSkeleton?: React.ReactNode,
}

interface RenderInputProps  {
  field: any,
  props: CustomFormFieldProps
}

const RenderInput = ({ field, props }: RenderInputProps) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'field-icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='BG'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className='input-phone'

          />
        </FormControl>
      )
    default:
      break;
  }

  return (
    <Input
      type={props.fieldType}
      placeholder={props.placeholder}
    />
  )
}

const CustomFormField = (props: CustomFormFieldProps ) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
    )
}

export default CustomFormField;
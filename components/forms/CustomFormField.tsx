'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js';
import DatePicker from 'react-datepicker';

import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

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
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,
}

interface RenderInputProps {
  field: any,
  props: CustomFormFieldProps
}

const RenderInput = ({field, props}: RenderInputProps) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'field-icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className='shad-textArea'
            disabled={props.disabled}
          />
        </FormControl>
      )
    case FormFieldType.PHONE:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="BG"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"

          />
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            height={24}
            width={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return (
        props.renderSkeleton ? props.renderSkeleton(field) : null
      )
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className='shad-select-trigger'>
                <SelectValue className='cursor-pointer' placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className='checkbox-label'>
              {props.label}
            </label>
          </div>
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

const CustomFormField = (props: CustomFormFieldProps) => {
  const {control, fieldType, name, label} = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props}/>
          <FormMessage className="shad-error"/>
        </FormItem>
      )}
    />
  )
}

export default CustomFormField;
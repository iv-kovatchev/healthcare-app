import Image from "next/image";
import AppointmentForm from '@/components/forms/AppointmentForm/';
import { getPatient } from '@/lib/actions/patient.actions';

const NewAppointment = async ({ params: { userId }}: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Image
            src="/assets/icons/logo-full.svg"
            alt='logo'
            height={1000}
            width={1000}
            className='mb-12 h-10 w-fit'
          />

          <AppointmentForm
            type='create'
            userId={userId}
            patientId={patient.$id}
          />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 Healthcare
            </p>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/appointment-img.png'
        alt='patient'
        height={1000}
        width={1000}
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
}

export default NewAppointment;

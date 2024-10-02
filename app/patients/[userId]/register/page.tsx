import Image from 'next/image';
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  //const patient = await getPatient(userId);

  //if (patient) redirect(`/patients/${userId}/new-appointment`);

  return  (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Image
            src="/assets/icons/logo-full.svg"
            alt='logo'
            height={1000}
            width={1000}
            className='mb-12 h-10 w-fit'
          />

          <RegisterForm user={user} />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 Healthcare
            </p>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        alt='patient'
        height={1000}
        width={1000}
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Register;
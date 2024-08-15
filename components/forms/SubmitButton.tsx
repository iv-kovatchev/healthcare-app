import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: SubmitButtonProps) => {
  return (
    <Button
      type='submit'
      disabled={isLoading}
      className={className ?? 'shad-primary-btn w-full'}>
      {isLoading ?
        (<div>
          <Image
            src='/assets/images/loader.svg'
            alt='loader'
            width={24}
            height={24}
            className='animate-spin'
          />
          Loading...
        </div>) : children}
    </Button>
  )
}

export default SubmitButton;
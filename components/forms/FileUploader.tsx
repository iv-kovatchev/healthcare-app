import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';

interface FileUploaderProps {
  files: File[] | undefined,
  onChange: (files: File[]) => void
}

const FileUploader = ({files, onChange}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
          <Image
            height={1000}
            width={1000}
            src={convertFileToUrl(files[0])}
            alt="uploaded-image"/>
        ) :
        (<>
            <Image
              height={40}
              width={40}
              src="/assets/icons/upload.svg"
              alt="upload"/>
            <div className='file-upload_label'>
              <p className='text-14-regular'>
                <span className='text-green-500'>Click to upload</span> or drag and drop
              </p>
              <p>
                SVG, PNG, JPG or JPEG (max 800x400)
              </p>
            </div>
          </>
        )}
    </div>
  )
}

export default FileUploader;

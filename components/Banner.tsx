import Logo from '@/public/img/Logo.svg'
import Image from 'next/image';

const Banner = () => {
  return (
    <header className='relative bg-banner w-full h-[300px] bg-no-repeat bg-cover bg-center flex justify-center'>
        <Image src={Logo} alt='Logo' className='absolute top-28'/>
    </header>
  )
}

export default Banner
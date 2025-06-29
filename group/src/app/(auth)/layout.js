import Image from 'next/image';
import logo from '../../assets/logo.png'
export default function AuthLayout({ children }) {
    return (
        <div>
            <div className='w-full flex justify-center pt-4 fixed left-0 right-0 z-50 bg-white'>
                <Image src={logo} alt='logo' />
            </div>
            <main>{children}</main>
        </div>
    );
}
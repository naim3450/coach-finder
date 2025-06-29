import Image from 'next/image'

import logo from '../../assets/logo.png'
const Layout = ({ children }) => {
    return (
        <div>
            <div className='mx-auto pt-5 fixed top-0 left-0 flex items-center justify-center w-full'>
                <Image src={logo} alt='logo' />
            </div>
            {children}
        </div>
    )
}

export default Layout
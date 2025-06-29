import Image from "next/image";
import Logo2 from "../../assets/logo2.png";
import Link from "next/link";
 
export default function AuthLayout({ children }) {
    return (
        <div className="relative">
            <div className="w-full flex items-center justify-center fixed left-0 top-0 h-[100px] bg-white z-50">
              
                <Link href={`/`}>
                <Image src={Logo2} alt="Logo" className="h-full w-full"/>
                </Link>
                
                 </div>
            <main>{children}</main>
        </div>
    );
}
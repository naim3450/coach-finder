
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { IoCallOutline } from "react-icons/io5";
import Link from "next/link";



const Footer = () => {
  return (
    <section className="py-20 bg-[#222B60]">
      <div className="container">
        <div className="flex md:flex-wrap md:flex-row flex-col gap-y-5 justify-between">

          {/* part one start */}
          <div className="">
            <h3 className="font-semibold lg:text-[18px] text-base text-white">About Us</h3>
            <p className="text-base font-openSans font-normal text-white pt-[15px] pb-[32px] lg:w-[263px]">
              We are dedicated to showcasing the most innovative and impactful groups across diverse industries. Our platform connects you to the leaders and changemakers who are shaping the future of technology, finance, healthcare, education, and more.
            </p>


          </div>
          {/* part one end */}

          {/* part two start */}
          <div className="">
            <ul className="flex flex-col gap-y-4">
              <li className="font-openSans font-bold text-white text-[18px]">
                Quick Links
              </li>
              <Link href={'/'}>
                <li className="font-openSans font-normal text-base text-white"  >
                  Home
                </li>
              </Link>
              <Link href={'#'}>
                <li className="font-openSans font-normal text-base text-white"  >
                Industries
                </li>
              </Link>
              <Link href={'#'}>
                <li className="font-openSans font-normal text-base text-white"  >
                  Featured Groups
                </li>
              </Link>
              <Link href={'/about-us'}>
                <li className="font-openSans font-normal text-base text-white"  >
                  About Us
                </li>
              </Link>
            </ul>
          </div>



          {/* part two end */}
          {/* part three start */}
          <div className="mt-12">
            <ul className="flex flex-col gap-y-4">
              <Link href={'/our-commitment'} >
                <li
                  className="font-openSans hover:text-thirdColor  font-normal text-base text-white"
                >
                  Privacy Policy
                </li>
              </Link>
              <li
                className="font-openSans hover:text-thirdColor  font-normal text-base text-white"
              >
               Terms of Service
              </li>
            </ul>
          </div>

          {/* part three end */}
          {/* part 4th start */}
          <div className="">
            <ul className="flex flex-col gap-y-4">
              <li className="font-openSans font-bold text-white text-[18px]">
                Contact
              </li>
              <p className="lg:w-[357px] w-full  text-white font-normal text-[15px] pb-2">For inquiries or partnerships, feel free to reach out to us at:</p>
            </ul>
            <div className="flex gap-x-2">
              <CgMail className="text-white text-[18px]" />
              <a href="#" className="text-white font-normal text-[15px]">hello@coachfinder.com</a>
            </div>
            <div className="flex gap-x-2 mt-1">

              <IoCallOutline className="text-white text-[18px]" />
              <p className="text-white font-normal text-[15px]">(589) 487 - 5892</p>
            </div>

            <div className="flex flex-col gap-y-2 mt-3">
              <h3 className="font-semibold text-white text-[18px] ">Connect with Us</h3>
              <p className="lg:w-[357px] w-full text-white font-normal text-[15px] pt-1">Hello@Payslave.com
                734 Broadway, Floor 5 New York, NY 10003</p>
            </div>
            <div className="flex items-center gap-x-6 mt-4">
              <div className="cursor-pointer text-3xl text-white">
                <span>
                  <FaFacebook />

                </span>
              </div>
              <div className="cursor-pointer text-3xl text-white">
                <span>
                <BsTwitterX />
                </span>
              </div>

              <div className="cursor-pointer text-3xl text-white">
                <span>
                  <FaInstagram />
                </span>
              </div>
              <div className="cursor-pointer text-3xl text-white">
                <span>
                  <FaLinkedin />
                </span>
              </div>
              <div className=" cursor-pointer text-3xl text-white">
                <span>
                  <FaGoogle />
                </span>
              </div>
            </div>
          </div>



          {/* part 4th end */}

        </div>
        <div className="border-t border-white mt-10">
          <p className="text-white text-center pt-5">© 2025 CoachFinder . All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

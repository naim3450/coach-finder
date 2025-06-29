"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "./shared/button";
import Link from "next/link";

const Successlogin = () => {
  const { sucessfully } = useSelector((state) => state.apiInfo);

  const router = useRouter();

  if (!sucessfully) {
    router.push('/signin')
    return;
  }

  return (
    <div className="bg-BgColor py-10">
      <div className="container py-20 w-full lg:w-[607px] bg-white rounded-[20px] shadow-2xl">
        <h3 className="font-medium text-primaryColor text-[8vw] lg:text-[64px] text-center pt-20 md:w-[484px] w-full mx-auto leading-snug">
          Successfully logged In
        </h3>
        <p className="font-normal text-[18px] text-primaryColor text-center">
          Please wait so that we find the best groups for you.
        </p>
        <div className="flex items-center justify-end  px-10 gap-6 mt-10">
          <Link href={'/'}>
            <Button className="!py-3 !bg-transparent !text-SecondaryColor border">
              Go to homepage
            </Button>
          </Link>

          <Link href={'/hometwo'}>
            <Button className="!py-3">
              Check it out!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Successlogin;

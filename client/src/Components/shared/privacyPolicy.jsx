import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div className='lg:py-20 py-7'>
            <div className="relative">
                <h3 className='text-primaryColor font-semibold lg:text-[59px] text-[8vw] text-center'>
                    Our <span className='text-BtnColor'>commitment</span> to protecting your privacy
                </h3>

                <p className='text-[18px] font-normal text-[#60666C] text-center lg:w-[1260px] w-full mx-auto absolute lg:-left-3'>
                    This policy applies to all information collected through our website, mobile application, and any related services, including coaching sessions, communications, and transactions. By using Coach Finders services, you agree to the collection and use of information in accordance with this policy.
                </p>
            </div>

            <div className="lg:mt-32 mt-64">
                <h3 className='font-normal text-primaryColor text-[18px] '>Updated December 15, 2024</h3>
                <h3 className='font-normal text-primaryColor text-[24px] lg:mt-10 mt-3'>INTRODUCTION</h3>
                <p className='text-[18px] font-normal text-[#60666C] lg:w-[1260px] w-full mt-6'>At Coach Finder, we value and respect your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform. We are committed to maintaining the trust and confidence of our users, coaches, and visitors while providing transparent information about our data practices.</p>
            </div>
            <div className="mt-10">
                <h3 className='font-normal text-primaryColor text-[24px] mt-10'>INFORMATION WE COLLECT</h3>
                <ul className='list-disc ml-7'>
                    <li className='text-[18px] font-normal text-[#60666C] list-item pt-2'>Personal Information: Name, email, phone number, location</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Professional Information: Career details, goals, coaching preferences</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Account Information: Login credentials, profile data</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Usage Data: Platform interactions, coaching session records</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Payment Information: Payment method details (processed securely through third-party providers)</li>
                </ul>
            </div>
            <div className="mt-10">
                <h3 className='font-normal text-primaryColor text-[24px] mt-10'>HOW WE USE YOUR INFORMATION</h3>
                <ul className='list-disc ml-7'>
                    <li className='text-[18px] font-normal text-[#60666C] list-item pt-2'>Match you with suitable coaches</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Improve our services and user experience</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Process payments and transactions</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Send relevant communications and updates</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Maintain platform security</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Comply with legal obligations</li>
                </ul>
            </div>
            <div className="mt-10">
                <h3 className='font-normal text-primaryColor text-[24px] mt-10'>YOUR RIGHTS - You can:</h3>
                <ul className='list-disc ml-7'>
                    <li className='text-[18px] font-normal text-[#60666C] list-item pt-2'>Access your personal data</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Request corrections</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Delete your account</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Opt out of marketing communications</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Export your data</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item '>Submit privacy concerns</li>
                </ul>
            </div>
            <div className="mt-10">
                <h3 className='font-normal text-primaryColor text-[24px] mt-10'>COOKIES AND TRACKING</h3>
                <h4 className='font-normal text-primaryColor text-[16px] mt-6'>We use cookies and similar technologies to:</h4>
                <ul className='list-disc ml-7'>
                    <li className='text-[18px] font-normal text-[#60666C] list-item pt-2'>Improve user experience</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Analyze platform usage</li>
                    <li className='text-[18px] font-normal text-[#60666C] list-item py-2'>Remember preferences <br /> You can manage cookie preferences through your browser settings.</li>
                </ul>
            </div>
            <div className="mt-10">
                <h3 className='font-normal text-primaryColor text-[24px] mt-10'>CONTACT US</h3>
                <h4 className='font-normal text-primaryColor text-[16px] mt-6'>We use cookies and similar technologies to:</h4>
                <ul className='list-disc ml-7'>
                    <li className='text-[18px] font-normal text-[#60666C] list-item pt-2'>Privacy concerns:<a href="mailto:privacy@coachfinder.com" className='text-BtnColor underline pl-1'>privacy@coachfinder.com</a></li>

                    <li className='text-[18px] font-normal text-[#60666C] list-item pt-2'>Data requests:<a href="mailto:data@coachfinder.com" className='text-BtnColor underline pl-1'>data@coachfinder.com</a></li>
                </ul>
            </div>
            <div className="mt-10">
                <h3 className='font-normal text-primaryColor text-[24px] mt-10'>UPDATES</h3>
                <h4 className='font-normal text-[#60666C] text-[18px] mt-6'>We reserve the right to update this policy. Users will be notified of significant changes.
                </h4>

            </div>
        </div>
    )
}

export default PrivacyPolicy
 
"use client"
import PageTitle from '@/app/naim/Component/pageTitle'
import React, { useState } from 'react'
import Button from './shared/button'
import PrivacyPolicy from './shared/privacyPolicy';
import CookiePolicy from './shared/cookiePolicy';
import TermsOfService from './shared/termsOfService';

const PrivacyPolicyMainPage = () => {
  const [active, setactive] = useState(1);
  const list = [
    {
      id: 1,
      name: "Privacy Policy",
    },
    {
      id: 2,
      name: "Cookies Policy",
    },
    {
      id: 3,
      name: "Terms & Conditions",
    },
  ];

  const data = [
    {
      id: 1,
      name: <PrivacyPolicy />,
    },
    {
      id: 2,
      name: <CookiePolicy />,
    },
    {
      id: 3,
      name: < TermsOfService />,
    },
  ];

  return (
    <section className=''>
      <PageTitle text={`Privacy & Policy`} />
      <div className="container">

        <div className="flex gap-3 lg:mt-[110px] mt-10 justify-center">
          {
            list.map((el) => (
              <div key={el.id}>
                <Button onClick={() => setactive(el.id)} className={`!bg-transparent !px-1 ${active == el.id ? "!text-BtnColor underline" : "!text-primaryColor "} `}>
                  {el.name}
                </Button >
              </div>
            ))
          }
        </div>

        {
          data.map((el) => {
            if (active == el.id) {
              return (
                <div key={el.id}>{el.name}</div>
              )
            }
          })
        }

      </div>
    </section >
 
  )
}

export default PrivacyPolicyMainPage
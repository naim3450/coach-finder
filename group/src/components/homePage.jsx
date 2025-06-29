"use client"
import Header from './header'
import WeWork from './weWork'
import SomethingsGreat from './somethingsGreat'
import CustomarSay from './customarSay'
import SubscriptionPopUp from './shared/subscriptionPopUp'
import Priceing from './priceing'


const HomePage = () => {

  return (
    <>
      <Header />
      <WeWork />
      <CustomarSay />
      <Priceing />
      <SomethingsGreat />
      {/* <SubscriptionPopUp/> */}
    </>
  )
}

export default HomePage  

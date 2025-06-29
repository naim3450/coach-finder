import React from 'react'
import Header from './header'
import FeturedCategories from './feturedCategories'
import PeerGroup from './peerGroup'
import Works from './works'
import Reviews from './reviews'
import Blog from './blog'
import Subscribe from './subscribe'
 

const HomePage = () => {
  return (
    <>
      
      <Header />
      <FeturedCategories />
      <PeerGroup />
      <Works /> 
      <Reviews />
      <Blog />
      <Subscribe />
    </>
  )
} 

export default HomePage
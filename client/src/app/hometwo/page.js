"use client"
import Navbar from '@/Components/navbar'
import Davidwlc from '@/Components/shared/davidwlc'
import RecommendedFor from '@/Components/shared/recommendedFor'
import React from 'react'
import Questions from '../naim/Component/questions'
import FeturedCategories from '@/Components/feturedCategories'
import PeerGroup from '@/Components/peerGroup'
import Works from '@/Components/works'
import Reviews from '@/Components/reviews'
import Blog from '@/Components/blog'
import Subscribe from '@/Components/subscribe'
import Footer from '@/Components/footer'
import Menu from '@/Components/shared/menu'

const HomeTwo = () => {
  return (
    <>
      <Navbar />
      <Menu />
      <Davidwlc />
      <RecommendedFor />
      <div>
        <div>
          <h3 className='font-bold text-[40px] text-primaryColor text-center py-10'>Frequently Asked Questions</h3>
        </div>
        <Questions className={`!container`} />
      </div>
      <FeturedCategories />
      <PeerGroup />
      <Works />
      <Reviews />
      <Blog />
      <Subscribe />
      <Footer />
    </>
  )
}

export default HomeTwo
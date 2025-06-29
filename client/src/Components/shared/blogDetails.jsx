"use client"
import React from 'react';
import PageTitle from '@/app/naim/Component/pageTitle';
import Image from 'next/image';
import G_details_pro from '../../assets/g_details_pro.png';
import Dot from '../../assets/dot.svg';
import Blog_intro_img from "../../assets/blog_intro_img.png";
import Line from './line';
import { BiLinkAlt } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Link from 'next/link';
import BlogCard from './blogCard';
import Blog_one from "../../assets/blog_one.jpg";
import Blog_two from "../../assets/blog_two.jpg";
import Blog_three from "../../assets/blog_three.jpg";
// import Blog_p_one from "../../assets/blog_p_one.png";
// import Blog_p_three from "../../assets/blog_p_three.png";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/react-splide/css";
import { cards } from '../../../data/Data';

const BlogDetails = ({ obj }) => {
    console.log(obj);


    return (
        <div className='mt-5'>
            <PageTitle text={"Blog Details"} />
            <div className="container mt-6">
                <h3 className='text-[32px] italic text-[#0D0D0E]'>How To Write an Application Letter (With Examples)</h3>

                <div className="flex mt-7">
                    
                        
                        <div className="">
                             
                            <div className="flex gap-x-4">
                                <p className='font-normal text-[14px] text-[#0D0D0E] opacity-40'> {obj.date}</p>
                                <Image
                                    src={Dot}
                                    alt='Dot'
                                />
                                <p className='font-normal text-[14px] text-[#0D0D0E] opacity-40'>{obj.readingTime}</p>
                            </div>
                        </div>
                  
                </div>
                <div className="mt-9">
                    <h3 className='italic text-[24px] text-[#0D0D0E]'>Introduction</h3>
                    <p className='font-normal text-[14px] text-[#0D0D0E] opacity-60 lg:w-[1200px] w-full pt-3'>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[310px]">
                    <p className='italic text-[18px] text-[#0D0D0E] opacity-60  lg:w-[725px] w-full pt-40'>{obj.description}</p>
                    <div className="shadow-md px-4 pt-4 pb-5 rounded-[8px]">
                        <Image
                            src={obj.image}
                            alt='Blog_intro_img'
                        />
                        <div className="flex gap-x-4">
                            <Line className="mt-4" />
                            <p className='font-medium text-[14px] text-[#0D0D0E] pt-4'> {obj.category}</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h3 className='font-bold text-[#0D0D0E] text-xl opacity-80 pt-7'>{obj.title} </h3>
                    <p className='font-normal text-[#0D0D0E] text-base opacity-60 pt-3'>Collaboratively deploy intuitive partnerships whereas customized e-markets. Energistically maintain performance based strategic theme areas whereas just in time methodologies. Phosfluorescently drive functionalized intellectual capital and.</p>
                    <div className="flex gap-x-4 py-8">
                        <Line className="mt-6" />
                        <p className='font-normal text-[14px] text-[#0D0D0E] opacity-60 pt-4'>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus.</p>
                    </div>
                    <div className="">
                        <p className='font-normal text-[14px] text-[#0D0D0E] opacity-60'>Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.</p>
                        <h3 className='text-[24px] italic text-[#0D0D0E] pt-6'>Conclusion</h3>


                        <p className='font-normal text-[14px] text-[#0D0D0E] opacity-60 pt-6 lg:w-[1150px] w-full '>Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p>
                        <p className='font-normal text-[14px] text-[#0D0D0E] opacity-60 pt-6 lg:w-[1150px] w-full'>Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.</p>
                        <p className='font-normal text-[14px] text-[#0D0D0E] opacity-60 pt-6 lg:w-[1160px] w-full'>Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.</p>
                    </div>
                    <div className="mt-16">
                        <h3 className='font-extrabold text-[20px] text-primaryColor '>Share this post</h3>
                        <div className="flex  items-center gap-5 mt-4">
                            <Link href="#" className="flex items-center justify-center h-8 w-8 bg-[#F4F4F4] rounded-full">
                                <BiLinkAlt className="text-[#0075C8] text-[18px]" />
                            </Link>
                            <Link href="#" className="flex items-center justify-center h-8 w-8 bg-[#F4F4F4] rounded-full">
                                <FaLinkedin className="text-[#2231BC] text-[18px]" />
                            </Link>
                            <Link href="#" className="flex items-center justify-center h-8 w-8 bg-[#F4F4F4] rounded-full">
                                <FaTwitter className="text-[#1DA1F2] text-[18px]" />
                            </Link>
                            <Link href="#" className="flex items-center justify-center h-8 w-8 bg-[#F4F4F4] rounded-full">
                                <FaFacebookF className="text-[#2058CD] text-[18px]" />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            {/* slider start */}

            <div className="bg-BgColor mt-20 py-10">
                <div className="container text-center">
                    <h3 className="text-primaryColor font-extrabold text-[48px]">
                        Resent and Blog
                    </h3>
                    <p className="text-primaryColor text-base font-medium  ">
                        Get the latest news, updates and tips
                    </p>
                </div>
                <div className="container ">
                    <div className="my-10 xl:block hidden">
                        <Splide
                            options={{
                                type: "loop",
                                perPage: 3,
                                perMove: 1,
                                arrows: false,
                                pagination: true,
                                gap: 10,
                            }}
                            aria-label="My Favorite Images"
                        >
                            {

                                cards.map((el, idx) => {

                                    return (
                                        <SplideSlide key={idx}>
                                            <BlogCard
                                                srcmain={el.image}
                                                title={el.category}
                                                h3text={el.title}
                                                h4text={el.category}
                                                description={el.description.slice(0, 160)}
                                                date={el.date}
                                                time={el.readingTime}
                                                src3={el.imagetwo}
                                            />
                                        </SplideSlide>
                                    )
                                })
                            }



                        </Splide>
                    </div>

                    {/* md part start  */}
                    <div className="my-10 xl:hidden hidden md:block">
                        <Splide
                            className=""
                            options={{
                                type: "loop",
                                perPage: 2,
                                perMove: 1,
                                arrows: false,
                                pagination: true,
                                gap: 10,
                            }}
                            aria-label="My Favorite Images"
                        >
                            {

                                cards.map((el, idx) => {

                                    return (
                                        <SplideSlide key={idx}>
                                            <BlogCard
                                                srcmain={el.image}
                                                title={el.category}
                                                h3text={el.title}
                                                h4text={el.category}
                                                description={el.description.slice(0, 160)}
                                                date={el.date}
                                                time={el.readingTime}
                                                src3={el.imagetwo}
                                            />
                                        </SplideSlide>
                                    )
                                })
                            }

                        </Splide>
                    </div>
                    {/* md part end  */}

                    {/* sm part start  */}
                    <div className="my-10 md:hidden block">
                        <Splide
                            className=""
                            options={{
                                type: "loop",
                                perPage: 1,
                                perMove: 1,
                                arrows: false,
                                pagination: true,
                                gap: 10,
                            }}
                            aria-label="My Favorite Images"
                        >
                            {

                                cards.map((el, idx) => {

                                    return (
                                        <SplideSlide key={idx}>
                                            <BlogCard
                                                srcmain={el.image}
                                                title={el.category}
                                                h3text={el.title}
                                                h4text={el.category}
                                                description={el.description.slice(0, 160)}
                                                date={el.date}
                                                time={el.readingTime}
                                                src3={el.imagetwo}
                                            />
                                        </SplideSlide>
                                    )
                                })
                            }
                        </Splide>
                    </div>
                    {/* sm part end */}
                </div>
            </div>


        </div>
    )
}

export default BlogDetails
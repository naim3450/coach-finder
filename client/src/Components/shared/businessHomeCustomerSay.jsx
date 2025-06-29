"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import audi from '../../assets/audi.png'

const testimonials = [
  {
    quote: "The Best Coach Site",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Carter",
    location: "San Francisco, CA",
    avatar: "",
    bgColor: "bg-teal-500",
  },
  {
    quote: "They Providing Great Services",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Carter",
    location: "San Francisco, CA",
    avatar: "",
    bgColor: "bg-yellow-500",
  },
  {
    quote: "Amazing Coach Platform",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Valentina",
    location: "San Francisco, CA",
    avatar: "",
    bgColor: "bg-blue-500",
  },
  {
    quote: "Money Transfer So Easy",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Cena",
    location: "San Francisco, CA",
    avatar: "",
    bgColor: "bg-red-500",
  },
];

const BusinessHomeCustomerSay = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">What our customers say</h2>
        <p className="text-gray-600">
          We are providing our clients two cards for their one mission and
          finance.
        </p>
      </div>
      <Splide
        options={{
          type: "loop",
          perPage: 2,
          gap: "1rem",
          pagination: false,
          arrows: true,
          breakpoints: {
            768: { perPage: 1 },
          },
        }}
        className="container mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SplideSlide key={index}>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <blockquote className="mb-4">
                <p className="text-lg font-semibold text-gray-800">
                  {testimonial.quote}
                </p>
                <p className="text-gray-600 mt-2">{testimonial.text || 'No text available'}</p>
              </blockquote>
              <div className="flex items-center mt-6">
                <div
                  className={`w-12 h-12 rounded-full overflow-hidden ${testimonial.bgColor}`}
                >
                  <Image
                    src={testimonial.avatar || audi}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800 font-medium">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location || 'Location unknown'}</p>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default BusinessHomeCustomerSay;

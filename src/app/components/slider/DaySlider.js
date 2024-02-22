"use client";
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

export default function DaySlider({ data, selectedDate, onClick }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data.length < 6 ? data.length : 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          playspeed: 9000,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],

  };
  return (
    <Slider {...settings}>
      {
        data.map((value, index) => {
          return (
            <div key={index} className={`${value.date == selectedDate?.date ? 'text-black bg-white' : 'text-white'} text-center my-4  border-solid border-r-2 border-[#3B3B3B] cursor-pointer`}
              onClick={() => { onClick(value) }}
            >
              <p className='font-semibold text-lg	 '>{value.monthDay} {value.monthName}</p>
              <p className=' '>{value.dayName}</p>
              <h4 className='text-2xl	font-bold'>AED {value.lowestPrice}</h4>

            </div>
          )
        })
      }


    </Slider>
  )
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={` absolute top-[35%] right-[-25px] cursor-pointer w-10 h-10 rounded-full text-white text-3xl hidden sm:flex justify-center items-center border border-white`}
      onClick={onClick}
    >
      <MdOutlineArrowForwardIos size={25} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={` absolute z-10 top-[35%] left-[-30px] cursor-pointer w-10 h-10 rounded-full text-white text-3xl hidden sm:flex justify-center items-center border border-white`}
      onClick={onClick}
    >
      <MdOutlineArrowBackIos size={25} />
    </div>
  );
}

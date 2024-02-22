"use client";
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from 'react-icons/fa6';
import { TiStarFullOutline } from 'react-icons/ti';
import { useRouter } from 'next/navigation';
export default function CenteredSlider({ data }) {
    var settings2 = {
        dots: false,
        infinite: true,
        centerMode: true,
        centerPadding: '0px',
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    playspeed: 9000,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],


    };

    const router = useRouter();
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? <TiStarFullOutline size={18} key={i} className="text-yellow-400" /> : <TiStarFullOutline size={18} key={i} className="text-gray-300" />
            );
        }
        return stars;
    };
    function handleCardClick(id) {
        router.replace('/pages/detail?id=' + id)
    }
    return (

        <div className='py-6'>

            <div className='w-full desert-slider text-white  rounded-xl px-2'>

                <Slider {...settings2}>
                    {data &&
                        data.map((buggy, index) => {
                            const imageUrl = buggy.images && buggy.images.length > 0 ? buggy.images[0] : 'default-image-url';
                            return (<div key={index} className="p-3"
                            onClick={()=>{handleCardClick(buggy.id)}}
                            >

                                <div className=' w-full rounded-2xl h-48 flex justify-center items-end slider-div  bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${imageUrl})` }}>
                                    <div className="w-11/12 bg-[#00000099] rounded-t-lg p-2 flex justify-between  ">
                                        <div>
                                            <h4 className='font-bold'>{buggy.name}<span className='text-xs font-normal'></span></h4>
                                            <div>
                                                <span className='text-xs'>{buggy.distance} km</span> <button type="button" className=' text-sm bg-white rounded-full py-2 px-3 text-black'>AED {buggy.lowestPriceOverallDetails.newPrice}</button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <div className='flex space-x-1 text-[#FFC120]'>
                                                    {renderStars(buggy.ratings)}

                                                </div>
                                                <span className='text-xs '>{buggy?.ratings?.length} Ratings</span>
                                            </div>
                                            <p className='underline  underline-offset-4 text-white'>{buggy?.companyName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        })}

                    {/* <div className="p-3">

                        <div className=' rounded-2xl h-48 flex justify-center items-end slider-div  bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(/assets/images/bg-slider.png)` }}>
                            <div className="w-11/12 bg-[#00000099] rounded-t-lg p-2 flex justify-between  ">
                                <div>
                                    <h4 className='	font-bold'>Get Can - Am X3<span className='text-xs font-normal		'>(10km)</span></h4>
                                    <div>
                                        <span className='text-xs	'>(10km)</span> <button type="button" className=' text-sm bg-white rounded-full py-2 px-3 text-black'>AED 180</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center">

                                        <div className='flex space-x-1 text-[#FFC120]'>
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                        </div>
                                        <span className='text-xs '>655 Ratings</span>
                                    </div>
                                    <p className='underline  underline-offset-4
 text-white'>Desert King Tourism</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">

                        <div className=' rounded-2xl h-48 flex justify-center items-end slider-div  bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(/assets/images/bg-slider.png)` }}>
                            <div className="w-11/12 bg-[#00000099] rounded-t-lg p-2 flex justify-between  ">
                                <div>
                                    <h4 className='	font-bold'>Get Can - Am X3<span className='text-xs font-normal		'>(10km)</span></h4>
                                    <div>
                                        <span className='text-xs	'>(10km)</span> <button type="button" className=' text-sm bg-white rounded-full py-2 px-3 text-black'>AED 180</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center">

                                        <div className='flex space-x-1 text-[#FFC120]'>
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                        </div>
                                        <span className='text-xs '>655 Ratings</span>
                                    </div>
                                    <p className='underline  underline-offset-4
 text-white'>Desert King Tourism</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">

                        <div className=' rounded-2xl h-48 flex justify-center items-end slider-div  bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(/assets/images/bg-slider.png)` }}>
                            <div className="w-11/12 bg-[#00000099] rounded-t-lg p-2 flex justify-between  ">
                                <div>
                                    <h4 className='	font-bold'>Get Can - Am X3<span className='text-xs font-normal		'>(10km)</span></h4>
                                    <div>
                                        <span className='text-xs	'>(10km)</span> <button type="button" className=' text-sm bg-white rounded-full py-2 px-3 text-black'>AED 180</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center">

                                        <div className='flex space-x-1 text-[#FFC120]'>
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                        </div>
                                        <span className='text-xs '>655 Ratings</span>
                                    </div>
                                    <p className='underline  underline-offset-4
 text-white'>Desert King Tourism</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">

                        <div className=' rounded-2xl h-48 flex justify-center items-end slider-div  bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(/assets/images/bg-slider.png)` }}>
                            <div className="w-11/12 bg-[#00000099] rounded-t-lg p-2 flex justify-between  ">
                                <div>
                                    <h4 className='	font-bold'>Get Can - Am X3<span className='text-xs font-normal		'>(10km)</span></h4>
                                    <div>
                                        <span className='text-xs	'>(10km)</span> <button type="button" className=' text-sm bg-white rounded-full py-2 px-3 text-black'>AED 180</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center">

                                        <div className='flex space-x-1 text-[#FFC120]'>
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                            <FaStar size={12} />
                                        </div>
                                        <span className='text-xs '>655 Ratings</span>
                                    </div>
                                    <p className='underline  underline-offset-4
 text-white'>Desert King Tourism</p>
                                </div>
                            </div>
                        </div>
                    </div> */}



                </Slider>
            </div>
        </div>
    )
}
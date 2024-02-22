"use client";
import React, { useState } from 'react'
import sun from '../../../../public/assets/images/sun.png'
import booking from '../../../../public/assets/images/booking.png'
import { FaCirclePlus, FaStar } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function CartItem ({data , buggyDetails , date , decrementQuantity , incrementQuantity , index , slotQuantities}){
    const [count, setCount] = useState(1)
    const router = useRouter();
    function handleSubmit(){
        localStorage.setItem('bookingDetails',JSON.stringify({buggyDetails,quantity:slotQuantities[index],totalPrice,slotDetails:data}));
        router.push('/pages/order-summary')
    }
    const totalPrice = data['New Price'] * slotQuantities[index];
    return (
        <div className='border-solid border-2 border-[#3B3B3B] rounded-md flex flex-col md:flex-row mt-4  '>
            <div className='text-white text-center flex items-center w-full md:w-1/2 px-8 md:px-0 justify-center	 p-4 border-solid border-r-2 border-[#3B3B3B]'>
                <div>

                    <p className='font-semibold text-xs	 '>{date.monthDay} {date.monthName}</p>

                    <h4 className='text-2xl	font-semibold'>{data['Start Time']}</h4>
                </div>
                <Image src={sun} className='mx-3 w-36 md:w-48' alt="w8" />
                <div>

                    <p className='font-semibold text-xs	 '>{date.monthDay} {date.monthName}</p>

                    <h4 className='text-2xl	font-semibold'>{data['End Time']}</h4>
                </div>

            </div>
            <div className='text-white text-center flex items-center w-full md:w-[14%] justify-center p-4 border-solid border-r-2 border-[#3B3B3B]'>
                <FaCircleMinus size={25} className='cursor-pointer' onClick={() => decrementQuantity(index)} /><span className='mx-5 font-semibold text-xl'>{slotQuantities[index]}</span>
                <FaCirclePlus size={25} className='cursor-pointer' onClick={() => incrementQuantity(index)} /> 
            </div>
            <div className='text-white text-center flex items-cente w-full	md:w-[17%] justify-center p-4 border-solid border-r-2  border-[#3B3B3B]'>
                <div>

                    <p className=' text-xs font-semibold'>{buggyDetails.companyName}</p>
                    <div className='flex justify-center mt-1 space-x-2 text-[#FFC120]'>
                        <IoStar size={20} />
                        <IoStar size={20} />
                        <IoStar size={20} /><IoStar size={20} />
                        <IoStar size={20} />
                    </div>
                </div>

            </div>
            <div className='text-white text-center flex items-center w-full md:w-[15%] justify-center p-4 border-solid border-r-2 border-[#3B3B3B]'>

                <h4 className='text-xl	font-bold'>AED {totalPrice}</h4>


            </div>
            <div className='text-white text-center flex  items-center p-4 px-2 w-full md:w-[13%] justify-center border-solid border-[#3B3B3B]'>
                <div onClick={handleSubmit} className='cursor-pointer'>
                    <div className="flex justify-center">

                        <Image src={booking} width={46} height={46} alt="w8" />
                    </div>
                    <p className='mt-1 text-xs font-semibold'>Book Now</p>
                </div>


            </div>
        </div>
    )
}


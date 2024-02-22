import Image from "next/image";
import Link from "next/link";
import cmj from '../../../../public/assets/images/cmj.png'
import { RiFacebookBoxFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";

export default function Footer() {
    return (
        <div className="w-full  h-auto md:h-[380px] flex flex-col md:flex-row justify-between items-center mt-20 bg-[#1A1A1A] ">
            <div className="w-full 2xl:w-[95%] 2xl:mx-auto h-full flex flex-col md:flex-row justify-between items-center pb-8">

                <div className="w-full md:w-[25%] h-full flex flex-row md:flex-col justify-between pt-8 pb-1 md:ps-9 px-9">
                    <div>
                        <Link href="/">
                            <Image src={cmj} alt='image' className='h-[47px] w-[94px]' />
                        </Link>
                    </div>
                    <div className="flex flex-row items-center gap-3 ">
                        <Link href='https://www.facebook.com/' target="_blank">
                            <div className="border border-[#ffff9b33] w-[35px] py-1 flex justify-center items-center rounded-full cursor-pointer">
                                <RiFacebookBoxFill size={17} color="#ffffff" />
                            </div>
                        </Link>
                        <Link href='https://www.instagram.com/' target="_blank">
                            <div className="border border-[#ffff9b33] w-[35px] py-1 flex justify-center items-center rounded-full cursor-pointer"><BsInstagram size={15} color="#ffffff" /></div>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-[55%] h-full ps-9 md:ps-0 pt-8 flex flex-row justify-center md:justify-between bg-transparent text-white gap-3 bg-[#131313]">
                    <div className="w-1/3 sm:w-1/2 h-full flex flex-col gap-8">
                        <h1 className={`text-base font-medium`}>Catalog</h1>
                        <div className="flex flex-col gap-2 py-3">
                            <Link href="/pages/privacy-policy" >
                                <p className="text-xs font-medium">Privacy Policy</p>
                            </Link>
                            <Link href="/pages/user-agreement" >
                                <p className="text-xs font-medium">User Agreement</p>
                            </Link>
                            {/* <Link href="/pages/about" >
                            <p className="text-xs font-medium">About Us</p>
                        </Link> */}
                            <Link href="/pages/contact" >
                                <p className="text-xs font-medium">Contact Us</p>
                            </Link>
                            <Link href="/pages/booking" >
                                <p className="text-xs font-medium">Book Buggy</p>
                            </Link>
                        </div>
                        <hr className="bg-[#14447C] w-10 mt-4 mb-1 border-t-[#14447C] h-[2px]" />
                        <div className="flex flex-col gap-2 pb-3">
                            <p className="text-xs font-medium">+7 (411) 390-51-11</p>
                            <p className="text-xs font-medium">info@companyemail.com</p>
                        </div>
                    </div>
                    <div className="w-1/3 sm:w-1/2 h-full flex flex-col gap-8">
                        <h1 className={`text-base font-medium`}>Services</h1>
                        <div className="flex flex-col gap-2 py-3">
                            <Link href="/#exclusive" >
                                <p className="text-xs font-medium">Exclusive Offers</p>
                            </Link>
                            <p className="text-xs font-medium">VIP Offers</p>
                            <p className="text-xs font-medium">Regular Offers</p>
                        </div>

                    </div>
                    <div className="w-1/3 sm:w-1/2 h-full flex flex-col gap-8">
                        <h1 className={`text-base font-medium`}>About</h1>
                        <div className="flex flex-col gap-2 py-3">
                            <Link href="/pages/about" >
                                <p className="text-xs font-medium">About Us</p>
                            </Link>
                            <p className="text-xs font-medium">News</p>
                            <p className="text-xs font-medium">Partners</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[20%] h-full flex flex-row md:flex-col items-end pr-9 justify-between pt-8 pb-1 ps-9">
                    <div>
                        <Link href="/pages/contact" >
                            <div className="bg-[#DB5D23] text-white w-24 h-8 flex justify-center items-center rounded-3xl">
                                <p className="text-xs font-medium">Get in Touch</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1 text-[#717171] ">
                        <p className="text-xs font-medium">
                            © 2021 — CMJ Buggies
                        </p>
                        <p className="text-xs font-medium text-right">All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



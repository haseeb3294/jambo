/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/app/components/navbar/Navbar";
import { Montserrat, Poppins } from 'next/font/google'
import Footer from "@/app/components/footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s1 from '../../../../public/assets/images/s1.png'
import s2 from '../../../../public/assets/images/s2.png'
import s3 from '../../../../public/assets/images/s3.png'
import buggyorrange from '../../../../public/assets/images/buggyorrange.png'
import support from '../../../../public/assets/images/support.png'
import emoji from '../../../../public/assets/images/emoji.png'
import Image from "next/image";


const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function Page() {

    return (
        <div className="flex flex-col w-full h-auto md:px-0">
            <Navbar currentPage={'services'}/>
            <div className={`${poppins.className} w-full h-[40vh] md:h-[60vh] bg-[url(/assets/images/servicesbg.png)] bg-cover bg-center`}>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
                    <h1 className="font-bold text-4xl text-white">Services</h1>
                </div>


            </div>

            <div className={`${poppins.className} w-full h-full md:px-10 flex flex-col justify-center items-center `}>
                <div className="w-full md:w-[60%] pt-8">
                    <h1 className="font-bold text-2xl text-white text-center">Premium Buggies Rental & Limousines Services</h1>
                </div>

                <div className={`w-full md:w-[78%] flex flex-col md:flex-row mt-10`}>
                    <div className="w-full md:w-1/3 flex flex-col gap-3 items-center py-2 px-3">
                        <Image src={buggyorrange} alt='image' className='h-10 w-12' />
                        <h1 className="font-semibold text-xl text-white text-center">Variety of Buggies Brands</h1>
                        <p className="font-medium text-xs text-white text-center">
                            {`Lorem ipsum dolor sit amet, consectadipiscing elit. Aenean commodo ligula eget dolor.`}
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col gap-3 items-center py-2 px-3">
                        <Image src={emoji} alt='image' className='h-10 w-10' />
                        <h1 className="font-semibold text-xl text-white text-center">Best Rate Guarantee</h1>
                        <p className="font-medium text-xs text-white text-center">
                            {`Lorem ipsum dolor sit amet, consectadipiscing elit. Aenean commodo ligula eget dolor.`}
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col gap-3 items-center py-2 px-3">
                        <Image src={support} alt='image' className='h-10 w-10' />
                        <h1 className="font-semibold text-xl text-white text-center">Awesome Customer Support</h1>
                        <p className="font-medium text-xs text-white text-center">
                            {`Lorem ipsum dolor sit amet, consectadipiscing elit. Aenean commodo ligula eget dolor.`}
                        </p>
                    </div>
                </div>
                <div className={`w-full md:w-3/4 h-[90vh] md:h-[70vh] flex flex-col md:flex-row mt-10`}>
                    <div className="w-full md:w-1/2 h-1/2 md:h-full ">
                        <Image src={s1} alt='image' className='h-full w-full' />
                    </div>
                    <div className="w-full md:w-1/2 h-1/2 md:h-full gap-3  flex flex-col justify-center px-8">
                        <h1 className="font-bold text-4xl text-white">Meet Our Team</h1>
                        <p className="font-medium text-sm text-white ">
                            {`In the heart of the desert, where silence and solitude reign, 
                                the buggy's engine echoed, leaving behind a trail of tire tracks 
                                etched in the sands`}
                        </p>
                    </div>
                </div>
                <div className={`w-full md:w-3/4 h-[90vh] md:h-[70vh] flex flex-col md:flex-row-reverse `}>
                    <div className="w-full md:w-1/2 h-full ">
                        <Image src={s2} alt='image' className='h-full w-full' />
                    </div>
                    <div className="w-full md:w-1/2 h-full gap-3  flex flex-col justify-center px-8">
                        <h1 className="font-bold text-4xl text-white">Meet Our Team</h1>
                        <p className="font-medium text-sm text-white ">
                            {`In the heart of the desert, where silence and solitude reign, 
                                the buggy's engine echoed, leaving behind a trail of tire tracks 
                                etched in the sands`}
                        </p>
                    </div>
                </div>
                <div className={`w-full md:w-3/4 h-[90vh] md:h-[70vh] flex flex-col md:flex-row `}>
                    <div className="w-full md:w-1/2 h-full ">
                        <Image src={s3} alt='image' className='h-full w-full' />
                    </div>
                    <div className="w-full md:w-1/2 h-full gap-3  flex flex-col justify-center px-8">
                        <h1 className="font-bold text-4xl text-white">Meet Our Team</h1>
                        <p className="font-medium text-sm text-white ">
                            {`In the heart of the desert, where silence and solitude reign, 
                                the buggy's engine echoed, leaving behind a trail of tire tracks 
                                etched in the sands`}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}
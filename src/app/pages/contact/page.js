/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/app/components/navbar/Navbar";
import { Montserrat, Poppins } from 'next/font/google'
import Footer from "@/app/components/footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function Page() {

    return (
        <div className="flex flex-col w-full h-auto md:px-0">
            <Navbar currentPage={'contact'}/>
            <div className={`${poppins.className} w-full h-[40vh] md:h-[60vh] bg-[url(/assets/images/bgbooking.png)] bg-cover bg-center`}>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
                    <h1 className="font-bold text-4xl text-white">Contact Us</h1>
                </div>


            </div>
            <div className={`${poppins.className} w-full h-full md:px-10 flex flex-col justify-center items-center `}>
                <div className="w-full md:w-[60%] pt-8">
                    <h1 className="font-bold text-2xl text-white text-center">Premium Buggies Rental & Limousines Services</h1>
                </div>
                <form className="w-[98%] md:w-[55%] flex flex-col items-center gap-5 py-16 mt-4" onSubmit={() => {
                    toast.success('We have received your message and will get back to you ASAP! Thank you for your interest.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }}>
                    <div className={`flex flex-row justify-center items-center gap-3 h-[50px] w-[90%] rounded-md  border-[1px] border-[#696969] bg-[#171717]`}>
                        <input required className={'text-white text-sm font-normal w-full h-full bg-transparent pl-3'} placeholder={'Your Name'} />
                    </div>
                    <div className={`flex flex-row justify-center items-center gap-3 h-[50px] w-[90%] rounded-md  border-[1px] border-[#696969] bg-[#171717]`}>
                        <input type="email" required className={'text-white text-sm font-normal w-full h-full bg-transparent pl-3'} placeholder={'Eamil Address'} />
                    </div>
                    <div className={`flex flex-row justify-center items-center gap-3 h-[50px] w-[90%] rounded-md  border-[1px] border-[#696969] bg-[#171717]`}>
                        <input required className={'text-white text-sm font-normal w-full h-full bg-transparent pl-3'} placeholder={'Subject'} />
                    </div>
                    <div className={`flex flex-row justify-center items-center gap-3 h-[180px] w-[90%] rounded-md  border-[1px] border-[#696969] bg-[#171717]`}>
                        <textarea required className={'text-white text-sm font-normal w-full h-full bg-transparent pl-3 py-3'} placeholder={'Enter message here'} />
                    </div>
                    <div className={`flex flex-row justify-end items-center gap-3 h-auto w-[90%]  `}>
                        <button type="submit" className=" md:block bg-[#F77F00] text-white text-xs px-14 py-4 rounded-md"  >Send</button>
                    </div>
                </form>

                <div className={`${poppins.className} w-[100%] md:w-[80%] h-[40vh] md:h-[60vh] bg-[url(/assets/images/contactus.png)] bg-cover bg-center mt-10`}>
                    <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-[#00000091] md:px-10">
                        <h1 className="font-bold text-4xl text-white text-center">Adventure Awaits <br /> Grab Your Buggy Key</h1>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}
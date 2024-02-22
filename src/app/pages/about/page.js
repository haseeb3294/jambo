/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/app/components/navbar/Navbar";
import { Montserrat, Poppins } from 'next/font/google'
import Footer from "@/app/components/footer/Footer";
import jhon from '../../../../public/assets/images/jhon.png'
import doe from '../../../../public/assets/images/doe.png'
import geller from '../../../../public/assets/images/geller.png'
import jane from '../../../../public/assets/images/jane.png'
import TeamMember from "@/app/components/team/TeamMember";



const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function Page() {

    return (
        <div className="flex flex-col mx-auto w-full h-auto md:px-0">
            <Navbar currentPage={'about'} />
            <div className={`${poppins.className} w-full h-[40vh] md:h-[60vh] bg-[url(/assets/images/bgbooking.png)] bg-cover bg-center`}>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
                    <h1 className="font-bold text-4xl text-white">About Us</h1>
                </div>


            </div>
            <div className={`${poppins.className} w-full h-full md:px-10 flex flex-col justify-center items-center`}>
                <div className="w-full md:w-[60%] pt-8">
                    <h1 className="font-bold text-4xl text-white text-center">This adventure isn’t about change but it
                        seems to be an inevitability.</h1>
                </div>
                <div className="w-[90%] md:w-[55%] pt-10 pb-4">
                    <p className="font-medium text-sm text-white text-center">
                        {`In the heart of the desert, where silence and solitude reign, the buggy's engine echoed,
                        leaving behind a trail of tire tracks etched in the sands—a testament to the daring
                        spirit of those who sought the thrill of the buggy's desert escapade.
                        Best of all, everything is easily accessible from the big menu bar. Given that the site is
                        designed to provide information about very distinct categories, it’s essential that visitors
                        can immediately find what they’re looking for.`}
                    </p>
                </div>
                <div className="flex flex-row w-[85%] md:w-2/6 justify-between h-40 items-center">
                    <div >
                        <h1 className="font-bold text-4xl text-[#F77F00] text-center">1,109</h1>
                        <p className="font-medium text-sm text-white text-center mt-2">
                            {`Trips`}
                        </p>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl text-[#F77F00] text-center">7,019</h1>
                        <p className="font-medium text-sm text-white text-center mt-2">
                            {`Happy Customers`}
                        </p>
                    </div>
                </div>
                <div className="w-[80%] md:w-[60%] pt-10">
                    <h1 className="font-bold text-4xl text-white text-center">Meet Our Team</h1>
                </div>
                <div className="w-[80%] md:w-[52%] pt-5 pb-10 mb-2">
                    <p className="font-medium text-sm text-white text-center">
                        {`In the heart of the desert, where silence and solitude reign, the buggy's engine echoed, 
                            leaving behind a trail of tire tracks etched in the sands`}
                    </p>
                </div>
                <div className="w-full md:w-10/12 flex flex-col md:flex-row">
                    <TeamMember name={'Jhon Bannet'} image={jhon} designation={'General Manager'} />
                    <TeamMember name={'Joe Geller'} image={geller} designation={'CEO'} />
                    <TeamMember name={'Oliver Doe'} image={doe} designation={'Engineer'} />
                    <TeamMember name={'Jane Bannet'} image={jane} designation={'Mechanical Engineer'} />
                </div>

            </div>
            <Footer />
        </div>
    )
}
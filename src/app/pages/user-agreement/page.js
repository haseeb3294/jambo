/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/app/components/navbar/Navbar";
import { Montserrat, Poppins } from 'next/font/google'
import Footer from "@/app/components/footer/Footer";
import TeamMember from "@/app/components/team/TeamMember";



const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function Page() {

    return (
        <div className="flex flex-col w-full h-auto md:px-0">
            <Navbar />
            <div className={`${poppins.className} w-full h-[40vh] md:h-[60vh] bg-[url(/assets/images/bgbooking.png)] bg-cover bg-center`}>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
                    <h1 className="font-bold text-4xl text-white">User Agreement</h1>
                </div>


            </div>
            <div className={`${poppins.className} w-full h-full md:px-10 flex flex-col justify-center items-center`}>
                <div className="w-full md:w-[80%] pt-8">
                    <h1 className="font-bold text-4xl text-white ps-4 md:ps-0">User Agreement</h1>
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">1. Acceptance of Terms  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   1.1. By accessing or using our website and services, you agree to these Terms of Service and any additional terms and policies incorporated herein.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">2. Booking and Rental  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   2.1. You must be at least [age] years old to make a booking and rent a buggy through our website.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   2.2. By making a booking, you agree to provide accurate and complete information.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   2.3. Rental Terms: Rental duration, rates, and other terms are detailed on our website and may vary based on the specific rental agreement.`}
                    </p>
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">3. Payment  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   3.1. Payment for bookings is processed through our website using secure payment methods. You agree to pay all fees and charges associated with your bookings.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   3.2. Cancellation and Refunds: Cancellation policies and refund details are outlined on our website and may vary based on the specific booking.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">4. User Conduct  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   4.1. You agree to use our website and services in compliance with applicable laws and regulations.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`  4.2. You will not engage in any fraudulent, harmful, or illegal activities while using our website or services.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   4.3. You agree not to interfere with the security or functionality of our website or services.`}
                    </p>
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">5. Privacy  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   5.1. We collect and use your personal information as described in our Privacy Policy, which is incorporated by reference into these Terms of Service.`}
                    </p>
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">6. Intellectual Property  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   6.1. All content on our website, including text, images, logos, and trademarks, is protected by intellectual property laws. You may not use our content without our prior written consent`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">7. Disclaimers  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   7.1. Our website and services are provided "as is," and we make no warranties or representations regarding their accuracy, availability, or suitability for your purposes.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">8. Limitation of Liability  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   8.1. To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use our website or services.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">9. Indemnification  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   9.1. You agree to indemnify and hold us harmless from any claims, losses, damages, liabilities, and expenses arising out of your use of our website or services or your violation of these Terms of Service.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">10. Changes to Terms  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   10.1. We reserve the right to modify or update these Terms of Service at any time. The revised terms will be posted on our website with the date of the last revision.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">11. Termination  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   11.1. We may terminate your access to our website and services at our discretion, with or without cause, and without notice.`}
                    </p>
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}
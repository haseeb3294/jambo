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
        <div className="flex flex-col w-full h-auto md:px-0">
            <Navbar />
            <div className={`${poppins.className} w-full h-[40vh] md:h-[60vh] bg-[url(/assets/images/privacypolicy.png)] bg-cover bg-center`}>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
                    <h1 className="font-bold text-4xl text-white">Privacy Policy</h1>
                </div>


            </div>
            <div className={`${poppins.className} w-full h-full md:px-10 flex flex-col justify-center items-center`}>
                <div className="w-full md:w-[80%] pt-8">
                    <h1 className="font-bold text-4xl text-white ps-4 md:ps-0">Privacy Policy</h1>
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">1. Information We Collect </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">1.1. Personal Information : {'   '}</span>
                        {'  '}
                        {`  When you use our website or book our services, we may collect personal information, including but not limited to your name, email 
                            address, phone number, billing information, and any other information you provide voluntarily.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">1.2. Usage Data: {'   '}</span>
                        {'  '}
                        {`  We may also collect information about how you interact with our website and services, including IP addresses, browser type, device information, and pages viewed.`}
                    </p>
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">2. How We Use Your Information  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`  We may use the information we collect for the following purposes:`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">2.1. Providing Services: {'   '}</span>
                        {'  '}
                        {`  To process bookings, provide rental services, and respond to your inquiries.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">2.2. Improving Services: {'   '}</span>
                        {'  '}
                        {`  To enhance and personalize your experience on our website, improve our services, and develop new features.`}
                    </p><p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">2.3. Communication: {'   '}</span>
                        {'  '}
                        {`  To communicate with you about your bookings, updates, promotions, and other relevant information.`}
                    </p><p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">2.4. Legal Obligations: {'   '}</span>
                        {'  '}
                        {`  To comply with legal and regulatory requirements.`}
                    </p>
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">3. Information Sharing  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`  We may share your personal information in the following circumstances:`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">3.1. Service Providers: {'   '}</span>
                        {'  '}
                        {`   We may share your information with third-party service providers who assist us in operating our website and providing our services.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">3.2. Legal Requirements: {'   '}</span>
                        {'  '}
                        {`  We may disclose your information if required by law or in response to a valid legal request.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">3.3. Business Transfers: {'   '}</span>
                        {'  '}
                        {`   In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred as part of the transaction.`}
                    </p>
                   
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">4. Cookies and Tracking Technologies  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   We use cookies and similar tracking technologies to collect information about your usage of our website. You can control cookies through your browser settings, but disabling them may affect your experience on our website.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">5. Security  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   We take reasonable steps to protect your personal information from unauthorized access or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">6. Your Choices  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`  You have the right to:`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">6.1. Access and Correct Your Information: {'   '}</span>
                        {'  '}
                        {`   You can access and update your personal information through your account settings.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">6.2. Opt-Out: {'   '}</span>
                        {'  '}
                        {`  You can opt-out of receiving promotional communications from us by following the instructions provided in such communications.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">7. Changes to this Privacy Policy  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`   We may update this Privacy Policy from time to time. The updated policy will be posted on our website with the date of the last revision.`}
                    </p>
                    
                </div>
                <div className="w-[90%] md:w-[80%] pt-10 pb-4">
                    <h1 className="font-bold text-base text-white">8. Location Privacy Policy  </h1>
                    <p className="font-normal text-sm text-white mt-6">
                        {'  '}
                        {`  We may update this Location Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website or through the CMJ Buggy App.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.1. Collection of Location Information: {'   '}</span>
                        {'  '}
                        {`   We collect location information to provide you with location-based services and enhance your experience using the CMJ Buggy App. Location data may be collected when:
                            You use the CMJ Buggy App to locate nearby rental buggy options.
                            You use the CMJ Buggy App to navigate to rental pickup or drop-off locations.
                            You use the CMJ Buggy App to communicate with CMJ representatives, supervisors, or drivers to track the location of rental buggies.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.2. Types of Location Information Collected: {'   '}</span>
                        {'  '}
                        {`  You can opt-out of receiving promotional communications from us by following the instructions provided in such communications.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.3. Types of Location Information Collected: {'   '}</span>
                        {'  '}
                        {`  The types of location information we may collect include:
                            GPS signals.
                            Wi-Fi access points and cell towers.
                            IP addresses and other sensor data from your device.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.4. Use of Location Information: {'   '}</span>
                        {'  '}
                        {` We use location information for the following purposes:
                            To provide you with location-based services, such as finding nearby rental buggies and navigating to rental pickup or drop-off locations.
                            To improve the functionality and features of the CMJ Buggy App.
                            To communicate with CMJ representatives, supervisors, or drivers to track the location of rental buggies.
                            To ensure the safety and security of our users and rental buggies.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.5. Sharing of Location Information: {'   '}</span>
                        {'  '}
                        {`  We may share location information with the following parties:
                            CMJ representatives, supervisors, or drivers to facilitate communication and track the location of rental buggies.
                            Third-party service providers who assist us in providing location-based services.
                            Law enforcement or other governmental agencies in response to a lawful request or legal process.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.6. Protection of Location Information: {'   '}</span>
                        {'  '}
                        {`  We implement appropriate technical and organizational measures to protect location information against unauthorized access, alteration, disclosure, or destruction.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.7. User Controls: {'   '}</span>
                        {'  '}
                        {`  You can control the collection and use of location information through your device settings or the settings within the CMJ Buggy App. However, please note that disabling location services may limit the functionality of the CMJ Buggy App.`}
                    </p>
                    <p className="font-normal text-sm text-white mt-6">
                        <span className="font-bold text-base text-white pe-1">8.8. Contact Us: {'   '}</span>
                        {'  '}
                        {`  If you have any questions or concerns about this Location Privacy Policy or our practices regarding location information, please contact us at support@cmjbuggy.com.
                            By using the CMJ Buggy App, you consent to the collection, use, and sharing of your location information as described in this Location Privacy Policy.`}
                    </p>
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/app/components/navbar/Navbar";
import { Montserrat, Poppins } from 'next/font/google';
import Footer from "@/app/components/footer/Footer";
import Image from "next/image";
import buggyorrange from '../../../../public/assets/images/buggyorrange.png';
import emoji from '../../../../public/assets/images/emoji.png';
import support from '../../../../public/assets/images/support.png';
import s1 from '../../../../public/assets/images/s1.png';
import s2 from '../../../../public/assets/images/s2.png';
import s3 from '../../../../public/assets/images/s3.png';

const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const faqData = [
  {
    question: "1. What is the CMJ Buggy App?",
    answer: 'The CMJ Buggy App is a mobile application designed to streamline bug reporting and tracking for software development projects.',
  },
  {
    question: '2. How does the CMJ Buggy App work?',
    answer: 'The app allows developers to log and monitor bugs efficiently, facilitating communication and resolution within development teams.',
  },
  {
    question: '3. Is the CMJ Buggy App available on multiple platforms?',
    answer: 'Yes, the app is available on both iOS and Android platforms, ensuring accessibility for a wide range of users.',
  },
  {
    question: '4. What features does the CMJ Buggy App offer?',
    answer: 'The app offers features such as bug logging, tracking, assigning tasks, commenting, and prioritizing bugs based on severity.',
  },
  {
    question: '5. Is my data secure within the CMJ Buggy App?',
    answer: 'Yes, the app prioritizes data security and employs measures to safeguard users information.',
  },
  {
    question: '6. Does the CMJ Buggy App access any sensitive information on my device?',
    answer: 'The app may require permissions to access certain information, such as location, for precise bug reporting. However, it ensures transparent communication about data access and usage.',
  },
  {
    question: '7. Can I customize notifications in the CMJ Buggy App?',
    answer: 'Yes, the app allows users to customize notification settings according to their preferences, ensuring they stay updated on bug statuses.',
  },
  {
    question: '8. Is there a collaboration feature in the CMJ Buggy App?',
    answer: 'Yes, the app enables collaboration among team members by allowing them to assign tasks, comment on bugs, and track progress collectively.',
  },
  {
    question: '9. Can I integrate the CMJ Buggy App with other development tools?',
    answer: 'Yes, the app supports integration with various development tools and platforms, enhancing workflow efficiency.',
  },
  {
    question: '10. How often does the CMJ Buggy App receive updates?',
    answer: 'The app receives regular updates to introduce new features, enhance performance, and address any issues reported by users.',
  },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col w-full h-auto md:px-0">
      <Navbar currentPage={'faq'} />
      {/* Header section */}
      <div className={`${poppins.className} w-full h-[40vh] md:h-[60vh] bg-[url(/assets/images/servicesbg.png)] bg-cover bg-center`}>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
          <h1 className="font-bold text-4xl text-white">FAQs</h1>
        </div>
      </div>

      {/* FAQ content section */}
      <div className={`${poppins.className} w-full h-full md:px-10 flex flex-col justify-center items-center`}>
        {faqData.map((faq, index) => (
          <div key={index} className="w-[90%] md:w-[80%] pt-10 pb-4">
            <h1 className="font-bold text-base text-white">{faq.question}</h1>
            <p className="font-normal text-sm text-white mt-6">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Additional content with images */}
      {/* ... (unchanged) */}

      <Footer />
    </div>
  );
}

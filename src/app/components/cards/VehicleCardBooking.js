/* eslint-disable @next/next/no-img-element */
"use client";
import { TiHeartOutline, TiStarFullOutline } from "react-icons/ti";
import { Montserrat } from 'next/font/google'
import { useRouter } from "next/navigation";

const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function VehicleCardBooking({ buggy }) {
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
  const imageUrl = buggy.images && buggy.images.length > 0 ? buggy.images[0] : 'default-image-url';
  function handleSubmit() {
    router.push( '/pages/detail?id='+buggy.id )
  }
  return (
    // <div className={`w-[340px] h-[400px] bg-[url(/assets/images/slide1.png)] bg-cover `}
    // >
    <div onClick={handleSubmit}
      className="rounded-lg w-full md:w-[31%] cursor-pointer h-[380px] relative overflow-hidden"
    >
      <img src={imageUrl} alt="slider" className="absolute w-full h-full z-0 top-0 left-0 object-cover" />
      <div className="flex flex-col-reverse text-white absolute w-full h-full z-0 top-0 left-0 bg-gradient-to-b from-[#00000000] to-[#000000cc] rounded-md px-5 gap-3 pb-4">        <div className='flex flex-row items-baseline gap-4'>
        <h1 className={`${monteserrat.className} text-[27px] font-bold`}>AED {buggy.lowestPriceOverallDetails.newPrice}</h1>
        <p className={`${monteserrat.className} text-[10px] font-normal`}>For Limited Time</p>

      </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row justify-center items-center gap-2'>
              <div className='flex flex-row '>
              {renderStars(buggy.ratings)}

              </div>
              <p className={`${monteserrat.className} text-[10px] font-normal`}>{buggy?.ratings?.length} Ratings</p>
            </div>
            <p className={`${monteserrat.className} text-[10px] font-normal underline`}>{buggy?.companyName}</p>
          </div>
          <div className={`${monteserrat.className} w-11 h-11 flex justify-center items-center rounded-full border-2 border-white`}>
            <TiHeartOutline size={21} color='#fff' />

          </div>
        </div>
        <div className='flex flex-row justify-between'>
          <h1 className={`${monteserrat.className} text-sm font-bold`}>{buggy?.name} - {buggy?.model}</h1>
          <div className={`${monteserrat.className} w-12 bg-[#ffffff45] flex justify-center items-center rounded-2xl font-semibold text-xs`}>{buggy.distance}</div>
        </div>

      </div>
    </div>
  )
}

"use client"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TiHeartOutline, TiStarFullOutline } from "react-icons/ti";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { Montserrat } from 'next/font/google'
import VehicleCard from '../cards/VehicleCard';
import VehicleCardSmall from '../cards/VehicleCardSmall';

const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

const CardSliderSmall = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    centerPadding: '0px',
    autoplaySpeed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],

  };

  return (
    <div className="relative w-full h-full ps-4 ">
      <Slider {...settings} className='sm:pt-12 sm:pb-2 bg-none w-full h-full'>
        {data.map((buggy) => (
          <VehicleCardSmall key={buggy.id} 
          // imageUrl={product['Plate No With Images'] &&
          //   Object.keys(product['Plate No With Images']).length > 0
          //   ? product['Plate No With Images'][Object.keys(product['Plate No With Images'])[0]]
          //   : 'defaultValue'} 
              buggy={buggy}
            />
        ))}
      </Slider>
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={` absolute top-[-1%] right-[3%] cursor-pointer w-10 h-10 rounded-full text-white text-3xl hidden sm:flex justify-center items-center border border-white`}
      onClick={onClick}
    >
      <MdOutlineArrowForwardIos size={20} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={` absolute z-10 top-[-1%] right-[10%] cursor-pointer w-10 h-10 rounded-full text-white text-3xl hidden sm:flex justify-center items-center border border-white`}
      onClick={onClick}
    >
      <MdOutlineArrowBackIos size={20} />
    </div>
  );
}

export default CardSliderSmall;

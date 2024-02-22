"use client"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TiHeartOutline, TiStarFullOutline } from "react-icons/ti";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { Montserrat } from 'next/font/google'
import VehicleCard from '../cards/VehicleCard';

const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

const CardSlider = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data.length >= 3 ? 3:data.length,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],

  };

  return (
    <div className="relative w-full h-full ps-4 bg-none">
      <Slider {...settings} className='p-0 bg-none'>
        {data.map((buggy) => (
          <VehicleCard key={buggy.id}
            buggy={buggy}
          // imageUrl={product['Plate No With Images'] &&
          //   Object.keys(product['Plate No With Images']).length > 0
          //   ? product['Plate No With Images'][Object.keys(product['Plate No With Images'])[0]]
          //   : 'defaultValue'} 
          //     detail={product}
          />
        ))}
      </Slider>
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={` absolute top-[43%] right-[-10px] lg:right-[-15px] cursor-pointer w-16 h-16 rounded-full text-white text-3xl hidden sm:flex justify-center items-center border border-white`}
      onClick={onClick}
    >
      <MdOutlineArrowForwardIos size={25} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={` absolute z-10 top-[43%] left-[-25px] lg:left-[-30px] cursor-pointer w-16 h-16 rounded-full text-white text-3xl hidden sm:flex justify-center items-center border border-white`}
      onClick={onClick}
    >
      <MdOutlineArrowBackIos size={25} />
    </div>
  );
}

export default CardSlider;

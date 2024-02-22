/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/app/components/navbar/Navbar";
import Image from "next/image";
import dashboardfg from '../../public/assets/images/dashboardfg.png'
import timeforadventure from '../../public/assets/images/timeforadventure.png'
import timeforadventure2 from '../../public/assets/images/timeforadventure2.png'
import { Poppins, Racing_Sans_One, Montserrat, Krona_One } from 'next/font/google'
import { HiOutlineLocationMarker, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoArrowForwardSharp } from "react-icons/io5";
import CardSlider from "@/app/components/slider/CardSlider";
import VehicleCard from "@/app/components/cards/VehicleCard";
import Footer from "@/app/components/footer/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from './lib/firebase/firebase.config';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import CardSliderSmall from "@/app/components/slider/CardSliderSmall";
import BuggyModel from "@/app/lib/models/buggyModel";
import CompanyModel from "@/app/lib/models/CompanyModel";
import VehicleCardPopular from "./components/cards/VehicleCardPopular";



const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const racing_sans_one = Racing_Sans_One({ subsets: ['latin'], weight: ['400'] })
const krona_One = Krona_One({ subsets: ['latin'], weight: ['400'] })


export default function Page() {
    const router = useRouter();
    function handleSubmit() {
        router.push('/pages/booking')
    }
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [seatingCapacities, setSeatingCapacities] = useState([]);
    const [selectedType, setSelectedType] = useState('ATV');
    // Fetch types and seats from Firebase
    const fetchTypesAndSeats = async () => {
        const querySnapshot = await getDocs(collection(db, 'Types'));
        let fetchedTypes = [];
        let fetchedSeats = [];
        querySnapshot.forEach((doc) => {
            fetchedTypes.push(doc.data().Name);
            fetchedSeats = [...fetchedSeats, ...doc.data()['Seat Names']];
        });
        // Set the types and seats
        setVehicleTypes(fetchedTypes);
        setSeatingCapacities([...new Set(fetchedSeats)]); // Remove duplicates
        // Set default selections
        if (fetchedTypes.length > 0) {
            setSelectedType(fetchedTypes.sort()[0]);
        }
    };
    useEffect(() => {
        fetchTypesAndSeats();
    }, []);
    const [buggies, setBuggies] = useState();
    const [buggiesFiltered, setBuggiesFiltered] = useState();
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [vehicleDD, setVehicleDD] = useState(false);
    const [durationDD, setDurationDD] = useState(false);
    const [timeDD, setTimeDD] = useState(false);
    const [vehicleDDValue, setVehicleDDValue] = useState('Vehicle');
    const [durationDDValue, setDurationDDValue] = useState('Duration');
    const [timeDDValue, setTimeDDValue] = useState('Time of the Day');
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user);
            if (!user) {

            } else {
                console.log(user)
                setUser(user)
            }
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);
    const fetchCompanyDetails = async (companyUid) => {
        const companyRef = doc(db, 'Companies', companyUid);
        const companySnapshot = await getDoc(companyRef);

        if (companySnapshot.exists()) {
            const companyData = companySnapshot.data();
            return new CompanyModel(companyData);
        } else {
            console.error('Company not found for UID:', companyUid);
            return null;
        }
    };
    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true); // Start loading
            if (userLocation && userLocation.latitude && userLocation.longitude) {
                const querySnapshot = await getDocs(collection(db, 'offRoadVehicles'));
                let fetchedVehicles = [];
                for (const doc of querySnapshot.docs) {
                    const buggy = new BuggyModel({ ...doc.data(), id: doc.id }, userLocation.latitude, userLocation.longitude);
                    if (buggy.isApproved) {
                        // const company = await fetchCompanyDetails(buggy.companyUid);
                        // if (company) {
                        //     buggy.companyName = company.name; // Add the company name to the buggy object
                        // }
                        fetchedVehicles.push(buggy);
                    }
                }
                setBuggies(fetchedVehicles);
                setLoading(false); // End loading
            }
            else
            {
                const querySnapshot = await getDocs(collection(db, 'offRoadVehicles'));
                let fetchedVehicles = [];
                for (const doc of querySnapshot.docs) {
                    const buggy = new BuggyModel({ ...doc.data(), id: doc.id }, 31.4224922, 73.1249715);
                    if (buggy.isApproved) {
                        // const company = await fetchCompanyDetails(buggy.companyUid);
                        // if (company) {
                        //     buggy.companyName = company.name; // Add the company name to the buggy object
                        // }
                        fetchedVehicles.push(buggy);
                    }
                }
                setBuggies(fetchedVehicles);
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [userLocation]);

    useEffect(() => {
        filterBuggies();
    }, [buggies, selectedType])

    function filterBuggies() {
        setLoading(true);
        if (selectedType && buggies) {
            setBuggiesFiltered(buggies.filter((value) =>
                value.type == selectedType
            ))
        }
        setLoading(false)
    }

    function handleChangeType(type) {
        setSelectedType(type)
    }
    useEffect(()=>{
        const generateQRCode = async () => {
            const value = 124144443 + '+START'
            try {
              const response = await fetch('https://cmjbuggy.com/api/generateQRCode', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  data: value
                }),
              });
              const data = await response.json();
              if (!response.ok) {
                throw new Error('Failed to generate QR code');
              }
            } catch (error) {
              console.error('Error generating QR code:', error);
            }
          };
          generateQRCode()
    },[])
    return (
        <div className="flex flex-col">
            <Navbar currentPage={'home'} />
            <div className={`w-full h-full lg:h-[80vh] bg-[url(/assets/images/dashboardbg2.png)] bg-cover bg-center`}>
                <div className="flex flex-col lg:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
                    <div className="w-full lg:w-[60%] h-full md:h-[73%] flex flex-col justify-center  text-white px-6 gap-6 mt-20 lg:mt-0">
                        <h1 className={`${racing_sans_one.className} text-4xl md:text-[73px] font-bold`}>
                            Buggy Adventures
                        </h1>
                        <div className="w-10/12">
                            <p className={`${poppins.className} theme-text fw-500 mt-1 leading-[19px] text-white`}>
                                {" Its oversized, knobby tires left imprints on the shifting sands, carving a trail of adventure across the undulating terrain."}
                            </p>
                        </div>
                        <div className="w-full md:w-11/12 h-auto md:h-[93px] bg-[#ffffffb3] rounded flex flex-col md:flex-row px-3 py-3 gap-4 md:gap-0">
                            <div className={`${poppins.className} w-full md:w-[28%] h-full px-1 flex justify-center items-center relative`}>
                                <div className="banner-dropdown w-full h-[40px] rounded-md flex flex-row overflow-hidden items-center" onClick={() => { setVehicleDD(!vehicleDD) }}>
                                    <div className="w-full h-10 banner-dropdown flex items-center ps-3 rounded-md cursor-pointer"><p className="text-[13px] font-medium text-[#858585]">{vehicleDDValue}</p></div>
                                    {
                                        vehicleDD ? <FaCaretUp size={21} color="#A3A3A3" /> :
                                            <FaCaretDown size={21} color="#A3A3A3" />}
                                </div>
                                <div className={`w-[95%] h-auto absolute z-10 top-14 rounded-lg ${vehicleDD ? 'flex' : 'hidden'} flex-col  banner-dropdown `}>
                                    <div className="w-full h-10 flex items-center ps-3"><p className="text-[13px] font-medium text-[#858585]">Vehicle</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setVehicleDDValue('ATV'); setVehicleDD(!vehicleDD) }}><p className="text-[13px] font-medium text-[#858585]">ATV</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setVehicleDDValue('UTV'); setVehicleDD(!vehicleDD) }}><p className="text-[13px] font-medium text-[#858585]">UTV</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setVehicleDDValue('Dune Buggy'); setVehicleDD(!vehicleDD) }}><p className="text-[13px] font-medium text-[#858585]">Dune Buggy</p></div>
                                </div>
                            </div>
                            <div className={`${poppins.className} w-full md:w-[28%] h-full px-1 flex justify-center items-center relative`}>
                                <div className="banner-dropdown w-full h-[40px] rounded-md flex flex-row overflow-hidden items-center" onClick={() => { setDurationDD(!durationDD) }}>
                                    <div className="w-full h-10 banner-dropdown flex items-center ps-3 rounded-md cursor-pointer"><p className="text-[13px] font-medium text-[#858585]">{durationDDValue}</p></div>
                                    {
                                        durationDD ? <FaCaretUp size={21} color="#A3A3A3" /> :
                                            <FaCaretDown size={21} color="#A3A3A3" />}
                                </div>
                                <div className={`w-[95%] h-auto absolute z-10 top-14 rounded-lg ${durationDD ? 'flex' : 'hidden'} flex-col banner-dropdown`}>
                                    <div className="w-full h-10 flex items-center ps-3"><p className="text-[13px] font-medium text-[#858585]">Duration</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setDurationDDValue('One Hour'); setDurationDD(!durationDD) }}><p className="text-[13px] font-medium text-[#858585]">One Hour</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setDurationDDValue('Two Hours'); setDurationDD(!durationDD) }}><p className="text-[13px] font-medium text-[#858585]">Two Hours</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setDurationDDValue('Three Hours'); setDurationDD(!durationDD) }}><p className="text-[13px] font-medium text-[#858585]">Three Hours</p></div>
                                </div>
                            </div>
                            <div className={`${poppins.className} w-full md:w-[28%] h-full px-1 flex justify-center items-center relative`} >
                                <div className="banner-dropdown w-full h-[40px] rounded-md flex flex-row overflow-hidden items-center" onClick={() => { setTimeDD(!timeDD) }}>
                                    <div className="w-full h-10 banner-dropdown flex items-center ps-3 rounded-md cursor-pointer"><p className="text-[13px] font-medium text-[#858585]">{timeDDValue}</p></div>
                                    {
                                        timeDD ? <FaCaretUp size={21} color="#A3A3A3" /> :
                                            <FaCaretDown size={21} color="#A3A3A3" />
                                    }
                                </div>
                                <div className={`w-[95%] h-auto absolute z-10 top-14 rounded-lg ${timeDD ? 'flex' : 'hidden'} flex-col  banner-dropdown `}>
                                    <div className="w-full h-10 flex items-center ps-3"><p className="text-[13px] font-medium text-[#858585]">Time of the day</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setTimeDDValue('Morning'); setTimeDD(!timeDD) }}><p className="text-[13px] font-medium text-[#858585]">Morning</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setTimeDDValue('Afternoon'); setTimeDD(!timeDD) }}><p className="text-[13px] font-medium text-[#858585]">Afternoon</p></div>
                                    <div className="w-full h-10 flex items-center ps-3 cursor-pointer" onClick={() => { setTimeDDValue('Night'); setTimeDD(!timeDD) }}><p className="text-[13px] font-medium text-[#858585]">Night</p></div>
                                </div>
                            </div>
                            <div className="w-full md:w-[16%] h-full flex justify-center items-center cursor-pointer" onClick={handleSubmit}>
                                <div className='h-14 w-14 bg-[#FFC120] rounded-full flex justify-center items-center' >
                                    <IoArrowForwardSharp size={23} color="#000" />

                                </div>

                            </div>
                        </div>

                        <div className="w-11/12">
                            <p className={`${poppins.className} leading-[19px] theme-text fw-500 text-white`}>
                                {" In the heart of the desert, where silence and solitude reign, the buggy's engine echoed, leaving behind a trail of tire tracks etched in the sands—a testament to the daring spirit of those who sought the thrill of the buggy's desert escapade."}
                            </p>
                        </div>

                    </div>
                    <div className={`w-full px-6 pb-4 md:pb-0 md:px-6 lg:w-[30%] flex flex-col justify-center items-center ${poppins.className} md:pl-4 md:pr-9 gap-4`}>
                        <div className="w-full flex flex-col justify-center ">

                            <h1 className="text-white banner-right">
                                Dubai Desert
                            </h1>
                            {/* <p className="text-xs text-white">
                                Its oversized, knobby tires left imprints on the shifting
                                sands, carving a trail of adventure across the undulating
                                terrain.
                            </p> */}
                        </div>
                        <div className="w-full flex flex-row items-center gap-3">
                            <HiOutlineLocationMarker size={22} color="#fff" />
                            <h1 className="text-white banner-right-inner">
                                Desert King
                            </h1>
                        </div>
                        <p className="theme-text fw-500 text-white">
                            Its oversized, knobby tires left imprints on the shifting
                            sands, carving a trail of adventure across the undulating
                            terrain.
                        </p>
                        <Image src={dashboardfg} alt='image' className='h-[40%] w-full object-contain' />

                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center text-white">
                {
                    vehicleTypes && vehicleTypes.sort().map((value, index) => {
                        return (

                            <div key={index} className={`${poppins.className} p-2 md:p-8 text-[20px] leading-[30px] border-b-2 cursor-pointer  ${selectedType == value ? 'border-[#FFC120]' : 'border-white'}`} onClick={() => { handleChangeType(value) }}>
                                {value}
                            </div>
                        )
                    })
                }
                {/* <div className={`p-2 md:p-8 border-b-2 cursor-pointer ${selectedType == 'Dune Buggies' ? 'border-[#FFC120]' : 'border-white'}`} onClick={() => { handleChangeType('Dune Buggies') }}> Dune Buggies </div>
                <div className={`p-2 md:p-8 border-b-2 cursor-pointer ${selectedType == 'MX Bike' ? 'border-[#FFC120]' : 'border-white'}`} onClick={() => { handleChangeType('MX Bike') }}>MX Bike</div>
                <div className={`p-2 md:p-8 border-b-2 cursor-pointer ${selectedType == 'Adventure' ? 'border-[#FFC120]' : 'border-white'}`} onClick={() => { handleChangeType('Adventure') }}>Adventure</div> */}
            </div>
            <div className="w-full h-auto flex justify-center items-center pt-24">
                <div className="sm:ps-0 w-full sm:w-[80%] bg-transparent">
                    {
                        loading ?
                            <div className="w-full h-full flex flex-row gap-4" >
                                <div className="border border-blue-300 shadow rounded-md p-4 md:w-[31%] h-[380px]">
                                    <div className="animate-pulse flex flex-col w-full h-full gap-3">
                                        <div className="rounded-xl bg-slate-200 h-3/4 w-full"></div>
                                        <div className="flex flex-col space-y-6 py-1 w-full">
                                            <div className="h-2 bg-slate-200 rounded w-full"></div>
                                            <div className="space-y-3 w-full">
                                                <div className="grid grid-cols-3 gap-4 w-full">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2 w-full"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1 w-full"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-blue-300 shadow rounded-md p-4 md:w-[31%] h-[380px]">
                                    <div className="animate-pulse flex flex-col w-full h-full gap-3">
                                        <div className="rounded-xl bg-slate-200 h-3/4 w-full"></div>
                                        <div className="flex flex-col space-y-6 py-1 w-full">
                                            <div className="h-2 bg-slate-200 rounded w-full"></div>
                                            <div className="space-y-3 w-full">
                                                <div className="grid grid-cols-3 gap-4 w-full">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2 w-full"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1 w-full"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-blue-300 shadow rounded-md p-4 md:w-[31%] h-[380px]">
                                    <div className="animate-pulse flex flex-col w-full h-full gap-3">
                                        <div className="rounded-xl bg-slate-200 h-3/4 w-full"></div>
                                        <div className="flex flex-col space-y-6 py-1 w-full">
                                            <div className="h-2 bg-slate-200 rounded w-full"></div>
                                            <div className="space-y-3 w-full">
                                                <div className="grid grid-cols-3 gap-4 w-full">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2 w-full"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1 w-full"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : buggiesFiltered && buggiesFiltered.length > 0 ? <CardSlider data={buggiesFiltered} />
                                :
                                <div className="w-[97%] h-full py-8 ps-4 ms-4 text-white border border-white">
                                    <h1 className={`${krona_One.className} text-4xl font-normal`}>We are sorry No Buggies in this category.</h1>
                                </div>
                    }
                </div>
            </div>
            <div id="hashid" className="w-full h-auto flex flex-row justify-center items-center py-14">
                <div className="w-[80%] h-auto py-6 px-4 flex flex-col lg:flex-row justify-between bg-transparent text-white gap-3">
                    <div className="w-full lg:w-[20%] h-full ">
                        <h1 className={`${krona_One.className} text-4xl font-normal`}> Popular Buggies</h1>
                    </div>
                    <div className="w-full lg:w-[68%] h-full pt-2 flex flex-wrap">
                        <p className={`${poppins.className} text-[14px] font-medium`}>{"In the heart of the desert, where silence and solitude reign, the buggy's engine echoed, leaving behind a trail of tire tracks etched in the sands—a testament to the daring spirit of those who sought the thrill of the buggy's desert escapade."}</p>
                    </div>
                    <div className="w-full lg:w-[12%] h-full cursor-pointer" onClick={() => { router.push('/pages/booking') }}>
                        <h1 className={`${monteserrat.className} text-3xl font-bold`}>Explore</h1>
                        <div className="flex flex-row justify-between items-center">
                            <h1 className={`${monteserrat.className} text-3xl font-bold`}>More</h1>
                            <HiOutlineArrowNarrowRight size={25} color="#FFC120" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-screen sm:w-full h-auto flex flex-col justify-center items-center">
                {
                    loading ?
                        <div className="w-[80%] h-full flex flex-row gap-4 relative z-10" >
                            <div className="border border-blue-300 shadow rounded-md p-4 md:w-[31%] h-[380px]">
                                <div className="animate-pulse flex flex-col w-full h-full gap-3">
                                    <div className="rounded-xl bg-slate-200 h-3/4 w-full"></div>
                                    <div className="flex flex-col space-y-6 py-1 w-full">
                                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                                        <div className="space-y-3 w-full">
                                            <div className="grid grid-cols-3 gap-4 w-full">
                                                <div className="h-2 bg-slate-200 rounded col-span-2 w-full"></div>
                                                <div className="h-2 bg-slate-200 rounded col-span-1 w-full"></div>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-blue-300 shadow rounded-md p-4 md:w-[31%] h-[380px]">
                                <div className="animate-pulse flex flex-col w-full h-full gap-3">
                                    <div className="rounded-xl bg-slate-200 h-3/4 w-full"></div>
                                    <div className="flex flex-col space-y-6 py-1 w-full">
                                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                                        <div className="space-y-3 w-full">
                                            <div className="grid grid-cols-3 gap-4 w-full">
                                                <div className="h-2 bg-slate-200 rounded col-span-2 w-full"></div>
                                                <div className="h-2 bg-slate-200 rounded col-span-1 w-full"></div>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-blue-300 shadow rounded-md p-4 md:w-[31%] h-[380px]">
                                <div className="animate-pulse flex flex-col w-full h-full gap-3">
                                    <div className="rounded-xl bg-slate-200 h-3/4 w-full"></div>
                                    <div className="flex flex-col space-y-6 py-1 w-full">
                                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                                        <div className="space-y-3 w-full">
                                            <div className="grid grid-cols-3 gap-4 w-full">
                                                <div className="h-2 bg-slate-200 rounded col-span-2 w-full"></div>
                                                <div className="h-2 bg-slate-200 rounded col-span-1 w-full"></div>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        buggies &&
                        <>
                            <div className="hidden lg:flex flex-row ps-2 gap-4 relative z-10 w-[80%]">
                                <div className="w-1/3">

                                    <VehicleCardPopular
                                        // imageUrl={buggies[0]['Plate No With Images'] &&
                                        //     Object.keys(buggies[0]['Plate No With Images']).length > 0
                                        //     ? buggies[0]['Plate No With Images'][Object.keys(buggies[0]['Plate No With Images'])[0]]
                                        //     : 'defaultValue'}
                                        buggy={buggies[0]} />
                                </div>
                                <div className="w-1/3">

                                    <VehicleCardPopular
                                        // imageUrl={buggies[1]['Plate No With Images'] &&
                                        //     Object.keys(buggies[1]['Plate No With Images']).length > 0
                                        //     ? buggies[1]['Plate No With Images'][Object.keys(buggies[1]['Plate No With Images'])[0]]
                                        //     : 'defaultValue'}
                                        buggy={buggies[1]} />
                                </div>
                                <div className="w-1/3">

                                    <VehicleCardPopular
                                        // imageUrl={buggies[2]['Plate No With Images'] &&
                                        //     Object.keys(buggies[2]['Plate No With Images']).length > 0
                                        //     ? buggies[2]['Plate No With Images'][Object.keys(buggies[2]['Plate No With Images'])[0]]
                                        //     : 'defaultValue'}
                                        buggy={buggies[2]} />
                                </div>
                            </div>
                        </>
                }
                <div className={`w-screen sm:w-full h-auto lg:h-[150vh] lg:h-[140vh] bg-[url(/assets/images/bg2.png)] bg-cover bg-center sm:mt-[-4%]`}>
                    <div className="flex flex-col justify-center items-center bg-[#0000008c] w-full h-full text-white pb-8">
                        <div className="w-[80%] h-[auto] lg:h-[5%] hidden sm:flex flex-row "></div>
                        <div className="w-full sm:w-[80%] h-[50%]  flex flex-col lg:flex-row ">
                            <div className=" w-full lg:w-[40%] h-full pt-12 px-2">
                                <Image src={timeforadventure} alt="timeforadventure" className="h-full w-full" />
                            </div>
                            <div className="w-full lg:w-[60%] h-full px-4 pt-12 flex flex-col gap-4 mb:6 sm:mb-0">
                                <h1 className={`${krona_One.className} text-4xl font-normal`}>Time  for an adventure</h1>
                                <p className={`${poppins.className} adventure-text`}>{"In the heart of the desert, where silence and solitude reign, the buggy's engine echoed, leaving behind a trail of tire tracks etched in the sands—a testament to the daring spirit of those who sought the thrill of the buggy's desert escapade.Best of all, everything is easily accessible from the big menu bar. Given that the site is designed to provide information about very distinct categories, it’s essential that visitors can immediately find what they’re looking for."}</p>
                            </div>
                        </div>
                        <div className="w-[80%] h-[45%] hidden md:flex flex-col-reverse lg:flex-row ">
                            <div className="w-full lg:w-[60%] h-full px-8 pt-12 flex flex-col justify-center lg:text-right gap-4">
                                <h1 className={`${krona_One.className} text-4xl font-normal`}>Time for an adventure</h1>
                                <p className={`${poppins.className} adventure-text`}>{"In the heart of the desert, where silence and solitude reign, the buggy's engine echoed, leaving behind a trail of tire tracks etched in the sands—a testament to the daring spirit of those who sought the thrill of the buggy's desert escapade.Best of all, everything is easily accessible from the big menu bar. Given that the site is designed to provide information about very distinct categories, it’s essential that visitors can immediately find what they’re looking for."}</p>
                            </div>
                            <div className="w-full lg:w-[40%] h-full pt-12 px-2">
                                <Image src={timeforadventure2} alt="timeforadventure2" className="h-full w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="exclusive" className="w-full h-auto flex flex-col justify-center items-center pt-10">
                <div className="flex flex-col lg:flex-row gap-6 w-[90%] sm:w-[80%]">
                    <div className="flex flex-col text-white gap-6 w-[90%] lg:w-[25%] justify-center">
                        <div className="h-[18%]"></div>
                        <h1 className={`${krona_One.className} text-4xl font-normal`}>Exclusive 1 - Hour Offers</h1>
                        <p className={`${poppins.className} text-[14px] font-medium`}>{"In the heart of the desert, where silence and solitude reign, the buggy's engine echoed, leaving behind a trail of tire tracks etched in the sands—a testament to the daring spirit of those who sought the thrill of the buggy's desert escapade."}</p>
                    </div>
                    <div className="flex flex-col w-full lg:w-[75%] ">
                        {buggies && <CardSliderSmall data={buggies} />}
                        {/* <div className="h-1/12 w-full flex flex-row-reverse py-3 px-8 gap-3">

                            <div className={` cursor-pointer w-8 h-8 rounded-full text-white text-3xl flex justify-center items-center border border-white`}
                            >
                                <MdOutlineArrowForwardIos size={17} />
                            </div>
                            <div className={`cursor-pointer w-8 h-8 rounded-full text-white text-3xl flex justify-center items-center border border-white`}
                            >
                                <MdOutlineArrowBackIos size={17} />
                            </div>
                        </div>
                        <div className="w-full flex flex-col sm:flex-row gap-3">
                            <VehicleCardSmall imageUrl={'url(/assets/images/slide3.png)'} />
                            <VehicleCardSmall imageUrl={'url(/assets/images/slide2.png)'} />
                            <VehicleCardSmall imageUrl={'url(/assets/images/slide3.png)'} />
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex flex-row justify-center items-center mt-20">
                <div className=" w-[90%] sm:w-[80%] h-auto pt-6 flex flex-col justify-between bg-transparent text-white gap-3">
                    <div className="w-full h-auto ">
                        <h1 className={`${krona_One.className} text-4xl font-normal`}>Exclusive 2 - Hour Offers</h1>
                    </div>
                    <div className="w-full sm:w-[75%] h-full pt-2 flex flex-wrap">
                        <p className={`${poppins.className} text-[14px] font-medium`}>{"In the heart of the desert, where silence and solitude reign, the buggy's engine echoed, leaving behind a trail of tire tracks etched in the sands—a testament to the daring spirit of those who sought the thrill of the buggy's desert escapade."}</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex justify-center items-center pt-8">
                <div className="w-full sm:ps-0 sm:w-[82%] bg-transparent">
                    {buggies && <CardSlider data={buggies} />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

;

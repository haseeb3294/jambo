/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import VehicleCardBooking from "@/app/components/cards/VehicleCardBooking";
import Navbar from "@/app/components/navbar/Navbar";
import { Montserrat } from 'next/font/google'
import { FaCaretDown } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TiStarFullOutline } from "react-icons/ti";
import Calendar from "@/app/components/calendar/Calendar";
import Footer from "@/app/components/footer/Footer";
import { useState, useEffect } from "react";
import { db } from '../../lib/firebase/firebase.config';
import { collection, getDocs, doc, getDoc, query, limit, startAfter, orderBy } from "firebase/firestore";
import BuggyModel from "@/app/lib/models/buggyModel";
import CompanyModel from "@/app/lib/models/CompanyModel";
import CalendarNew from "@/app/components/calendar/CalenderNew";


const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function Page() {
    const [buggies, setBuggies] = useState();
    const [buggiesFiltered, setBuggiesFiltered] = useState();
    const [selectedType, setSelectedType] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedCapacity, setSelectedCapacity] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [minPrice, setminPrice] = useState(100);
    const [maxPrice, setmaxPrice] = useState(10000);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);
    const [renderedBuggies, setRenderedBuggies] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [seatingCapacities, setSeatingCapacities] = useState([]);

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
    const fetchVehicles = async () => {
        var querySnapshot;
        setLoading(true); // Start loading
        if (userLocation && userLocation.latitude && userLocation.longitude) {

            querySnapshot = await getDocs(query(collection(db, 'offRoadVehicles')));
            let fetchedVehicles = [];
            for (const doc of querySnapshot.docs) {
                if (!doc.id) {
                    break;
                } else {
                    console.log(' buggy id', doc.id)
                    const buggy = new BuggyModel({ ...doc.data(), id: doc.id }, userLocation.latitude, userLocation.longitude);
                    const availableSlots = BuggyModel.getAvailableSlotsWithLowestPrice(buggy.schedule);
                    if (buggy.isApproved && availableSlots.length > 0) {
                        // const company = await fetchCompanyDetails(buggy.companyUid);
                        // if (company) {
                        //     buggy.companyName = company.name; // Add the company name to the buggy object
                        // }
                        fetchedVehicles.push(buggy);
                    }
                }

            }
            setBuggies(fetchedVehicles);
            setBuggiesFiltered(fetchedVehicles)
            setLoading(false); // End loading

        }
        else
        {

            querySnapshot = await getDocs(query(collection(db, 'offRoadVehicles')));
            let fetchedVehicles = [];
            for (const doc of querySnapshot.docs) {
                if (!doc.id) {
                    break;
                } else {
                    console.log(' buggy id', doc.id)
                    const buggy = new BuggyModel({ ...doc.data(), id: doc.id }, 31.4224922, 73.1249715);
                    const availableSlots = BuggyModel.getAvailableSlotsWithLowestPrice(buggy.schedule);
                    if (buggy.isApproved && availableSlots.length > 0) {
                        // const company = await fetchCompanyDetails(buggy.companyUid);
                        // if (company) {
                        //     buggy.companyName = company.name; // Add the company name to the buggy object
                        // }
                        fetchedVehicles.push(buggy);
                    }
                }

            }
            setBuggies(fetchedVehicles);
            setBuggiesFiltered(fetchedVehicles)
            setLoading(false); // End loading
        }
    };
    useEffect(() => {
        fetchVehicles();
    }, [userLocation]);
    function filterBuggies() {
        setCurrentIndex(0);
        setEndIndex(9)
        if (selectedCapacity, selectedType, minPrice, maxPrice) {
            setBuggiesFiltered(buggies.filter((value) => {
                // Check if the property is defined and not null for each condition
                const priceCondition = (minPrice !== null && maxPrice !== null) ? (value.lowestPriceOverall > minPrice && value.lowestPriceOverall < maxPrice) : true;
                const typeCondition = (selectedType !== null) ? (value.type === selectedType) : true;
                const capacityCondition = (selectedCapacity !== null) ? (value.seats === selectedCapacity) : true;
                const ratingCondition = (selectedRating !== null) ? (value.ratings === selectedRating) : true;

                // Combine the conditions with logical OR (||)
                return priceCondition && typeCondition && capacityCondition && ratingCondition ;
            }))
        }
    }

    function handleShowMore() {
        const remainingItems = buggiesFiltered.length - currentIndex;
        setEndIndex(currentIndex + Math.min(9, remainingItems) + 9);
        setCurrentIndex(currentIndex + 9);
    }

    useEffect(() => {
        // Initial rendering of the first batch
        if (buggiesFiltered) {
            setRenderedBuggies(buggiesFiltered.slice(currentIndex, endIndex));
        }
    }, [buggiesFiltered, currentIndex, endIndex]);

    const fetchTypesAndSeats = async () => {
        const querySnapshot = await getDocs(collection(db, 'Types'));
        let fetchedTypes = [];
        let fetchedSeats = [];
        querySnapshot.forEach((doc) => {
            fetchedTypes.push(doc.data().Name);
            fetchedSeats.push({ [doc.data().Name]: doc.data()['Seat Names'] })
        });
        // Set the types and seats
        setVehicleTypes(fetchedTypes);
        setSeatingCapacities([...new Set(fetchedSeats)]); // Remove duplicates
        // Set default selections

    };
    useEffect(() => {
        fetchTypesAndSeats();
    }, []);

    function clearFilters() {
        setBuggiesFiltered(buggies)
        setSelectedCapacity(null);
        setSelectedType(null);
        setSelectedRating(null);
        setminPrice(100);
        setmaxPrice(10000);
    }
    return (
        <div className="flex flex-col w-full h-auto px-3 md:px-0">
            <Navbar />
            <div className={` w-full h-full md:h-[60vh] bg-[url(/assets/images/bgbooking.png)] bg-cover bg-center`}>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full bg-gradient-to-b from-[#00000066] to-[#121212] via-[#00000030] md:px-10">
                    <h1 className={`${monteserrat.className} font-bold text-4xl text-white `}>Book Now</h1>
                </div>


            </div>
            <div className="w-full h-full md:px-10">
                <div className="w-full py-8 sm:ps-20 text-white">
                    <h1 className={`${monteserrat.className} text-xl font-bold`}> Home | Filters</h1>
                </div>
                <hr className="w-full" />
                <div className="w-full h-auto flex flex-col lg:flex-row gap-8 pt-8">
                    <div className={`${monteserrat.className} w-full lg:w-1/4 h-auto border border-[#ffffff40] rounded-md text-white pt-4`}>
                        <div className="flex flex-col gap-3 w-full px-4">
                            <div className="flex flex-row justify-between items-center">

                                <h1 className={`${monteserrat.className} text-xs font-bold`}>Categories</h1>
                                <button className={`${monteserrat.className} text-xs font-bold bg-[#1C1C1C] rounded-2xl p-3`} onClick={clearFilters}>Clear</button>
                            </div>
                            <div className="border border-[#ffffff40] w-full h-[60px] md:h-12 rounded-md flex flex-row overflow-hidden items-center">
                                <select value={selectedType} onChange={e => {setSelectedType(e.target.value);setSelectedCapacity(null)}} className="text-xs w-full h-full px-2 me-2 outline-0 text-white bg-transparent" >
                                    <option value={null} selected={!selectedType ? true : ''} className="p-4 text-black">Please Select One of the following</option>
                                    {
                                        vehicleTypes && vehicleTypes.sort().map((value, index) => {
                                            return (
                                                <option key={index} value={value} className="p-4 text-black">{value}</option>
                                            )
                                        })
                                    }

                                </select>
                                {/* <FaCaretDown size={13} color="#D9D9D940" /> */}
                            </div>
                            {
                                selectedType &&
                                <div className={`bg-[#1C1C1C] rounded-2xl ${selectedType?.length <= 3 ? 'w-[30%]' : selectedType?.length <= 7 ? 'w-[40%]' : 'w-[50%]'} h-6 flex flex-row justify-between items-center`}>
                                    <div className="w-[80%] flex justify-center items-center">
                                        <h1 className="text-xs w-auto font-medium">{selectedType ? selectedType : ''}</h1>
                                    </div>
                                    <div className="w-[20%] flex justify-center items-center pr-1"><RiCloseFill size={18} color="#fff" /></div>
                                </div>
                            }
                        </div>
                        <hr className="w-100 my-4 bg-[#ffffff40] h-[1px]" />
                        <div className="flex flex-col gap-3 w-full px-4 py-2">
                            <h1 className={`${monteserrat.className} text-xs font-bold mb-4`}>Price</h1>
                            <Slider min={100} max={10000} value={[minPrice, maxPrice]} range styles={{ track: { backgroundColor: 'blue', height: 2 } }} onChange={(value) => { setminPrice(value[0]); setmaxPrice(value[1]) }} />
                            <div className=" rounded-2xl w-full flex flex-row justify-between items-center">
                                <div className="border border-[#ffffff40] rounded-md p-3 w-24 flex justify-center">
                                    <h1 className={`${monteserrat.className} text-xs font-medium`}>AED {minPrice}</h1>
                                </div>
                                <div className="border border-[#ffffff40] rounded-md p-3 w-24 flex justify-center">
                                    <h1 className={`${monteserrat.className} text-xs font-medium`}>AED {maxPrice}</h1>
                                </div>
                            </div>
                        </div>
                        <hr className="w-100 my-4 bg-[#ffffff40] h-[1px]" />
                        <div className="flex flex-col gap-3 w-full ps-4 py-2">
                            <h1 className={`${monteserrat.className} text-xs font-bold mb-3`}>Reviews</h1>
                            <div className=" rounded-2xl w-full flex flex-row justify-between items-center">
                                <div className='flex flex-row '>
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                </div>
                                <div className=" w-24 flex justify-center cursor-pointer" onClick={() => { setSelectedRating(5) }}>
                                    <div className="flex items-center justify-center w-5 h-5 border rounded-full ">
                                        {selectedRating == 5 ? <div className={` bg-gray-300 w-[90%] h-[90%] rounded-full`}></div> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className=" rounded-2xl w-full flex flex-row justify-between items-center">
                                <div className='flex flex-row '>
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                </div>
                                <div className=" w-24 flex justify-center cursor-pointer" onClick={() => { setSelectedRating(4) }}>
                                    <div className="flex items-center justify-center w-5 h-5 border rounded-full ">
                                        {selectedRating == 4 ? <div className={` bg-gray-300 w-[90%] h-[90%] rounded-full`}></div> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className=" rounded-2xl w-full flex flex-row justify-between items-center">
                                <div className='flex flex-row '>
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                </div>
                                <div className=" w-24 flex justify-center cursor-pointer" onClick={() => { setSelectedRating(3) }}>
                                    <div className="flex items-center justify-center w-5 h-5 border rounded-full ">
                                        {selectedRating == 3 ? <div className={` bg-gray-300 w-[90%] h-[90%] rounded-full`}></div> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className=" rounded-2xl w-full flex flex-row justify-between items-center">
                                <div className='flex flex-row '>
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                </div>
                                <div className=" w-24 flex justify-center cursor-pointer" onClick={() => { setSelectedRating(2) }}>
                                    <div className="flex items-center justify-center w-5 h-5 border rounded-full ">
                                        {selectedRating == 2 ? <div className={` bg-gray-300 w-[90%] h-[90%] rounded-full`}></div> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className=" rounded-2xl w-full flex flex-row justify-between items-center">
                                <div className='flex flex-row '>
                                    <TiStarFullOutline size={23} color='#FFC120' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                    <TiStarFullOutline size={23} color='#2D2D2D' />
                                </div>
                                <div className=" w-24 flex justify-center cursor-pointer" onClick={() => { setSelectedRating(1) }}>
                                    <div className="flex items-center justify-center w-5 h-5 border rounded-full ">
                                        {selectedRating == 1 ? <div className={` bg-gray-300 w-[90%] h-[90%] rounded-full`}></div> : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="w-100 my-4 bg-[#ffffff40] h-[1px]" />
                        <div className="flex flex-col gap-3 w-full px-4 py-2">
                            <h1 className={`${monteserrat.className} text-xs font-bold mb-4`}>Select Date</h1>
                            <CalendarNew />

                        </div>
                        <hr className="w-100 my-4 bg-[#ffffff40] h-[1px]" />
                        <div className="flex flex-col gap-3 w-full px-4 py-2">
                            <h1 className="text-xs font-bold mb-4">How many Seats</h1>
                            <div className="border border-[#ffffff40] w-full h-[60px] md:h-12 rounded-md flex flex-row overflow-hidden items-center mb-4">
                                <select value={selectedCapacity} onChange={e => setSelectedCapacity(e.target.value)} placeholder="One-Seater" className="text-xs w-full h-full px-2 me-2 outline-0 text-white bg-transparent" >
                                    <option value={null} className="p-4 text-black">Please select one of the following</option>
                                    {
                                        selectedType && seatingCapacities.length > 0 && seatingCapacities.find(obj => Object.keys(obj)[0] === selectedType)[selectedType].map((value, index) => {
                                            return (
                                                <option key={index} value={value} className="p-4 text-black">{value}</option>
                                            )
                                        })
                                    }

                                </select>
                                {/* <FaCaretDown size={13} color="#D9D9D940" /> */}
                            </div>
                            <button onClick={filterBuggies} className={`flex flex-row justify-center items-center gap-3 w-full h-14 rounded-[10px] bg-[#F77F00]`}>
                                <span className="text-white text-base font-normal">Search</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-[75%] h-auto  flex flex-row flex-wrap gap-4 sm:ps-6 pe-0">
                        {
                            loading ?
                                <>
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
                                </>
                                :
                                renderedBuggies?.length > 0 ? renderedBuggies.map((value, index) => {

                                    return (
                                        <VehicleCardBooking key={index} buggy={value} />
                                    )
                                })
                                    :
                                    <div className="w-[97%] h-full py-8 ps-4 ms-4 text-white border border-white">
                                        <h1 className={`${monteserrat.className} text-4xl font-semibold`}>We are sorry No Buggies were found in accordance with your applied filters.</h1>
                                    </div>
                        }
                    </div>
                </div>
            </div>
            <div className="w-full h-full md:px-10">
                <div className="w-full h-auto flex flex-row gap-8 pt-8 sm:ps-10">
                    <div className="w-1/4 h-auto hidden sm:flex  pt-4">
                    </div>
                    {
                        loading ?
                            <div className=" w-full md:w-[70%]  flex flex-row border border-[#ffffff40] rounded-md text-white h-12 justify-center items-center cursor-wait">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            <div onClick={handleShowMore} className=" w-full md:w-[70%]  flex flex-row border border-[#ffffff40] rounded-md text-white h-12 justify-center items-center cursor-pointer">
                                <span className="text-xs font-bold">Show More</span>
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
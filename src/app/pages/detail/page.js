"use client";
import car from '../../../../public/assets/images/car.png'
import calendarIcon from '../../../../public/assets/images/calendarIcon.png'
import DaySlider from '@/app/components/slider/DaySlider';
import Image from 'next/image';
import CenteredSlider from '@/app/components/slider/CenteredSlider';
import { Montserrat } from 'next/font/google'
import CartItem from '@/app/components/cards/CartItem';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../lib/firebase/firebase.config';
import BuggyModel from '@/app/lib/models/buggyModel';
import CompanyModel from '@/app/lib/models/CompanyModel';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
export default function Page({ searchParams }) {
  const router = useRouter();
  const [buggyDetails, setBuggyDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotsForSelectedDate, setSlotsForSelectedDate] = useState([]);
  const [slotQuantities, setSlotQuantities] = useState({});
  const [buggies, setBuggies] = useState();
  const [calendarDate, setCalendarDate] = useState(new Date());


  function handleDateSelect(date) {
    setSelectedDate(date);
  }
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
            //   buggy.companyName = company.name; // Add the company name to the buggy object
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
            //   buggy.companyName = company.name; // Add the company name to the buggy object
            // }
            fetchedVehicles.push(buggy);
          }
        }

        setBuggies(fetchedVehicles);
        setLoading(false); // End loading
      }
    };

    fetchVehicles();
  }, [userLocation]);
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
  useEffect(() => {
    const fetchBuggyDetails = async () => {
      if (searchParams.id && userLocation && userLocation.latitude && userLocation.longitude) {
        setLoading(true);
        try {
          const docRef = doc(db, "offRoadVehicles", searchParams?.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Extract the first image URL of the first plate number
            console.log({ data, id: docSnap.id }, userLocation.latitude, userLocation.longitude)
            var temp = new BuggyModel({ ...data, id: docSnap.id }, userLocation.latitude, userLocation.longitude);
            if (temp.isApproved) {
              const company = await fetchCompanyDetails(temp.companyUid);
              if (company) {
                temp.companyName = company.name; // Add the company name to the buggy object
              }
              setBuggyDetails(temp);
            }
          } else {
            console.log("No such buggy found!");
          }
        } catch (error) {
          console.error("Error fetching buggy details:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        try {
          const docRef = doc(db, "offRoadVehicles", searchParams?.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Extract the first image URL of the first plate number
            var temp = new BuggyModel({ ...data, id: docSnap.id }, 31.4224922, 73.1249715);
            if (temp.isApproved) {
              const company = await fetchCompanyDetails(temp.companyUid);
              if (company) {
                temp.companyName = company.name; // Add the company name to the buggy object
              }
              setBuggyDetails(temp);
            }
          } else {
            console.log("No such buggy found!");
          }
        } catch (error) {
          console.error("Error fetching buggy details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBuggyDetails();
  }, [userLocation, searchParams.id]);

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
    if (buggyDetails?.schedule) {
      // Fetch and format available dates from BuggyModel
      const availableSlots = BuggyModel.getAvailableSlotsWithLowestPrice(buggyDetails.schedule);
      console.log(availableSlots)
      setAvailableDates(availableSlots.map(slot => ({
        ...slot,
        date: moment(slot.date, 'ddd - DD MMM YYYY').format('YYYY-MM-DD') // Convert to ISO format
      })));

    }
  }, [buggyDetails]);

  useEffect(() => {
    handleDateSelect(availableDates[0])
    console.log(JSON.stringify(availableDates) + '============dates')
  }, [availableDates]);
  useEffect(() => {
    const initialQuantities = {};
    slotsForSelectedDate.forEach((slot, index) => {
      initialQuantities[index] = 1; // Start with a default quantity of 1
    });
    setSlotQuantities(initialQuantities);
    console.log(JSON.stringify(slotsForSelectedDate) + "------------slots for selected date")
  }, [slotsForSelectedDate]);

  // Update the useEffect hook that fetches the slots for the selected date
  useEffect(() => {
    if (buggyDetails?.schedule && buggyDetails.plateNumber) {
      const formattedSelectedDate = moment(new Date(selectedDate?.date)).format('ddd - DD MMM YYYY');
      let slots = BuggyModel.calculateAvailableBuggiesForDate(buggyDetails.schedule, buggyDetails.plateNumber, formattedSelectedDate);

      // Filter out slots where no number plates are available
      slots = slots.filter(slot => slot.availableBuggies > 0);

      // Convert 'New Price' to a number for each slot
      slots = slots.map(slot => ({
        ...slot,
        'New Price': Number(slot['New Price']) // Ensuring 'New Price' is a number
      }));

      // Update the state to reflect the available slots
      setSlotsForSelectedDate(slots);

      // Initialize quantities to 1 for each available slot
      const initialQuantities = slots.reduce((acc, _, index) => {
        acc[index] = 1; // Start with a quantity of 1
        return acc;
      }, {});

      setSlotQuantities(initialQuantities);
    }
  }, [selectedDate, buggyDetails.plateNumber, buggyDetails.schedule]);
  const handleDateChange = (date) => {
    console.log(moment(date).format('YYYY-MM-DD')===availableDates[0].date ,'==========calendar date');
    setCalendarDate(date);
    if(availableDates.filter((item) => moment(date).format('YYYY-MM-DD') === item.date).length >0){
      setSelectedDate(availableDates.filter((item) => moment(date).format('YYYY-MM-DD') === item.date)[0]);
    }else{
      toast.error('Error! no slots available in selected date so it can not be selected', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    }
    setShowDatePicker(false);
  };

  const handleCalendarClick = () => {
    setShowDatePicker(!showDatePicker);
  };
  // Increment function with price calculation
  const incrementQuantity = (index) => {
    setSlotQuantities(prevQuantities => {
      const maxQuantity = slotsForSelectedDate[index].availableBuggies;
      let newQuantity = prevQuantities[index];

      if (newQuantity < maxQuantity) {
        newQuantity++;
      } else {
        toast.error(`Cannot book more than available buggies. Max: ${maxQuantity}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(`Cannot book more than available buggies. Max: ${maxQuantity}`);
      }

      return {
        ...prevQuantities,
        [index]: newQuantity
      };
    });
  };

  // Decrement function with price calculation
  const decrementQuantity = (index) => {
    setSlotQuantities(prevQuantities => {
      let newQuantity = prevQuantities[index];

      if (newQuantity > 1) { // Ensure the quantity never goes below 1
        newQuantity--;
      }

      return {
        ...prevQuantities,
        [index]: newQuantity
      };
    });
  };
  return (
    <div className={` w-scree h-screen ${monteserrat.className}`}>
      <Navbar />
      <div className="w-[95%] md:w-[80%] mx-auto py-16 flex flex-col gap-2 sm:gap-10">

        <p className="text-[15px] font-semibold text-white ">Home / {buggyDetails.type} / {buggyDetails.companyName}</p>
        <div className='flex justify-between'>
          <div className='flex flex-row justify-center items-center'>
            <Image src={car} className='w-12' alt="w8" />
            <p className="text-2xl font-semibold	ms-5 text-white ">{buggyDetails.name} - {buggyDetails.model}</p>
          </div>
          <div className='flex flex-row justify-center items-center relative cursor-pointer' onClick={handleCalendarClick}>
            <Image src={calendarIcon} className='w-6' alt="w8" />
            <p className="text-[16px] font-semibold	ms-5 text-white ">Calendar</p>
            {showDatePicker && (
                <div className="absolute top-10 right-0 z-10">
                    <DatePicker
                        inline
                        selected={calendarDate}
                        onChange={handleDateChange}
                    />
                </div>
            )}
          </div>
        </div>
        <div className='w-full text-white bg-[#202020] rounded-lg px-2 hero-slider'>

          {availableDates.length > 0 ? <DaySlider data={availableDates} selectedDate={selectedDate} onClick={handleDateSelect} /> : <div className=" w-full   flex flex-row text-white h-12 justify-center items-center cursor-wait">
            <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
        </div>
        <div className="mt-5 w-full h-auto">
          {
            buggies &&
            <CenteredSlider data={buggies} />
          }

        </div>
        <div className="py-5">
          {slotsForSelectedDate.length > 0 &&
            slotsForSelectedDate.map((value, index) => {
              return (
                <CartItem key={index} data={value} buggyDetails={buggyDetails} date={selectedDate} index={index} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} slotQuantities={slotQuantities} />
              )
            })
          }

        </div>
        <div className="w-full h-10 flex justify-center items-center gap-2 bg-[#171717] text-white cursor-pointer">
          <FaCaretDown size={18} color="#fff" />
          <p className="text-xs font-semibold">View More ( 87 )</p>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}


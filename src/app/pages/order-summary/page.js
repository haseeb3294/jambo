/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa6";
import { Montserrat } from 'next/font/google'
import OrderSummary from '../../../../public/assets/images/ordersummary.png'
import Image from "next/image";
import PyamentCustomInput from "@/app/components/inputs/PyamentCustomInput";
import { useState, useEffect } from "react";
import Modal from "@/app/components/modals/Modal";
import ModalQr from "@/app/components/modals/ModalQr";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../lib/firebase/firebase.config';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import QRCodeLib from 'qrcode';

const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
function PageContent() {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mailData, setMailData] = useState({email:"",bookingNo:"",vehicle:"",schedule:"",startTime:"",endTime:"",bookingAmount:"",orderNumber:"",QRImg:""});
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    const [expirey, setExpirey] = useState('');
    const [reservationNumber, setReservationNumber] = useState(null);
    const [reservationDisplayNumber, setReservationDisplayNumber] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [user, setUser] = useState(null);
    const [reserveNumber, setReserveNumber] = useState();
    const [qrFile, setQrFile] = useState();


    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    useEffect(() => {
        setReserveNumber(String(Math.floor(10000000 + Math.random() * 90000000)))
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user);
            if (!user) {
            } else {
                setUser(user)
            }
        });

        // Cleanup function to unsubscribe when the component unmounts
        setBookingDetails(JSON.parse(localStorage.getItem('bookingDetails')))
        return () => {
            unsubscribe();
        };
    }, [])
    
    const openModal = () => {
        setIsModalOpen(true);
    };
    console.log(mailData)
    const closeModal = () => {
        setIsModalOpen(false);
        openModalQr();
    };
    const [isModalQrOpen, setIsModalQrOpen] = useState(false);

    const openModalQr = () => {
        setIsModalQrOpen(true);
    };

    const closeModalQr = () => {
        setIsModalQrOpen(false);
        router.push('/')
    };
    const sentMailToUser = async (bookingNo,vehicle,schedule,startTime,endTime,bookingAmount,orderNumber,qrImg) => {

        let formData;
        formData = {
            email:user.email,
            bookingNo,
            vehicle,
            schedule,
            startTime,
            endTime,
            bookingAmount,
            orderNumber,
            qrImg
        };
        console.log(formData)
        try {
            const response = await fetch('https://cmjbuggy.com//api/bookingMail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }); 

            const data = await response.json();
            
            if(data.success === true) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
    const handlePaymentSubmit = async (event) => {
        if(user && !user.emailVerified){
            router.push('/pages/verify-email');
            return;
        }
        if(!user){
            localStorage.setItem('isFromCheckOutPage',true);
            router.push('/pages/login')
            return;
        }
        setIsLoading(true)
        event.preventDefault();

        if (!stripe || !bookingDetails || !user) {
            setIsLoading(false)
            console.log("Stripe has not loaded");
            return;
        }
        const card = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: card,
            });

            if (error) {
                setIsLoading(false)
                console.error('Error:', error.message);
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            console.log('payment method ', paymentMethod);
            // Replace httpsCallable with fetch
            const response = await fetch('https://us-central1-cmj-buggy.cloudfunctions.net/createPaymentIntent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: (Number(bookingDetails?.totalPrice) + 100) * 100, // Convert to cents
                    currency: 'aed',
                }),
            });

            const paymentIntent = await response.json();

            const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setIsLoading(false)
                console.error('Payment confirmation error:', confirmError);
            } else {
                console.log('Payment successful:', paymentIntent);
                toast.success('Payment Successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                handleBooking();
                
            }
        } catch (err) {
            console.error('Payment error:', err);
        }
    };

    async function handleBooking() {
        var slot = bookingDetails?.slotDetails;
        slot['Booked Plate Numbers'][0] = bookingDetails.buggyDetails.plateNumber[0];
        // console.log(slot,' slot');return;
        const { plateNumber, images } = bookingDetails.buggyDetails;
        if (user && bookingDetails) {
            var rn = String(Math.floor(10000000 + Math.random() * 90000000));
            setReservationDisplayNumber(rn);
            try {
                const docRef = await addDoc(collection(db, "Bookings"), {
                    "Slot": slot,
                    "Reservation Number": reserveNumber,
                    "Quantity": bookingDetails?.quantity.toString(),
                    "Plate Numbers": bookingDetails.buggyDetails.plateNumber,
                    "Timestamp": new Date(),
                    "Uid": user.uid,
                    "Total Amount": String(Number(bookingDetails?.totalPrice) + 100),
                    "Home Location": {},
                    "Image Url": bookingDetails.buggyDetails.images,
                    "Duration": bookingDetails.buggyDetails.duration,
                    "Countdown Start Time": null,
                    "Arrival Date": moment().format('ddd - DD MMM YYYY'),
                    "Formatted Address": bookingDetails.buggyDetails.address,
                    "Buggy Model": bookingDetails.buggyDetails.model,
                    "Buggy Name": bookingDetails.buggyDetails.name,
                    "Buggy Uid": bookingDetails.buggyDetails.id,
                    "Cashier Uid": bookingDetails.buggyDetails.cashierUid,
                    "Company Name": bookingDetails.buggyDetails.companyName,
                    "Company Uid": bookingDetails.buggyDetails.companyUid,
                    "Is Ended": false,
                    "Is Ride Ended": false,
                    "Is Ride Started": false,
                    "Is Started": false,
                    "Payment Date": moment().format('ddd MMM DD YYYY').toString(),
                    "Location": {
                        Lat: bookingDetails.buggyDetails.latitude,
                        Long: bookingDetails.buggyDetails.longitude
                    },
                    "Live Location": {},
                    "Phone Number": "",
                    "Vehicle Replacement at Index": null,
                    "Plate Number With Images": {
                        [plateNumber[0]]: images
                    },
                    "isRead":false,
                    'Pick Up Formatted Address': null,
                    'PickUp Latitude': null,
                    'PickUp Longitude': null,
                    'Selected Services Type': "",
                    'Booking Type': 'Vehicle',
                    'acceptedRide': false,
                    'orderId': orderNumber,
                });
                console.log("Document written with ID: ", docRef.id);
                setReservationNumber(docRef.id);
                toast.success('Booking Successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setIsLoading(false);
                sentMailToUser(
                    reserveNumber,
                    bookingDetails.buggyDetails.name,
                    moment().format('ddd - DD MMM YYYY'),
                    bookingDetails?.slotDetails['Start Time'],
                    bookingDetails?.slotDetails['End Time'],
                    bookingDetails?.totalPrice,
                    orderNumber,
                    qrFile
                    )
                localStorage.removeItem('bookingDetails')
                openModal();
            } catch (e) {
                setIsLoading(false)
                console.error("Error adding document: ", e);
            }
        } else {
            setIsLoading(false)
            console.log('user ---', user, 'booking details---', bookingDetails)
        }
    }
    useEffect(()=>{
        if(reserveNumber)
        {
            const generateQRCode = async () => {
                const value = reserveNumber + '+START'
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
                  setQrFile(data.filename)
                  if (!response.ok) {
                    throw new Error('Failed to generate QR code');
                  }
                } catch (error) {
                  console.error('Error generating QR code:', error);
                }
              };
              generateQRCode()
        }
    },[reserveNumber])

    return (
        <div className="flex flex-col w-full h-auto ">
            <Navbar />
            <div className={`w-full flex flex-col items-center mt-16  ${monteserrat.className}`}>
                <div className="flex flex-col w-full px-4 md:w-[80%] text-white">
                    <div >
                        <FaArrowLeft size={30} color="#fff" className="cursor-pointer" onClick={()=>{router.back();}} />
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[27px] font-semibold">Order Summary</h1>
                    </div>
                    <hr className="w-full" />
                    <div className="flex flex-col w-full gap-4">
                        {bookingDetails &&
                            <div className="flex flex-col gap-5 md:gap-0 md:flex-row w-full items-center justify-between py-4">
                                <div className="flex flex-row gap-7 md:gap-4">
                                    <div className="w-36 h-32 overflow-hidden rounded-xl">
                                        <img src={bookingDetails?.buggyDetails?.images[0]} alt="ordersummary" className="w-full h-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-semibold">{bookingDetails?.buggyDetails?.name}</p>
                                        <p className="text-xl font-normal">{bookingDetails?.buggyDetails?.duration}</p>
                                        <p className="text-xl font-normal">{bookingDetails?.slotDetails['Start Time']} - {bookingDetails?.slotDetails['End Time']}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <p className="text-xl font-normal">Quantity</p>
                                    <input type="number" value={bookingDetails?.quantity} className="bg-black border border-[#555555] w-20 h-9 ps-2" readOnly />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[27px] font-semibold">AED {bookingDetails?.totalPrice}</p>
                                </div>
                            </div>
                        }
                        <hr className="w-full h-[0.5px]" />
                        {/* <div className="flex flex-col md:flex-row gap-5 md:gap-0 w-full items-center justify-between py-4">
                            <div className="flex flex-row gap-7 md:gap-4">
                                <div className="w-36 h-32">
                                    <Image src={OrderSummary} alt="ordersummary" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl font-semibold">Yamaha Grizzly 700 2021</p>
                                    <p className="text-xl font-normal">1 - Hour</p>
                                    <p className="text-xl font-normal">11:00AM - 12:00PM</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3">
                                <p className="text-xl font-normal">Quantity</p>
                                <input type="number" min={1} value={2} className="bg-black border border-[#555555] w-20 h-9 ps-2" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-3xl font-semibold">AED 116</p>
                            </div>
                        </div> 
                        <hr className="w-full h-[0.5px]" />*/}
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-3 py-8">
                        <div className="w-full md:w-[62%] h-auto flex flex-col gap-2 border border-[#4A4A4A]">
                            <div className="py-4  px-6">
                                <p className="text-[27px] font-semibold">Payment Information</p>
                            </div>
                            <hr className="w-full h-[0.5px]" />
                            <CardElement
                                className="p-16"
                                options={{

                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#ffffff',
                                            '::placeholder': {
                                                color: '#ffffff',
                                            },


                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },

                                }}
                            />
                            {/* <div className="py-6 px-6 flex flex-col gap-6">
                                <PyamentCustomInput placeholder={'Email ID'} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <CardNumberElement className="bg-[#171717] px-3 h-14 w-full rounded-lg text-white" options={{classes:{
                                    base:"bg-[#171717] px-3 h-14 w-full rounded-lg text-white"
                                }}}/>
                                <PyamentCustomInput placeholder={'Card Number'} value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} />
                                <div className="flex flex-row w-full gap-3">
                                    <div className="w-1/2">
                                        <PyamentCustomInput placeholder={'mm/yy'} value={expirey}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
                                                if (sanitizedValue.length > 0) {
                                                    let month = sanitizedValue.slice(0, 2);
                                                    let year = sanitizedValue.slice(2, 4);
                                                    if (parseInt(month, 10) > 12) {
                                                        month = '12';
                                                    }
                                                    let formattedValue = month;
                                                    if (year.length > 0 && sanitizedValue.length > 2) {
                                                        formattedValue += '/' + year;
                                                    }
                                                    setExpirey(formattedValue);
                                                } else {
                                                    setExpirey('');
                                                }
                                            }}

                                        />
                                        <CardExpiryElement className="bg-[#171717] px-3 h-14 w-full rounded-lg"/>
                                    </div>
                                    <div className="w-1/2">
                                    <CardCvcElement className="bg-[#171717] px-3 h-14 w-full rounded-lg"/>
                                        <PyamentCustomInput placeholder={'CVC'} value={cvc} onChange={(e) => { setCvc(e.target.value) }} />
                                    </div>
                                </div>
                                <PyamentCustomInput placeholder={'Card Holder Name'} value={name} onChange={(e) => { setName(e.target.value) }} />

                            </div> */}
                            <div className="py-4  px-6">
                                <p className="text-xl font-semibold">Billing Address</p>
                            </div>
                            <hr className="w-full h-[0.5px]" />
                            <div className="py-6 px-6 flex flex-col gap-6">
                                <PyamentCustomInput placeholder={'Complete Address'} />
                                <PyamentCustomInput placeholder={'Address line 2'} />
                                <div className="flex flex-row w-full gap-3">
                                    <div className="w-1/2">
                                        <PyamentCustomInput placeholder={'Country'} />
                                    </div>
                                    <div className="w-1/2">
                                        <PyamentCustomInput placeholder={'State'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[38%] max-h-[510px] flex flex-col flex-grow gap-2 border border-[#4A4A4A]">
                            <div className="py-4  px-6">
                                <p className="text-[27px] font-semibold">Order Summery</p>
                            </div>
                            <hr className="w-full h-[0.5px]" />
                            <div className="flex flex-col px-6">
                                <div className="flex flex-row justify-between items-center py-4">
                                    <p className="text-xl font-normal">Sub Total</p>
                                    <p className="text-xl font-semibold">AED {bookingDetails?.totalPrice}</p>
                                </div>
                                <div className="flex flex-row justify-between items-center py-4">
                                    <p className="text-xl font-normal">Est. Tax</p>
                                    <p className="text-xl font-semibold">AED 00.00</p>
                                </div>
                                <div className="flex flex-row justify-between items-center py-4">
                                    <p className="text-xl font-normal">Service Fee</p>
                                    <p className="text-xl font-semibold">AED 100</p>
                                </div>
                            </div>
                            <hr className="w-full h-[0.1px]" />
                            <div className="flex flex-col px-6">
                                <div className="flex flex-row justify-between items-center py-4">
                                    <p className="text-[27px] font-semibold">Total</p>
                                    <p className="text-[27px] font-semibold">AED {Number(bookingDetails?.totalPrice) + 100}</p>
                                </div>
                            </div>
                            <div className="w-full px-4 mt-6 py-6">
                                <button onClick={handlePaymentSubmit} className={`flex flex-row justify-center items-center gap-3 w-full h-16 rounded-[10px] bg-[#FFA945]`}>
                                    {isLoading ? <div role="status">
                                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                        :
                                        <span className="text-black text-xl font-semibold">Checkout</span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <ModalQr isOpenQr={isModalQrOpen} onQrClose={closeModalQr} rn={reservationNumber} rnD={reservationDisplayNumber} />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}


export default function Page() {
    const stripePromise = loadStripe('pk_test_51Nryh0JD5tRixJhxaazlRnG4EoK0PRdvsCnwhY9o8joJE6dCtEv19Vx2Ut6UvfJ0MYta2XHomA7iPmlZz83G23c200B5MAldmd');
    return (
        <Elements stripe={stripePromise}>
            <PageContent />
        </Elements>

    )
}
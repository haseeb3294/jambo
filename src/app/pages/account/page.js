/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/app/components/navbar/Navbar";
import { Montserrat, Poppins } from 'next/font/google'
import Footer from "@/app/components/footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


const monteserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function Page() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged(async user => {
            console.log(user);
            if (!user) {
                router.push('/pages/login')
            } else {
                setUser(user);
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("user already found :", docSnap.data());
                    setUserDetails(docSnap.data())
                }
                setLoading(false)
            }
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (userDetails) {
            setName(userDetails['Username']);
            setPhone(userDetails['Phone Number'] || '');
        }
    }, [userDetails])
    async function handleSubmit(e) {
        if(!isValidName || !isValidPhone){
            e.preventDefault();
            return false;
        }
        setLoading(true);
        e.preventDefault();
        console.log(name, phone)
        try {
            await setDoc(doc(db, "Users", user.uid), {
                "Email": user.email,
                "Phone Number": phone,
                "Username": name,
                "Profile Image": userDetails["Profile Image"],
                "Timestamp": userDetails["Timestamp"],
                "Uid": user.uid,
            });
            const docRef = doc(db, "Users", user.uid);
            console.log("Document written with ID: ", docRef.id);
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.error("Error adding document: ", e);
        }
        // router.push('/pages/verify-email')
    }
    const handleChangeName = (e) => {
        const name = e.target.value;
        const capitalizedName = capitalizeEachWord(name);
        setName(capitalizedName);
        validateName(name);
    };
    const validateName = (value) => {
        const nameRegex = /^[A-Za-z ]+$/;
        setIsValidName(nameRegex.test(value));
    };

    const capitalizeEachWord = (str) => {
        return str
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    };

    const handleChangePhone = (e) => {
        const phoneNumber = e.target.value;
        setPhone(phoneNumber);
        validatePhone(phoneNumber);
      };
      
      const validatePhone = (value) => {
        const phoneRegex = /^\d+$/; // Allow only numeric digits
        setIsValidPhone(phoneRegex.test(value));
      };
    return (
        <div className="flex flex-col w-full  h-auto md:px-0 bg-black">
            <Navbar />

            <div className={`${poppins.className} w-full 2xl:w-[80%] 2xl:mx-auto h-full md:px-10 flex flex-col justify-center items-center  `}>

                <form className="w-[95%] md:w-[45%] flex flex-col items-center gap-5 py-10 mt-14 bg-[#141414] border border-[#4A4A4A] px-4 md:px-16" onSubmit={handleSubmit}>
                    {
                        loading ?
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            <>
                                <div className="w-full md:w-full py-6 ">
                                    <h1 className="font-semibold text-2xl text-white">Account information</h1>
                                </div>
                                <div className={`flex flex-row justify-center items-center gap-3 h-[50px] w-full rounded-md  border-[1px] border-[#696969] bg-[#171717]`}>
                                    <input required className={'text-white text-sm font-normal w-full h-full bg-transparent pl-3'} placeholder={'Your Name'} value={name} onChange={e => handleChangeName(e)} />
                                </div>
                                {
                                    !isValidName &&
                                    <div className={`flex flex-row w-[100%] `}>

                                        <span className="text-red-600 text-sm font-normal">Name can only contain letters and spaces.</span>
                                    </div>
                                }
                                <div className={`flex flex-row justify-center items-center gap-3 h-[50px] w-full rounded-md  border-[1px] border-[#696969] bg-[#171717]`}>
                                    <input required className={'text-white text-sm font-normal w-full h-full bg-transparent pl-3'} placeholder={'Phone Number'} value={phone} onChange={e => handleChangePhone(e)} />
                                </div>
                                {
                                    !isValidPhone &&
                                    <div className={`flex flex-row w-[100%]`}>

                                        <span className="text-red-600 text-sm font-normal">Phone number can only contain numeric digits.</span>
                                    </div>
                                }
                                <div className={`flex flex-row justify-end items-center gap-3 h-auto w-full mt-36`}>
                                    <button type="submit" className=" md:block bg-[#F77F00] text-white text-xs px-14 py-4 rounded-md w-full"  >Save</button>
                                </div>
                            </>
                    }
                </form>

            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}
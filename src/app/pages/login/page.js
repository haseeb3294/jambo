/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import SignUpImage from '../../../../public/assets/images/signup-image.png'
import cmj from '../../../../public/assets/images/cmj.png'

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { Raleway } from 'next/font/google'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth, db } from '../../lib/firebase/firebase.config'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const raleway = Raleway({ subsets: ['latin'] })

export default function Signup() {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                let isFromCheckOutPage = localStorage.getItem('isFromCheckOutPage')
                if (isFromCheckOutPage) {
                    router.push('/pages/order-summary')
                    // localStorage.removeItem('isFromCheckOutPage')
                    
                } else {
                    router.push('/')

                }
            }
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);
    const provider = new GoogleAuthProvider();
    const router = useRouter();
    function handleSubmit(e) {
        e.preventDefault();
        if(email.length ===0)
        {
            setIsEmailValid(false)
            return false
        }
        if(password.length === 0)
        {
            setIsValid(false)
            return false
        }
        
        setLoading(true)
        console.log(email, password)
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log(user)
                        try {
                            const docRef = doc(db, "Users", user.uid);
                            const docSnap = await getDoc(docRef);
                            console.log("Document found: ", docSnap.data());
                            let isFromCheckOutPage = localStorage.getItem('isFromCheckOutPage')
                            if (isFromCheckOutPage) {
                                router.push('/pages/order-summary')                             
                            } else {
                                router.push('/')

                            }
                        } catch (e) {
                            setLoading(false)
                            console.error("Error adding document: ", e);
                        }
                        // sendEmailVerification(auth.currentUser)
                        //     .then(() => {
                        //         console.log('we have sent you a confirmation email! please check your inbox')
                        //     });
                    })
                    .catch((error) => {
                        setLoading(false)
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error);
                        toast.error(errorMessage, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        return false;
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                setLoading(false)
            });
        // router.push('/pages/verify-email')
    }

    function loginWithGoogle() {
        setLoading(true)
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // const q = query(collection(db, "Users"), where("Uid", "==", user.uid), limit(1));

                // const docSnap = await getDocs(q);
                // console.log(docSnap.docs[0])
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("user already found :", docSnap.data());
                } else {
                    console.log("No such document!");
                    try {
                        await setDoc(doc(db, "Users", user.uid), {
                            "Email": user.email,
                            "Profile Image": user.photoURL || " ",
                            "Timestamp": new Date(),
                            "Uid": user.uid,
                            "Username": user.displayName || "",
                        });
                        const docRef = doc(db, "Users", user.uid);
                        console.log("Document written with ID: ", docRef.id);
                        let isFromCheckOutPage = localStorage.getItem('isFromCheckOutPage')
                        if (isFromCheckOutPage) {
                            router.push('/pages/order-summary')
                            // localStorage.removeItem('isFromCheckOutPage')
                        } else {
                            router.push('/')

                        }
                    } catch (e) {
                        setLoading(false)
                        console.error("Error adding document: ", e);
                    }
                }

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                setLoading(false)
                console.log(error.message)
            });
    }
    const [email, setEamil] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [inputTypePassword, setInputTypePassword] = useState('password');
    function handleChangePasswordType() {
        if (inputTypePassword == 'text') {
            setInputTypePassword('password');
        } else {
            setInputTypePassword('text');
        }
    }
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (value) => {
        // Define your password criteria
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Check if the password meets the criteria
        setIsValid(passwordRegex.test(value));
    };
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center h-screen xl:w-3/4 mt-20 lg:mt-0 p-2 mx-auto bg-[#121212]">
            <div className=" h-max w-4/5">
                <div className='w-full flex justify-center items-center'>
                    <Link href="/">
                        <Image src={cmj} alt='image' className='h-[47px] w-full self-center' />
                    </Link>
                </div>
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                    <h1 className={`${raleway.className} text-white font-bold text-3xl`}>Log in</h1>
                    <button
                        onClick={loginWithGoogle}
                        className={`flex flex-row justify-center items-center gap-3 w-[90%] sm:w-[250px] md:w-[380px] h-[55px] rounded-md bg-[#5985E5] `}>
                        <FcGoogle className='bg-white size-9 rounded-xl p-1' />
                        <span className={'text-white text-base font-medium'}>Continue with Google</span>
                    </button>
                    <button
                        className={`flex flex-row justify-center items-center gap-3 w-[90%] sm:w-[250px] md:w-[380px] h-[55px]  border-[#ffffff33] rounded-2xl border-[1px]`}>
                        <FaFacebookF color='#2C79EA' size={28} />
                        <span className={'text-white text-base font-medium'}>Continue with Facebook</span>
                    </button>
                    <hr className=' border-[#ffffff33] w-[90%] sm:w-[250px] md:w-[380px]' />
                    <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center items-center gap-2'>
                        <div
                            className={`flex flex-row justify-center items-center h-[50px] w-[90%] sm:w-[250px] md:w-[380px] rounded-xl border-[1px] border-[#ffffff33]`}>
                            <input type="email" className={'text-white text-sm font-normal theme-input w-full h-full bg-transparent pl-3'} placeholder='Email Address' value={email} onChange={(e) => { setEamil(e.target.value),setIsEmailValid(true) }} />
                        </div>
                        {
                            !isEmailValid &&
                            <div className={`flex flex-row items-center w-[90%] sm:w-[250px] md:w-[380px] pr-2`}>
                                <span className="text-red-600 text-base font-normal">Please Enter valid Email.</span>
                            </div>
                        }
                        <div
                            className={`flex flex-row justify-center items-center h-[50px] w-[90%] sm:w-[250px] md:w-[380px] rounded-xl border-[1px] border-[#ffffff33] pr-2`}>
                            <input type={inputTypePassword} className={'text-white text-sm font-normal w-full theme-input h-full bg-transparent pl-3 outline-none'} placeholder='Password' value={password} onChange={(e) => { handlePasswordChange(e) }} />
                            {
                                inputTypePassword != 'password' ? <FaEyeSlash size={14} color="#ffffff" onClick={handleChangePasswordType} className="cursor-pointer" /> : <FaEye size={14} color="#ffffff" onClick={handleChangePasswordType} className="cursor-pointer" />
                            }
                        </div>
                        {
                            !isValid &&
                            <div className={`flex flex-row justify-center items-center h-[50px] w-[90%] sm:w-[250px] md:w-[380px] pr-2 my-2`}>
                                <span className="text-red-600 text-base font-normal">Password must be 8 characters long, contain at least one symbol,  one number, and one capital letter.</span>
                            </div>
                        }
                        <button type='submit' className={`flex flex-row justify-center items-center w-[90%] sm:w-[250px] md:w-[380px] h-[53px] rounded-md bg-[#F77F00]`}>
                            {loading ?
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                                <span className="text-white text-base font-normal">Login</span>
                            }
                        </button>
                    </form>
                    <Link href="/pages/forgot-password">
                        <p className='text-[#ffffffb3] text-[17px] font-normal mt-3 mb-2'>Forget Password?</p>
                    </Link>
                    <Link href={'/pages/signup'} className='text-[#ffffff66] text-[17px] font-normal mt-1 '>{"Don't Have an account?"} <span className='text-[#3792DE] cursor-pointer font-medium'>Signup Now</span></Link>
                </div>
            </div>
            <div className="h-auto w-4/5 mx-auto">
                <Image src={SignUpImage} alt='image' className='h-full w-full' />
            </div>
            <ToastContainer />
        </div>
    )
}
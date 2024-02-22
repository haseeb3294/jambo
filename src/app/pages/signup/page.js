/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import SignUpImage from '../../../../public/assets/images/signup-image.png'
import CustomBtn from '@/app/components/buttons/CustomBtn'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import CustomInput from '@/app/components/inputs/CustomInupt';
import CustomSignupBtn from '@/app/components/buttons/CustomSignupBtn';
import { Raleway } from 'next/font/google'
import { useRouter } from 'next/navigation';
import { browserSessionPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, setPersistence, signInWithPopup } from "firebase/auth";
import { auth, db } from '../../lib/firebase/firebase.config'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cmj from '../../../../public/assets/images/cmj.png'

import Link from 'next/link';



const raleway = Raleway({ subsets: ['latin'] })

export default function Signup() {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                if(!user.emailVerified){
                    router.push('/pages/verify-email')
                }else{
                    let isFromCheckOutPage = localStorage.getItem('isFromCheckOutPage')
                    if (isFromCheckOutPage) {
                        localStorage.removeItem('isFromCheckOutPage')
                        router.push('/pages/order-summary')
                    } else {
                        router.push('/')

                    }
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
        if(!isValidName && !isValid){
            e.preventDefault();
            return false;
        }
        if(name.length === 0)
        {
            setIsValidName(false)
            e.preventDefault();
            return false;
        }
        if(email.length === 0)
        {
            setIsValidEmail(false)
            e.preventDefault();
            return false;
        }
        if(password.length === 0)
        {
            setIsValid(false)
            e.preventDefault();
            return false;
        }
        setLoading(true);
        e.preventDefault();
        console.log(email, name, password, confirmPassword)
        if (password !== confirmPassword) {
            toast.error('OOps passwords does not match!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false)
            return false;
        }
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        await sendEmailVerification(user);
                        console.log(user)
                        try {
                            await setDoc(doc(db, "Users", user.uid), {
                                "Email": user.email,
                                "Profile Image": user.photoURL || " ",
                                "Timestamp": new Date(),
                                "Uid": user.uid,
                                "Username": name,
                            });
                            const docRef = doc(db, "Users", user.uid);
                            console.log("Document written with ID: ", docRef.id);
                            router.push('/pages/verify-email')
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
                        setLoading(false)
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
                    let isFromCheckOutPage = localStorage.getItem('isFromCheckOutPage')
                    if (isFromCheckOutPage) {
                        localStorage.removeItem('isFromCheckOutPage')
                        router.push('/pages/order-summary')
                    } else {
                        router.push('/')

                    }
                } else {
                    console.log("No such document!");
                    try {
                        await setDoc(doc(db, "Users", user.uid), {
                            "Email": user.email,
                            "Profile Image": user.photoURL || " ",
                            "Timestamp": new Date(),
                            "Uid": user.uid,
                            "Username": user.displayName,
                        });
                        const docRef = doc(db, "Users", user.uid);
                        console.log("Document written with ID: ", docRef.id);
                        let isFromCheckOutPage = localStorage.getItem('isFromCheckOutPage')
                        if (isFromCheckOutPage) {
                            localStorage.removeItem('isFromCheckOutPage')
                            router.push('/pages/order-summary')
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
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [inputTypePassword, setInputTypePassword] = useState('password');
    const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [passwordMatched, setPasswordMatched] = useState(true);
    function handleChangePasswordType() {
        if (inputTypePassword == 'text') {
            setInputTypePassword('password');
        } else {
            setInputTypePassword('text');
        }
    }
    function handleChangeConfirmPasswordType() {
        if (inputTypeConfirmPassword == 'text') {
            setInputTypeConfirmPassword('password');
        } else {
            setInputTypeConfirmPassword('text');
        }
    }
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
        if (newPassword == confirmPassword) {
            setPasswordMatched(true);
        } else {
            setPasswordMatched(false)
        }

    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setIsValid(passwordRegex.test(value));
    };
    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
        matthcConfirmPassword(newPassword);
    };

    const matthcConfirmPassword = (value) => {
        if (password == value) {
            setPasswordMatched(true);
        } else {
            setPasswordMatched(false)
        }
    };
    const handleChangeName = (e) => {
        const name = e.target.value;
        const capitalizedName = capitalizeEachWord(name);
        setName(capitalizedName);
        validateName(name);
    };
    const capitalizeEachWord = (str) => {
        return str
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    };

    const validateName = (value) => {
        const nameRegex = /^[A-Za-z ]+$/;
        setIsValidName(nameRegex.test(value));
    };
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center h-screen xl:w-3/4 mt-20 lg:mt-0 p-2 mx-auto gap-5">
            <div className="h-max w-4/5 ">
                <div className='w-full flex justify-center items-center '>
                    <Link href="/">
                        <Image src={cmj} alt='image' className='h-[47px] w-full self-center' />
                    </Link>
                </div>
                <div className="h-auto w-full flex flex-col justify-center items-center gap-3 py-5 ">
                    <h1 className={`${raleway.className} text-white font-bold text-3xl`}>Sign up</h1>
                    <CustomBtn height={'48px'} title={'Continue with Google'} bg={true} icon={<FcGoogle className='bg-white size-9 rounded-xl p-1' />} onClick={loginWithGoogle} />
                    <CustomBtn height={'48px'} title={'Continue with Facebook'} icon={<FaFacebookF color='#2C79EA' size={28} />} borderVisible={true} />
                    <hr className=' bg-[#ffffff33] w-[90%] sm:w-[250px] md:w-[380px]' />
                    <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center items-center gap-4 '>
                        <CustomInput isPasswordInput={false} placeHolder={'Name'} height={'48px'} borderVisible={true} width={'380px'} value={name} onChange={(e) => { handleChangeName(e) }} />
                        {
                            !isValidName &&
                            <div className={`flex flex-row items-center w-[90%] sm:w-[250px] md:w-[380px] pr-2`}>

                                <span className="text-red-600 text-sm font-normal">Name can only contain letters and spaces.</span>
                            </div>
                        }
                        <CustomInput isPasswordInput={false} type={'email'} placeHolder={'Email Address'} height={'48px'} borderVisible={true} width={'380px'} value={email} onChange={(e) => { setEamil(e.target.value);setIsValidEmail(true) }} />
                        {
                            !isValidEmail &&
                            <div className={`flex flex-row items-center w-[90%] sm:w-[250px] md:w-[380px] pr-2`}>

                                <span className="text-red-600 text-sm font-normal">Please Enter a valid Email.</span>
                            </div>
                        }
                        <CustomInput isPasswordInput={true} type={inputTypePassword} handleShowHidePasword={handleChangePasswordType} minLength={8} placeHolder={'Password'} height={'48px'} borderVisible={true} width={'380px'} value={password} onChange={(e) => { handlePasswordChange(e) }} />
                        {
                            !isValid &&
                            <div className={`flex flex-row items-center w-[90%] sm:w-[250px] md:w-[380px] pr-2`}>

                                <span className="text-red-600 text-sm font-normal">Password must be 8 characters long, contain at least<br /> one symbol,  one number, and one capital letter.</span>
                            </div>
                        }
                        <CustomInput isPasswordInput={true} type={inputTypeConfirmPassword} handleShowHidePasword={handleChangeConfirmPasswordType} minLength={8} placeHolder={'Confirm Password'} height={'48px'} borderVisible={true} width={'380px'} value={confirmPassword} onChange={(e) => { handleConfirmPasswordChange(e) }} />
                        {
                            !passwordMatched &&
                            <div className={`flex flex-row items-center w-[90%] sm:w-[250px] md:w-[380px] pr-2 `}>
                                <span className="text-red-600 text-sm font-normal">Password does not match.</span>
                            </div>
                        }
                        <CustomSignupBtn title={'Sign up'} loading={loading} />
                    </form>
                    <Link href={'/pages/login'} className='text-white font-normal mt-3 mb-2'>{"Don't Have an account?"} <span className='text-[#F77F00] cursor-pointer font-medium'>Login Now</span></Link>
                </div>
            </div>
            <div className="h-auto w-4/5 mx-auto">
                <Image src={SignUpImage} alt='image' className='h-full w-full' />
            </div>
            <ToastContainer />
        </div>
    )
}
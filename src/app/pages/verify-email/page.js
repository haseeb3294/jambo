"use client";
import Image from 'next/image'
import VerifyEmailImage from '../../../../public/assets/images/verifyEmailImage.png'
import cmj from '../../../../public/assets/images/cmj.png'
import CustomSignupBtn from '@/app/components/buttons/CustomSignupBtn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Raleway } from 'next/font/google'
import { useRouter } from 'next/navigation';
import { auth } from '@/app/lib/firebase/firebase.config';
import { useState , useEffect } from 'react';



const raleway = Raleway({ subsets: ['latin'] })
export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
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
    const sentMailToUser = async()=>{
            const formData = {email : user.email}
            const response = await fetch('https://cmj-buggy.vercel.app/api/signupMail', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }); 
        const data = await response.json();
        if(data.success === true)
        {
            return true
        }
        else
        {
            return false
        }
    }
    const handleSubmit = async ()=> {
        setLoading(true)

        if (user) {
            user.getIdToken(/* forceRefresh */ true)
                .then((idToken) => {
                    // Check if the user's email is verified
                    if (user.emailVerified) {
                        setLoading(false)
                        toast.success('Your email is verified successfully', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        let isFromCheckOutPage = localStorage.getItem('isFromCheckOutPage')
                        if (isFromCheckOutPage) {
                            localStorage.removeItem('isFromCheckOutPage')
                            const mailToUser = sentMailToUser();
                            console.log(mailToUser)
                            if(mailToUser)
                            {
                                router.push('/pages/order-summary')
                            }
                            else
                            {
                                toast.error('Mail not sent', {
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
                        } else {
                            const mailToUser = sentMailToUser();
                            console.log(mailToUser)
                            if(mailToUser)
                            {
                                router.push('/')
                            }
                            else
                            {
                                toast.error('Mail not sent', {
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
                            
                        }
                    } else {
                        setLoading(false)
                        toast.error('Please try again email is not verified yet!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.error("Error refreshing token:", error);
                });
        }
    }

    return (
        <div className="flex justify-center flex-col w-full h-full items-center mb-4">
            <div className="h-[10%] w-full flex justify-center items-center pt-4 pb-4">
                <Image src={cmj} alt='image' className='h-[60px] w-[130px]' />
            </div>
            <div className="flex flex-col justify-center w-full sm:w-[70%] md:w-[60%] h-[100%] bg-[#1C1C1C] rounded-md">

                <div className="h-[45%] w-full">
                    <Image src={VerifyEmailImage} alt='image' className='h-full w-full' />
                </div>
                <div className={`${raleway.className} h-[45%] w-full flex flex-col gap-4 text-white ps-9 pe-9 pt-4`}>
                    <h1 className='font-semibold text-3xl'>Verify your email</h1>
                    <p className='font-normal text-[1rem]'>Hello james!</p>
                    <p className='font-normal text-[1rem]'>Welcome to CMJ!</p>
                    <p className='font-normal text-[1rem]'>Please verify your email address to enjoy the best services in CMJ Website</p>
                    <p className='font-normal text-[1rem]'>Thanks</p>
                    <div className="w-full flex justify-center items-center pb-3">
                        <CustomSignupBtn title={'Verify email'} onClick={handleSubmit} loading={loading} />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google'
import Image from 'next/image';
import cmj from '../../../../public/assets/images/cmj.png'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/app/lib/firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';


const poppins = Poppins({ subsets: ['latin'], weight: ['500'] })

const Navbar = ({ currentPage }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logoutModelOpen, setLogoutModelOpen] = useState(false);
    const [profileDropDown, setDrofileDropDown] = useState(false);
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    function handleSignOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push('/');
            setLogoutModelOpen(false)
        }).catch((error) => {
            // An error happened.
            console.log(error, 'log out error')
        });
    }
    useEffect(() => {
        const handleResize = () => {
            // Close the menu when the window width reaches medium (md) size
            if (window.innerWidth >= 768 && isOpen) {
                setIsOpen(false);
            }
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            console.log(user);
            if (!user) {
                setIsLoggedIn(false)
            } else {
                console.log(user);
                setUser(user)
                setIsLoggedIn(true)
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("user already found :", docSnap.data());
                    setUserDetails(docSnap.data())
                }
            }
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <nav className="bg-black h-[100px]">
            <div className={`container mx-auto flex justify-between px-6 md:px-0 md:justify-around items-center text-white h-full w-full ${poppins.className}`}>
                {/* Logo on the left */}
                <Link href="/">
                    <img src={'/assets/images/cmj.png'} alt='image' className='h-[47px] w-[94px]' />
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white focus:outline-none"
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>

                {/* Links for mobile screens */}
                {isOpen && (
                    <div className="flex flex-col gap-2 text-white md:hidden absolute top-16 right-4 bg-black w-80 p-8 rounded-md z-50">
                        <Link href="/" className={`text-xl font-normal hover:text-[#F77F00] ${currentPage == 'home' ? 'text-[#F77F00]' : ''}`}>
                            Home
                        </Link>
                        <hr className='h-[1px] bg-white' />
                        <Link href="/pages/about" className={`text-xl font-normal hover:text-[#F77F00] ${currentPage == 'about' ? 'text-[#F77F00]' : ''}`}>
                            About
                        </Link>
                        <hr className='h-[1px] bg-white' />

                        <Link href="/pages/services" className={`text-xl font-normal hover:text-[#F77F00] ${currentPage == 'services' ? 'text-[#F77F00]' : ''}`}>
                            Services
                        </Link>
                        {/* <hr className='h-[1px] bg-white' />
                        <Link href="/blog" className='text-xl font-medium hover:text-[#F77F00]'>
                            Blog
                        </Link> */}
                        <hr className='h-[1px] bg-white' />
                        <Link href="/pages/contact" className={`text-xl font-normal hover:text-[#F77F00] ${currentPage == 'contact' ? 'text-[#F77F00]' : ''}`}>
                            Contact Us
                        </Link>
                        {
                            isLoggedIn ?
                                <button className='text-xl font-medium p-2 rounded-md bg-red-500' onClick={() => { setLogoutModelOpen(true) }}>
                                    Logout
                                </button>
                                :
                                <div className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-row gap-2 justify-center items-center`}>


                                    <button className='border-2 border-[#F77F00] text-base font-medium py-2 px-6 rounded-full' onClick={() => { router.push('/pages/login') }}>Sign in</button>
                                    <p>|</p>
                                    <button className='border-2 border-[#F77F00] text-base font-medium py-2 px-6 rounded-full' onClick={() => { router.push('/pages/signup') }}>Sign up</button>

                                </div>
                        }
                        <hr className='h-[1px] bg-white' />
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <button className=" md:block bg-[#F77F00] text-white text-xs px-10 py-4 rounded-md" onClick={() => { router.push('/pages/booking') }}>Book Now</button>
                        </div>
                    </div>
                )}

                {/* Links in the middle for larger screens */}
                {!isOpen && (
                    <div className={`md:flex ${isOpen ? 'flex' : 'hidden'} space-x-4 gap-4 mt-4 md:mt-0 text-white`}>
                        <Link href="/" className={`text-sm font-medium hover:text-[#F77F00] ${currentPage == 'home' ? 'text-[#F77F00]' : ''}`}>
                            Home
                        </Link>
                        <Link href="/pages/about" className={`text-sm font-medium hover:text-[#F77F00] ${currentPage == 'about' ? 'text-[#F77F00]' : ''}`}>
                            About
                        </Link>
                        <Link href="/pages/services" className={`text-sm font-medium hover:text-[#F77F00] ${currentPage == 'services' ? 'text-[#F77F00]' : ''}`}>
                            Services
                        </Link>
                        {/* <Link href="/blog" className={`text-sm font-medium hover:text-[#F77F00] ${currentPage == 'home'? 'text-[#F77F00]':''}`}>
                            Blog
                        </Link> */}
                        <Link href="/pages/contact" className={`text-sm font-medium hover:text-[#F77F00] ${currentPage == 'contact' ? 'text-[#F77F00]' : ''}`}>
                            Contact Us
                        </Link>

                    </div>
                )}
                {!isOpen && (
                    <div className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-row gap-2 justify-center items-center relative`}>

                        {/* <button className=" md:block bg-[#F77F00] text-white text-xs px-10 py-4 ml-3 rounded-md" onClick={() => { router.push('/pages/booking') }}>Book Now</button> */}
                        {
                            !isLoggedIn &&
                            <>
                                <button className='border-2 border-[#F77F00] text-xs font-medium py-2 px-6 rounded-full' onClick={() => { router.push('/pages/login') }}>Sign in</button>
                                <p>|</p>
                                <button className='border-2 border-[#F77F00] text-xs font-medium py-2 px-6 rounded-full' onClick={() => { router.push('/pages/signup') }}>Sign up</button>
                            </>
                        }
                        {
                            isLoggedIn && user &&
                            <>

                                <button className='text-sm font-medium bg-[#F77F00] rounded-full w-12 h-12 ms-1' onClick={() => { setDrofileDropDown(!profileDropDown) }} >
                                    {userDetails && userDetails["Profile Image"] ? <img src={userDetails["Profile Image"]} alt={userDetails?.Username?.charAt(0)} className='w-full h-full rounded-full' /> : <h1 className='text-2xl font-semibold'>{userDetails?.Username?.charAt(0)}</h1>}
                                </button>
                                <div>
                                    <p className='text-xs font-medium'>Hello {userDetails?.Username}</p>
                                    <p className='text-sm font-medium'>Your Profile</p>
                                </div>
                                {
                                    profileDropDown &&
                                    <div className='absolute top-[58px] h-12 z-10 w-40'>
                                        <div className="w-4 ml-[65%] mb-[10px]">
                                            <div className="h-4 bg-[#D9D9D9] rotate-45 transform rounded-sm"></div>
                                        </div>
                                        <div className="flex items-center justify-end w-full h-full">

                                            <div className="bg-[#D9D9D9] p-4 my-6 rounded-lg flex-1 cursor-pointer" >
                                                <p className='text-black hover:text-[#F77F00]' onClick={() => { router.push('/pages/account') }}>My Account</p>
                                                <hr className='border-t-[#858282] bg-[#858282] border-t h-[1px] my-1' />
                                                <p className='text-black hover:text-red-500' onClick={() => { setLogoutModelOpen(true) }}>Logout</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>

                        }
                    </div>
                )}
            </div>
            <div className={`fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition ${logoutModelOpen ? 'flex' : 'hidden'} items-center`}>
                <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
                </div>
                <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                    <div
                        className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">

                        <button onClick={() => { setLogoutModelOpen(false) }} tabIndex="-1" type="button" className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                            <svg title="Close" tabIndex="-1" className="h-4 w-4 cursor-pointer text-gray-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">
                                Close
                            </span>
                        </button>
                        <div className="space-y-2 p-2">
                            <div className="p-4 space-y-2 text-center dark:text-white">
                                <h2 className="text-xl font-bold tracking-tight" id="page-action.heading">
                                    Log me Out
                                </h2>

                                <p className="text-gray-500">
                                    Are you sure you would like to do this?
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div aria-hidden="true" className="border-t dark:border-gray-700 px-2"></div>

                            <div className="px-6 py-2">
                                <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                    <button onClick={() => { setLogoutModelOpen(false) }}
                                        className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                                        <span className="flex items-center gap-1">
                                            <span className="">
                                                Cancel
                                            </span>
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">

                                        <span className="flex items-center gap-1">
                                            <span className="">
                                                Logout
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

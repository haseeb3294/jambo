"use client";
import Image from 'next/image';
import React from 'react';
import clipboard from '../../../../public/assets/images/clipboard.png'

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-65"></div>
            <div className="relative bg-white min-h-1/2 px-12 pb-10 pt-28 rounded-3xl shadow-md w-11/12 md:w-[40%] flex flex-col justify-center items-center">
                <Image src={clipboard} alt='clipboard' height={100} width={100} className='mb-8'/>
                <h1 className="text-2xl font-extrabold mb-4 text-[#484848]">Your Booking has been Placed!</h1>
                <p className='text-base font-medium text-center'>Thank you for your purchase! Now we’re giving you
                    the QR Code with reference number. If you
                    would like to cancel this booking, please
                    let us know within 24 hours.</p>
                <button
                    onClick={onClose}
                    className="mt-4 flex justify-center items-center h-16 w-[70%] bg-[#FFA945] text-white "
                >
                    View QR Code
                </button>
            </div>
        </div>
    );
};

export default Modal;

"use client";
import Image from 'next/image';
import React from 'react';
import qrcode from '../../../../public/assets/images/qrcode.png'
import html2canvas from 'html2canvas';
import QRCode from "react-qr-code";

const ModalQr = ({ isOpenQr = true, onQrClose  , rn , rnD}) => {
    if (!isOpenQr) return null;
    const handleDownloadImage = async () => {
        const element = document.getElementById('print'),
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');

        link.href = data;
        link.download = 'downloaded-image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" >
            <div className="absolute inset-0 bg-black opacity-65"></div>
            <div className="relative bg-white min-h-1/2 px-12 pb-8 pt-24 rounded-3xl shadow-md w-11/12 md:w-[40%] flex flex-col justify-center items-center">
                <div id='print' className='w-full flex flex-col justify-center items-center pt-4 pb-2'>
                <QRCode
                  size={150}
                  value={''+rn+'+START'}
                />
                    <h1 className="text-2xl font-extrabold mb-4 text-[#484848] text-center">Reservation Number:<br />
                        {rnD}</h1>
                </div>
                <div className='flex flex-row gap-2 w-full'>
                    <button
                        onClick={onQrClose}
                        className="mt-4 flex justify-center items-center h-16 w-[45%] bg-[#B8B8B8] text-white "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDownloadImage}
                        className="mt-4 flex justify-center items-center h-16 w-[45%] bg-[#FFA945] text-white "
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalQr;

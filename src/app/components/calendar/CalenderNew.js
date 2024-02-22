"use client";
import React, { useState } from 'react';

export default function CalendarNew() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // Fix: Use useState directly

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const generateCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const startDay = startOfMonth(currentDate);

        for (let i = 1; i <= totalDays; i++) {
            days.push(
                <div
                    key={i}
                    className={`px-[1px] py-[5px] cursor-pointer flex w-[14%] justify-center
                    text-base rounded-full ${isToday(i) ? 'text-white' : 'text-gray-500'
                        } ${isSelectedDay(i) ? 'bg-[#1C5D99] text-white' : ''}`}
                    onClick={() => handleDayClick(i)}
                >
                    <p
                    >
                        {i}
                    </p>
                </div>
            );
        }

        // Add empty cells for the days before the start of the month
        for (let i = 0; i < startDay; i++) {
            days.unshift(
                <div key={`empty-${i}`} className="px-2 py-2 cursor-pointer flex w-[14%] justify-center"></div>
            );
        }

        return days;
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const isSelectedDay = (day) => {
        return selectedDate && day === selectedDate.getDate();
    };

    const handleDayClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setCurrentDate(newDate);
        setSelectedDate(newDate); // Fix: Set selectedDate directly
    };

    const prevMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    const nextMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    return (
        <div className="flex items-center justify-center">
            <div className="max-w-sm w-full shadow-lg">
                <div className="rounded-t">
                    <div className="px-4 flex items-center justify-between">
                        <span tabIndex="0" className="focus:outline-none font-semibold text-sm text-white">
                            {new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(currentDate)}
                        </span>
                        <div className="flex items-center">
                            <button
                                aria-label="calendar backward"
                                className="focus:text-gray-400 hover:text-gray-400 text-white"
                                onClick={prevMonth}
                            >
                                {/* Replace with your left arrow SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-left"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                            </button>
                            <button
                                aria-label="calendar forward"
                                className="focus:text-gray-400 hover:text-gray-400 ml-3 text-white"
                                onClick={nextMonth}
                            >
                                {/* Replace with your right arrow SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-right"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr className="mt-3 h-[.8px] bg-[#4E4E4E]" />
                    <div className="flex flex-col items-center justify-between pt-4 overflow-x-auto w-full">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-xs font-medium text-center text-white">Mo</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-xs font-medium text-center text-white">Tu</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-xs font-medium text-center text-white">We</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-xs font-medium text-center text-white">Th</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-xs font-medium text-center text-white">Fr</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-xs font-medium text-center text-white">Sa</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-xs font-medium text-center text-white">Su</p>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                            </tbody>
                        </table>
                        <div className='flex flex-row flex-wrap w-full h-full '>
                            {/* Generate calendar days */}
                            {generateCalendar().map((day, index) => (
                                <React.Fragment key={index}>{day}</React.Fragment>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

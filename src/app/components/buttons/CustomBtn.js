
export default function CustomBtn({ icon, bg, borderVisible, title, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-row justify-center items-center gap-3 w-[90%] sm:w-[250px] md:w-[380px] h-[48px] rounded-md ${bg ? 'bg-[#F77F00]' : ''} ${borderVisible ? 'border-[1px] border-[#ffffff33]' : ''} `}>
            {icon &&
                icon
            }
            <span className={'text-white text-base font-medium'}>{title}</span>
        </button>
    );
}

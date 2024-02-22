
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CustomInput({ borderVisible, placeHolder, width, height, onChange, value, isRequired, type, minLength, isPasswordInput , handleShowHidePasword}) {
    return (
        <div
            className={`flex flex-row justify-center items-center gap-3 h-[42px] w-[90%] sm:w-[250px] md:w-[380px] rounded-md ${borderVisible ? 'border-[1px] border-[#ffffff33]' : ''} pr-3`}>

            <input minLength={minLength} type={type ? type : 'text'} required={isRequired} className={'text-white text-sm font-normal w-full h-full bg-transparent pl-3 outline-none'} placeholder={placeHolder} onChange={onChange} value={value} />
            {isPasswordInput
                ?
                type != 'password' ? <FaEyeSlash size={14} color="#ffffff" onClick={handleShowHidePasword} className="cursor-pointer" /> : <FaEye size={14} color="#ffffff" onClick={handleShowHidePasword} className="cursor-pointer"/>:<></>
            }
        </div>
    );
}

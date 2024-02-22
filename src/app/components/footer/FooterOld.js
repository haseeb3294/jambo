
export default function FooterOld() {
    return (
        <div className="w-full h-auto flex justify-center items-center mt-20 bg-[#1A1A1A] pb-8">
            <div className="w-[80%] h-auto pt-6 flex flex-col sm:flex-row justify-between bg-transparent text-white gap-3 bg-[#131313]">
                <div className="w-full sm:w-1/2 h-auto flex flex-col gap-8">
                    <h1 className={`text-4xl font-normal`}>Header</h1>
                    <p className="text-[14px] font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare cursus sed nunc eget dictum  Sed ornare cursus sed nunc eget dictumd nunc eget dictum  Sed ornare cursus sed nunc eget dictum
                    </p>
                </div>
                <div className="w-full sm:w-1/2 h-auto flex flex-col items-center gap-8">
                    <h1 className={`text-4xl font-normal`}>Header Text</h1>
                    <p className="text-[14px] font-normal">
                        Button 1
                    </p>
                    <p className="text-[14px] font-normal">
                        Button 2
                    </p>
                    <p className="text-[14px] font-normal">
                        Button 3
                    </p>
                    <p className="text-[14px] font-normal">
                        Button 4
                    </p>
                </div>
            </div>
        </div>
    )
}

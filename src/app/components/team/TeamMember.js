import Image from "next/image";

export default function TeamMember({image , name ,designation}) {
  return (
    <div className="w-full md:w-1/4 px-2 py-4 flex justify-center flex-col items-center gap-2">
      <Image src={image} className="w-52 h-52" alt="member image" />
      <div>
        <p className="font-medium text-2xl text-white text-center mt-1">{name}</p>
        <p className="font-medium text-sm text-[#717171] text-center mt-1">{designation}</p>
      </div>
    </div>
  )
}

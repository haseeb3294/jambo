
export default function PyamentCustomInput({placeholder , onChange , value , pattern}) {
  return (
    <input placeholder={placeholder} type="text" className="bg-[#171717] px-3 h-14 w-full rounded-lg" value={value} onChange={onChange}/>
  )
}

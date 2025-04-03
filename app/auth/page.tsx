
import { FaTelegram } from "react-icons/fa"
import Social from "./_components/social"
import StateAuth from "./_components/state"
import { ModeToggle } from "@/components/shared/mode-toggle"

const page = () => {
  return (
    <div className="mx-auto max-w-md h-screen flex justify-center items-center flex-col space-y-4 ">
        <FaTelegram size={120} className="text-blue-500" />

        <div className="flex justify-center items-center gap-3">
            <h1 className="text-center text-3xl font-bold" >Telegram</h1>
            <ModeToggle />
        </div>
        
        <StateAuth />
        <Social />
    </div>
  )
}

export default page
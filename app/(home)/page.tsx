'use client'

// import { Button } from "@/components/ui/button"
// import { Loader } from "lucide-react"
import { useCurrentContact } from "@/hooks/use-current"
import ContactList from "./_components/contact-list"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddContact from "./_components/add-contact";

const Home = () => {
  const { currentContact } = useCurrentContact();
  const router = useRouter();

  useEffect(() => {
    router.push('/')
  }, [])

  console.log(currentContact);
  

  return (
    <div>
      {/* {sidebar } */}
      <div className="w-80 h-screen inset-0 border-r fixed">
        {/* Loading  */}
        {/* <div className="w-full h-full flex items-center justify-center">
          <Loader size={50} className="animate-spin" />
        </div> */}

        {/* contacts */}
        <ContactList contacts={contacts} />
      </div>
      {/* chat */}
      <div className="pl-80 w-full h-screen">
          {!currentContact?._id && <AddContact />}
          
          {currentContact?._id && <div>Chat with {currentContact?.email.split('@')[0]}</div>}
      </div>
    </div>
  )
} 


const contacts = [
  {
    email: "john@gmail.com",
    _id: "sasa1442",
    avatar: "https://github.com/shadcn.png"
  },
  {
    email: "jane@gmail.com",
    _id: "sasa1443"
  },
  {
    email: "bob@gmail.com",
    _id: "sasa1444"
  },
  {
    email: "alice@gmail.com",
    _id: "sasa1445"
  },
  {
    email: "charlie@gmail.com",
    _id: "sasa1446"
  }
]

export default Home
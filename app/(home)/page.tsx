'use client'

// import { Button } from "@/components/ui/button"
// import { Loader } from "lucide-react"
import { useCurrentContact } from "@/hooks/use-current"
import ContactList from "./_components/contact-list"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddContact from "./_components/add-contact";
import { emailSchema, messageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChatNavbar from "./_components/chat-navbar";
import Chat from "./_components/chat";

const Home = () => {
  const { currentContact } = useCurrentContact();
  const router = useRouter();

  useEffect(() => {
    router.push('/')
  }, [])

  const contactForm = useForm<z.infer<typeof emailSchema>>({
      resolver: zodResolver(emailSchema),
      defaultValues: {
        email: "",
      },
  })

  const messageForm = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
		defaultValues: { text: '', image: '' },
	})

  const onCreateContact = (values: z.infer<typeof emailSchema>) => {
    console.log(values)
  }

  const onSubmitMessage = async (values: z.infer<typeof messageSchema>) => {
    console.log(values)
  }
  

  return (
    <div className="w-full h-screen">
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
          {!currentContact?._id && <AddContact contactForm={contactForm} onCreateContact={onCreateContact} />}
          
          {currentContact?._id && (
            <div className="w-full relative">
              <ChatNavbar />

              <Chat 
                messageForm={messageForm}
							  onSubmitMessage={onSubmitMessage} 
              />
            </div>
          )}
      </div>
    </div>
  )
} 


const contacts = [
  {
    email: "john@gmail.com",
    _id: "sasa1442",
    avatar: "https://github.com/shadcn.png",
    firstName: "John",
    lastName: "Doe",
    bio: "I am a software developerThis action cannot be undone. This will permanently delete your account and remove your data from our servers."
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
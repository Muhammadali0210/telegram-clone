import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCurrentContact } from '@/hooks/use-current'
import { Settings2 } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const ChatNavbar = () => {
    const { currentContact } = useCurrentContact()
    return (
        <div className='flex justify-between items-center gap-2 p-2 dark:bg-gray-900 border-b h-[8vh]'>
            <div className='flex items-center gap-2'>
                <div className='relative'>
                    <Avatar>
                        <AvatarImage src={currentContact?.avatar} alt="@shadcn" />
                        <AvatarFallback className='uppercase'>{currentContact?.email[0]}</AvatarFallback>
                    </Avatar>
                    <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full'></div>
                </div>
                <div>
                    <h2 className='font-semibold text-sm capitalize line-clamp-1 '>{currentContact?.email.split('@')[0]}</h2>
                    <p className='text-xs line-clamp-1 text-muted-foreground'>No message yet</p>
                </div>
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={'secondary'} size={"icon"}>
                        <Settings2 />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <div className='flex items-center gap-2'>
                            <Avatar className='w-10 h-10'>
                                <AvatarImage src={currentContact?.avatar} alt={currentContact?.email} className='object-cover' />
                                <AvatarFallback className='text-6xl uppercase font-spaceGrotesk'>{currentContact?.email[0]}</AvatarFallback>
                            </Avatar>
                            <div className=''>
                                <h1 className='capitalize font-spaceGrotesk text-xl font-bold'>JohnDoe</h1>
                                <p className='font-spaceGrotesk text-xs'>{currentContact?.email}</p>
                            </div>
                        </div>

                        <div className='flex flex-col space-y-1'>

                            <SheetTitle>Bio</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>

                            <Separator className='my-2' />

                            <h2 className='text-xl'>Image</h2>
                            <div className='flex flex-col space-y-2'>
                                <div className='w-full h-36 relative'>
                                    <Image src={currentContact?.avatar} alt="sasa" fill className='object-cover rounded-md' />
                                </div>
                            </div>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ChatNavbar
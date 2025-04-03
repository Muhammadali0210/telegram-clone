'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IUser } from '@/types'
import React, { FC } from 'react'
import Settings from './settings'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useCurrentContact } from '@/hooks/use-current'
import { cn } from '@/lib/utils'

const ContactList: FC<{contacts: IUser[]}>  = ({contacts}) => {
    const router = useRouter()
    const { setCurrentContact, currentContact } = useCurrentContact()
    const renderContact = (contact: IUser) => {
        const onChat = () => {
            if(currentContact?._id === contact._id) return;
            setCurrentContact(contact)
            router.push(`/?chat=${contact._id}`)
        };

        return ( 
            <div className={cn('flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/50', currentContact?._id === contact._id && 'bg-secondary/50')} onClick={onChat}>
                <div className='flex items-center gap-2'>
                    <div className='relative'>
                        <Avatar>
                            <AvatarImage src={contact?.avatar} alt="@shadcn" />
                            <AvatarFallback className='uppercase'>{contact?.email[0]}</AvatarFallback>
                        </Avatar>
                        <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full'></div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-sm capitalize line-clamp-1 '>{contact?.email.split('@')[0]}</h2>
                        <p className='text-xs line-clamp-1 text-muted-foreground'>No message yet</p>
                    </div>
                </div>
                <div className='self-end'>
                    <p className='text-xs text-muted-foreground'>15:42 PM</p>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className='flex items-center p-2 gap-2 border-b'>
                <Settings />
                <div className='w-full'>
                    <Input placeholder='Search...' className='w-full bg-secondary h-9' />
                </div>
            </div>
            {contacts.length === 0 && (
                <div className='w-full h-[95vh] flex items-center justify-center'>Contact list is empty</div>)
            }

            {contacts.length > 0 && (
                <div className='w-full h-[95vh] overflow-y-auto'>
                    {contacts.map((contact) => (
                        <div key={contact._id}>{renderContact(contact)}</div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ContactList
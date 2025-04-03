import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { emailSchema } from '@/lib/validation'
import React, { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FaTelegram } from 'react-icons/fa'
import { z } from 'zod'

interface Props {
  contactForm: UseFormReturn<z.infer<typeof emailSchema>>
  onCreateContact: (values: z.infer<typeof emailSchema>) => void
}

const AddContact: FC<Props> = ({contactForm, onCreateContact}) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='max-w-md w-full flex flex-col items-center gap-4'>
        <FaTelegram size={120} className="text-blue-500" />
        <h1 className="text-center text-3xl font-bold" >Add contact to start messaging</h1>
        <div className='w-full'>
            <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onCreateContact)} className="space-y-2">
                    <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                            <Input placeholder="Enter your email" className='h-10' {...field} />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className='h-10 w-full'>Add to contact</Button>
                </form>
            </Form>
        </div>
             
      </div>
    </div>
  )
}

export default AddContact
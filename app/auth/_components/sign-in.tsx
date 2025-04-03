import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { emailSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignIn = () => {
    const { setStep, setEmail } = useAuth()

    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
          email: "",
        },
    })

    function onSubmit(values: z.infer<typeof emailSchema>) {
        console.log(values)
        setStep('verify')
        setEmail(values.email)
    }


    return (
        <div className='w-full space-y-2'>
            <p className="text-center text-muted-foreground text-sm">Telegram is a cloud-based messaging app known for its speed and security. It allows users to send messages, photos, videos, and files of any type, as well as create groups and channels for broadcasting messages to large audiences.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                    control={form.control}
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
                    <Button type="submit" className='h-10 w-full'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignIn
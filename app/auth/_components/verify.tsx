"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { otpSchema } from "@/lib/validation"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { Input } from "@/components/ui/input"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const Verify = () => {
  const { email } = useAuth()

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  })
 
  function onSubmit(data: z.infer<typeof otpSchema>) {
    console.log(data)
    window.open('/', '_single')
  }
  return (
    <div className="w-full space-y-2">
      <p className="text-center text-muted-foreground text-sm">We send a one-time password (OTP) to your email</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                      <Input placeholder="Enter your email" disabled className='h-10' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <Label>One-Time Password</Label>
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="w-full" pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot index={0} className="w-full" />
                      <InputOTPSlot index={1} className="w-full"/>
                      <InputOTPSlot index={2} className="w-full"/>
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot index={3} className="w-full"/>
                      <InputOTPSlot index={4} className="w-full"/>
                      <InputOTPSlot index={5} className="w-full"/>
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type="submit" className="h-10 w-full">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Verify
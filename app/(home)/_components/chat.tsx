// import ChatLoading from "@/components/loadings/chat.loading"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { messageSchema } from "@/lib/validation"
import { Paperclip, Send, Smile } from "lucide-react"
import { FC, useRef, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import Picker from '@emoji-mart/react'
import emojies from '@emoji-mart/data'
import { useTheme } from "next-themes"

interface Props {
    onSubmitMessage: (values: z.infer<typeof messageSchema>) => Promise<void>
    messageForm: UseFormReturn<z.infer<typeof messageSchema>>
}

const Chat: FC<Props> = ({ onSubmitMessage, messageForm }) => {
    const [open, setOpen] = useState(false)
    const { resolvedTheme } = useTheme()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleEmojiSelect = (emoji: string) => {
		const input = inputRef.current
		if (!input) return

		const text = messageForm.getValues('text')
		const start = input.selectionStart ?? 0
		const end = input.selectionEnd ?? 0

		const newText = text.slice(0, start) + emoji + text.slice(end)
		messageForm.setValue('text', newText)

		setTimeout(() => {
			input.setSelectionRange(start + emoji.length, start + emoji.length)
		}, 0)
	}

    return (
        <div className='flex flex-col justify-end z-40 min-h-[92vh] h-full sidebar-custom-scrollbar overflow-y-scroll'>
            {/* <ChatLoading /> */}

            <div className='w-full h-[80vh] flex items-center justify-center'>
                <div className='text-[100px] cursor-pointer' onClick={() => onSubmitMessage({ text: '✋' })}>
                    ✋
                </div>
            </div>

            <div className="w-full dark:bg-gray-900 p-2">
                <Form {...messageForm}>
                    <form onSubmit={messageForm.handleSubmit(onSubmitMessage)} className='w-full flex relative gap-2' >
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button size={'icon'} type='button' variant={'secondary'}>
                                    <Paperclip />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle />
                                </DialogHeader>
                                {/*  */}
                            </DialogContent>
                        </Dialog>

                        <FormField
                            control={messageForm.control}
                            name='text'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input
                                            className='bg-secondary h-9'
                                            placeholder='Type a message'
                                            value={field.value}
                                            onChange={field.onChange}
                                            ref={inputRef} 
                                        // sasasa
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button size='icon' type='button' variant='secondary'>
                                    <Smile />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='p-0 border-none rounded-md absolute right-6 bottom-0'>
                                <Picker
                                    data={emojies}
                                    theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                                    onEmojiSelect={(emoji: { native: string }) => handleEmojiSelect(emoji.native)}
                                />
                            </PopoverContent>
                        </Popover>

                        <Button type='submit'>
                            <span className="max-lg:hidden font-semibold">Send</span>
                            <Send />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Chat
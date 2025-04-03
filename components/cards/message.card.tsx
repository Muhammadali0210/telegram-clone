import { useCurrentContact } from '@/hooks/use-current'
import { CONST } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { IMessage } from '@/types'
import { format } from 'date-fns'
import { Check, CheckCheck, Edit2, Trash } from 'lucide-react'
import { FC } from 'react'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '../ui/context-menu'
import Image from 'next/image'

interface Props {
	message: IMessage
	onReaction: (reaction: string, messageId: string) => Promise<void>
	onDeleteMessage: (messageId: string) => Promise<void>
}
const MessageCard: FC<Props> = ({ message, onReaction, onDeleteMessage }) => {
	const { currentContact, setEditedMessage } = useCurrentContact()

	const reactions = ['👍', '😂', '❤️', '😍', '👎']

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<div
					className={cn(
						'm-2.5 font-medium text-xs flex',
						message.receiver._id === currentContact?._id ? 'justify-start' : 'justify-end'
					)}
				>
					<div
						className={cn(
							'relative inline p-2 pl-2.5 pr-12 max-w-full',
							message.receiver._id === currentContact?._id ? 'bg-primary' : 'bg-secondary'
						)}
					>
						
						Hello world
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className='w-56 p-0 mb-10'>
				<ContextMenuItem className='grid grid-cols-5'>
					{reactions.map(reaction => (
						<div
							key={reaction}
							className={cn(
								'text-xl cursor-pointer p-1 hover:bg-primary/50 transition-all',
								message.reaction === reaction && 'bg-primary/50'
							)}
							onClick={() => onReaction(reaction, message._id)}
						>
							{reaction}
						</div>
					))}
				</ContextMenuItem>
				{message.sender._id !== currentContact?._id && (
					<>
						<ContextMenuSeparator />
						{!message.image && (
							<ContextMenuItem className='cursor-pointer' onClick={() => setEditedMessage(message)}>
								<Edit2 size={14} className='mr-2' />
								<span>Edit</span>
							</ContextMenuItem>
						)}
						<ContextMenuItem className='cursor-pointer' onClick={() => onDeleteMessage(message._id)}>
							<Trash size={14} className='mr-2' />
							<span>Delete</span>
						</ContextMenuItem>
					</>
				)}
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default MessageCard

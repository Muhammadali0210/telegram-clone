export interface IUser {
    _id: string,
    email: string
}

export interface IMessage {
	_id: string
	text: string
	image: string
	reaction: string
	sender: IUser
	receiver: IUser
	createdAt: string
	updatedAt: string
	status: string
}

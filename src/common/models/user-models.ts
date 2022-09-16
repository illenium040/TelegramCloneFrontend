export interface UserDTO {
    id: string
    avatar: string
    email: string
    name: string
}

export interface UserLoggedIn {
    id: string
    avatar: string
    email: string
    name: string
    token: string
}

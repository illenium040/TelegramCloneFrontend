export interface UserDTO {
    id: string
    avatar: string
    email: string
    name: string
    loginName: string
}

export interface UserLoggedIn {
    id: string
    avatar: string
    email: string
    displayName: string
    loginName: string
    token: string
}

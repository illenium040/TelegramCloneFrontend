import { serverHost } from '../extensions/axios-extensions'
import { UserDTO } from '../models/user-models'
import axios from 'axios'

export class UserService {
    //dbg function to take user without login in
    public async getUserByName(name: string) {
        let x = await axios.get<UserDTO>(serverHost + `/api/db/user/${name}`)
        return x?.data
    }
}

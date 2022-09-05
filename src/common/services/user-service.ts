import { UserDTO } from '../models/user-models'
import axios from 'axios'
import { serverHost } from 'common/constants'

export class UserService {
    //dbg function to take user without login in
    public async getUserByName(name: string) {
        let x = await axios.get<UserDTO>(serverHost + `/api/db/user/${name}`)
        return x?.data
    }
}

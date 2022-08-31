import { serverHost } from './../extensions/axios-extensions';
import { UserDTO } from '../models/user-models';
import axios from 'axios';
import { tryAxiosRequest } from '../extensions/axios-extensions';

export class UserService {

    //dbg function to take user without login in
    public async getUserByIndex(index: number) {
        let x = await axios.get<UserDTO>(serverHost + `/api/db/user/${index}`)
        return x?.data;
    }

}
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverHost } from 'common/constants'
import { UserDTO } from 'common/models/user-models'

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: serverHost }),
    endpoints: build => ({
        getUserByName: build.query<UserDTO, string>({
            query: (userName: string) => `/api/db/user/${userName}`
        })
    })
})

export const { useGetUserByNameQuery } = userApi

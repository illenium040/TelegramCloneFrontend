import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RequestResult } from "api/common-api-types"
import { serverHost } from "common/constants"
import { UserDTO, UserLoggedIn } from "common/models/user-models"

type LoginQuery = {
    email: string
    password: string
}

type RegisterQuery = {
    email: string
    displayName: string
    password: string
}

export const userApi = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: serverHost,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: build => ({
        getUserByName: build.query<UserLoggedIn, string>({
            query: (userName: string) => `/api/user/${userName}`
        }),
        login: build.mutation<RequestResult<UserLoggedIn>, LoginQuery>({
            query: (q: LoginQuery) => ({
                body: q,
                url: `/api/user/login`,
                method: "POST"
            })
        }),
        register: build.mutation<RequestResult, RegisterQuery>({
            query: (q: RegisterQuery) => ({
                body: q,
                url: `/api/user/register`,
                method: "POST"
            })
        })
    })
})

export const { useGetUserByNameQuery, useLoginMutation, useRegisterMutation } = userApi

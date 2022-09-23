import { useLoginMutation } from "api/user"
import { UserDTO } from "common/models/user-models"
import { Loader } from "pages/Loaders"
import { FullPageLoader } from "pages/Loaders/Loader"
import { Navigate, useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    const [login, loginState] = useLoginMutation()
    const handleLogin = async () => {
        const email = (document.getElementsByName("email")[0] as HTMLInputElement).value
        const password = (document.getElementsByName("password")[0] as HTMLInputElement).value
        login({
            email: email,
            password: password
        })
    }

    if (loginState.isSuccess) {
        localStorage.setItem(
            "user",
            JSON.stringify({
                avatar: loginState.data?.data?.avatar,
                email: loginState.data?.data?.email,
                id: loginState.data?.data?.id,
                name: loginState.data?.data?.displayName,
                loginName: loginState.data?.data?.loginName
            } as UserDTO)
        )
        localStorage.setItem("token", loginState.data?.data?.token!)
        return <Navigate to="/" />
    }
    return (
        <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            {loginState.isLoading && <FullPageLoader loaderWidth={64} />}
            <section className="flex w-[30rem] flex-col space-y-10">
                <div className="text-center text-4xl font-medium">Log In</div>

                <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email or Username"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>

                <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>

                <button
                    disabled={loginState.isLoading}
                    onClick={handleLogin}
                    className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
                    LOG IN
                </button>

                {/* <a
                    href="#"
                    className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">
                    FORGOT PASSWORD?
                </a> */}

                <p className="text-center text-lg">
                    <a
                        onClick={() => navigate("/register")}
                        className="font-medium text-indigo-500 underline-offset-4 hover:underline cursor-pointer">
                        Register
                    </a>
                </p>
            </section>
        </main>
    )
}

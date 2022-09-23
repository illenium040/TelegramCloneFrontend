import { useRegisterMutation } from "api/user"
import { useNavigate } from "react-router-dom"
import { FullPageLoader } from "pages/Loaders/Loader"

export const Register = () => {
    const [register, registerState] = useRegisterMutation()
    const navigate = useNavigate()
    const handleCreateAccount = () => {
        const name = (document.getElementsByName("name")[0] as HTMLInputElement).value
        const email = (document.getElementsByName("email")[0] as HTMLInputElement).value
        const password = (document.getElementsByName("password")[0] as HTMLInputElement).value
        register({
            displayName: name,
            email: email,
            password: password
        })
            .unwrap()
            .then(result => console.log(result))
    }
    if (registerState.isSuccess) setTimeout(() => navigate("/login"), 2000)
    return (
        <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            {registerState.isLoading && <FullPageLoader loaderWidth={64} />}
            <section className="flex w-[30rem] flex-col space-y-10">
                <div className="text-center text-4xl font-medium">Register</div>

                <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        type="text"
                        name="name"
                        placeholder="Username"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>
                <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
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
                    disabled={registerState.isLoading}
                    onClick={handleCreateAccount}
                    className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
                    REGISTER
                </button>

                <p className="text-center text-lg">
                    <a
                        onClick={() => navigate("/login")}
                        className="font-medium text-indigo-500 underline-offset-4 hover:underline cursor-pointer">
                        Sign in
                    </a>
                </p>
                {/* TMP solution for this */}
                {registerState.isSuccess && <p className="text-green-400"> Вы успешно зарегестрированы</p>}
            </section>
        </main>
    )
}

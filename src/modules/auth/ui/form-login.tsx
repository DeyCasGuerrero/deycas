"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useAuth } from "../../../context/auth-context"

export default function FormLogin() {
    const { login } = useAuth()
    const [auth, setAuth] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = e.target;
        setAuth((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            await login(auth.email, auth.password)
            setSuccess("Inicio de sesión exitoso")
        } catch (requestError) {
            setError("No se pudo iniciar sesión. Revisa tus credenciales o el endpoint.")
            console.error(requestError)
        } finally {
            setLoading(false)
        }

    }


    return (
        <form onSubmit={handleSubmit} className="w-screen min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
            <div className="relative py-3 sm:max-w-xs sm:mx-auto">
                <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900  rounded-xl shadow-lg">
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex flex-col items-center justify-center gap-2 mb-8">
                            <a href="https://amethgalarcio.web.app/" target="_blank">
                                <img src="https://amethgalarcio.web.app/assets/logo-42fde28c.svg" className="w-8" />
                            </a>
                            <p className="m-0 text-[16px] font-semibold dark:text-white">Login to your Account</p>
                            <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">Get started with our app, just start section and enjoy experience.
                            </span>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400 ">Username</label>
                            <input 
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" 
                                placeholder="email"
                                name="email" 
                                value={auth.email}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold text-xs text-gray-400 ">Password</label>
                        <input 
                        type="password" 
                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" 
                        placeholder="••••••••" 
                        name="password"
                        value={auth.password}
                        onChange={handleChange}
                        />

                    </div>
                    {error && (
                        <p className="mb-4 text-sm text-red-500">{error}</p>
                    )}
                    {success && (
                        <p className="mb-4 text-sm text-green-600">{success}</p>
                    )}
                    <div className="mt-5">
                        <button type="submit" disabled={loading} className="py-1 px-8 bg-blue-500 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">{loading ? "Ingresando..." : "Login"}</button>
                    </div>
                </div>
            </div>
        </form>

    )
}
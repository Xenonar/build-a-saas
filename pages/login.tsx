import { NextPage } from "next";
import { useEffect } from "react"
import { useUser } from "./context/user";

const Login:NextPage = () =>{
    const { login } = useUser()
    useEffect(login,[])
    return <p> Logging in </p>
}

export default Login
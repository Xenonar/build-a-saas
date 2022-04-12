import { NextPage } from "next";
import { useEffect } from "react"
import { useUser } from "./context/user";

const Logout:NextPage = () =>{
    const { logout } = useUser()
    useEffect(logout,[])
    return <p> Logging out </p>
}

export default Logout;
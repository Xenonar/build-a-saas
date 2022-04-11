import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react"
import { supabase } from "../utils/supabase"

const Logout:NextPage = () =>{
    const router = useRouter();
    useEffect(()=>{
        const logout = async ()=>{
            await supabase.auth.user() 
            router.push('/');
        }
        logout();

    },[])
    return <p> Logging out </p>
}

export default Logout;
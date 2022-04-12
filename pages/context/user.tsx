import { useRouter } from "next/router";
import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const Context = createContext()

const Provider = ({children}:{children:any})=>{
    const [user, setUser] = useState(supabase.auth.user())
    const router = useRouter()
    useEffect(()=>{
        const getUserProfile = async () =>{
            const sessionUser = supabase.auth.user()
            if(sessionUser){
                const {data:profile} = await supabase.from('profile').select('*').eq('id',sessionUser.id).single()

                setUser({
                    ...sessionUser,
                    ...profile,
                })
            }
        }
        getUserProfile();
        supabase.auth.onAuthStateChange(()=>{
            getUserProfile();
        })
    },[])

    const login = async () =>{
        const { user, session, error } = await supabase.auth.signIn({
            provider: "github",
        })
    }
    const logout = async ()=>{
        await supabase.auth.signOut() 
        setUser(null)
        router.push('/');

    }

    const expose = {
        user,
    }
    return (
        <Context.Provider value={expose}>{children}</Context.Provider>)
}
//NEED to export this
export const useUser = () => useContext(Context);
export default Provider;
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {supabase} from "../utils/supabase"

const LessonDetails:NextPage = ({lesson}:{lesson:any}) =>{
    const router = useRouter();
    // console.log({lesson});
    // console.log(supabase.auth.user());
    useEffect(()=>{
        const user:any = supabase.auth.user()
        if(user == null){
            router.push('/')
        }

    },[])
    return <div className="w-full max-w-3xl mx-auto py-16 px-8">
        <h1 className="text-3xl mb-6">{lesson.title}</h1>
        <p className="text-xl">{lesson.description}</p></div>
}

//pre-render all possible paths
export const getStaticPaths:GetStaticPaths = async () =>{
    const { data: lessons}  = await supabase.from('lesson').select('id')
    // console.log('LESSONS', lessons)
    const paths = lessons.map(({id})=>({
        params: {
            id: id.toString(),
        }
    }))

    return {
        paths,
        //for none path and return 404 page
        fallback: false,
    }
}
// call for all possible paths
export const getStaticProps:GetStaticProps = async ({params: {id}}) =>{
    const {data:lesson} = await supabase.from('lesson').select('*').eq('id',id).single()

    return {
        props:{
            lesson,
        },
    }

}

export default LessonDetails;


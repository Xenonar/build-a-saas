import type { NextPage } from 'next'
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import {supabase} from "../utils/supabase"
import Link from 'next/link';

const Home: NextPage = ({lessons}:{lessons:any}) => {
  // console.log({lessons});
  // check user successfully login
  const [login, setLogin] = useState(true);
  useEffect(()=>{
    if(supabase.auth.user()!==null){
      setLogin(false)
    }
  },[])
  
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {login && 
       <Link href={`/login`}><a className="p-8 h-40 mb-4 rounded shadow text-xl flex">Login</a></Link>
      }
      {lessons.map((lesson: { id: Key | null | undefined; title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => (
        <Link key={lesson.id} href={`/${lesson.id}`}><a className="p-8 h-40 mb-4 rounded shadow text-xl flex">{lesson.title}</a></Link>
      ))}
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const { data: lessons}  = await supabase.from('lesson').select('*')

  return {
    props:{
      lessons,
    },
  }
}

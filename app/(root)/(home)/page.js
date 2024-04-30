"use client"

import handleClick from '@/actions/handleClick.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const page = () => {
  const [prompt, setPrompt] = useState("");
  const [details, setDetails] = useState({
    history:"",
    culture:"",
    food:"",
    religion:""
  })

  const inputClick = async()=>{
    const data = await handleClick(prompt);

    console.log(data.answer.history);
    setDetails({
      history:data.answer.history,
      culture:data.answer.culture,
      food:data.answer.food,
      religion:data.answer.religion
    })
  }
  return (
    <div className='flex w-full h-screen py-20 px-16 gap-5'>
        <section className='w-[30%] border border-black h-[70%] bg-slate-600 p-14'>
            <div className='flex flex-col gap-5'>
              <Input 
                placeholder="Enter any City"
                onChange ={(e)=>setPrompt(e.target.value)}
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button onClick={inputClick}>Submit</Button>
            </div>
        </section>
        <section className='w-[70%] border border-black h-[70%] overflow-scroll py-4 px-6'>
          <ul>
            <li><span className='font-bold'>History:  </span>{details.history}</li>
            <li><span className='font-bold'>Culture:  </span>{details.culture}</li>
            <li><span className='font-bold'>Food:  </span>{details.food}</li>
            <li><span className='font-bold'>Religion:  </span>{details.religion}</li>
          </ul>
        </section>
    </div>
    
  )
}

export default page
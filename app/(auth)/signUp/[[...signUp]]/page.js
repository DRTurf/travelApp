import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='h-screen flex-center'>
        <SignUp/>
    </div>
  )
}

export default SignUpPage
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='h-screen flex-center'>
        <SignIn/>
    </div>
  )
}

export default SignInPage
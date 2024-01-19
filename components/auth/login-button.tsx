"use client"


import {Simulate} from "react-dom/test-utils";
import React from "react";
import {useRouter} from "next/navigation";

interface LoginButtonProps{
children:React.ReactNode,
    mode?:'modal'| "redirect",
    asChild?:boolean
}

const LoginButton = ({children, mode='redirect', asChild}:LoginButtonProps) => {



    const router = useRouter()
    if(mode === 'modal'){
        return (
            <span>
                Todo:Implement modal
            </span>
        )
    }

    const onClick = () => {
     router.push('/auth/login')
    }
    return (

        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}

export default LoginButton
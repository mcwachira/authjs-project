"use client"

import {BeatLoader} from "react-spinners";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {db} from "@/lib/db";
import {newVerification} from "@/actions/new-verification";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";

export const NewVerificationForm = () =>{

    const searchParams = useSearchParams()
    const router = useRouter()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")


    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if(success || error) return

        if(!token){
            setError('Missing Token!')

            return
        }

  newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error)
  }).catch(() => {
      setError('Something went wrong')
  })

    }, [token, success, error])


    //change to call use effect one
    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper backButtonLabel="Back to login"
                     backButtonHref="/auth/login"
            headerLabel="Confirm your verification"  >

            <div className="flex items-center w-full justify-center">


                {!success && !error  &&( <BeatLoader/>)}


                <FormSuccess message={success}/>
                {!success &&(
                    <FormError message={error}/>
                )}

            </div>


        </CardWrapper>  )
}
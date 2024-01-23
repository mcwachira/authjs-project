"use client"

import React, {FunctionComponent, useState, useTransition} from 'react';
import {CardWrapper} from "@/components/auth/card-wrapper";
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {LoginSchema, ResetSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {reset} from "@/actions/reset";

interface OwnProps {}

type Props = OwnProps;

export const ResetForm: FunctionComponent<Props> = (props) => {
 const [isPending, startTransition] = useTransition()

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const form  = useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues:{
            email:"",

        },
    })


    const onSubmit = (values:z.infer<typeof ResetSchema>) => {


        setError("")
        setSuccess("")
        //beneficial when caching
        startTransition(() => {

            //or api routes
            reset(values).then((data)  => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
            })
        })

    }
    return (

        <CardWrapper

            headerLabel='Forgot Your Password '
            backButtonLabel='Back to login '
            backButtonHref='/auth/login'

        >

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit) } className='space-y-6'>

                    <div className="space-y-4">
                        <FormField control={form.control} name='email' render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input {...field}  disabled={isPending} placeholder="john.doe@example.com" type='email'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />


                    </div>

                    <FormError message={error}/>
                    <FormSuccess message={success}/>


                    <Button type='submit' className='w-full ' disabled={isPending}>
                     Reset Password
                    </Button>

                </form>
            </Form>
        </CardWrapper>


    );
};



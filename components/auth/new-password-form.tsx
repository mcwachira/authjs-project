"use client"

import React, {FunctionComponent, useState, useTransition} from 'react';
import {CardWrapper} from "@/components/auth/card-wrapper";
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {LoginSchema, NewPasswordSchema, ResetSchema} from "@/schemas";
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
import {newPassword} from "@/actions/new-password";

interface OwnProps {}

type Props = OwnProps;

export const NewPasswordForm: FunctionComponent<Props> = (props) => {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [isPending, startTransition] = useTransition()

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const form  = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver:zodResolver(NewPasswordSchema),
        defaultValues:{
            password:"",
            confirmPassword:""
        },
    })


    const onSubmit = (values:z.infer<typeof NewPasswordSchema>) => {


        setError("")
        setSuccess("")
        //beneficial when caching
        startTransition(() => {

            //or api routes
            newPassword(values, token).then((data)  => {
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

            headerLabel='Enter a new Password '
            backButtonLabel='Back to login '
            backButtonHref='/auth/login'

        >

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit) } className='space-y-6'>

                    <div className="space-y-4">
                        <FormField control={form.control} name='password' render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>

                                <FormControl>
                                    <Input {...field}  disabled={isPending} placeholder="********" type='password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField control={form.control} name='confirmPassword' render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>

                            <FormControl>
                                <Input {...field}  disabled={isPending} placeholder="********" type='password'/>
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



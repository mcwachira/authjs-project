"use client"

import React, {FunctionComponent, useState, useTransition} from 'react';
import {CardWrapper} from "@/components/auth/card-wrapper";
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {RegisterSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";

interface OwnProps {}

type Props = OwnProps;

export const RegisterForm: FunctionComponent<Props> = (props) => {

    const [isPending, startTransition] = useTransition()

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const form  = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
        },
    })


    const onSubmit = (values:z.infer<typeof RegisterSchema>) => {


        setError("")
        setSuccess("")
        //beneficial when caching
        startTransition(() => {

            //or api routes
            register(values).then((data)  => {
                setError(data.error)

            setSuccess(data.success)
            })
        })

    }
  return (

      <CardWrapper

      headerLabel='Create an account '
      backButtonLabel='Have an account ?'
      backButtonHref='/auth/login'
      showSocial
      >

          <Form {...form}>

              <form onSubmit={form.handleSubmit(onSubmit) } className='space-y-6'>

                  <div className="space-y-4">

                      <FormField control={form.control} name='name' render={({field}) => (
                          <FormItem>
                              <FormLabel>Name </FormLabel>

                              <FormControl>
                                  <Input {...field}  disabled={isPending} placeholder="john doe" type='name'/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                      />
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

                      <FormField control={form.control} name='password' render={({field}) => (
                          <FormItem>
                              <FormLabel>Password</FormLabel>

                              <FormControl>
                                  <Input {...field}  disabled={isPending} placeholder="*********" type='password'/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                      />
                  </div>

                  <FormError message={error}/>
                  <FormSuccess message={success}/>


              <Button type='submit' className='w-full ' disabled={isPending}>
                  Register
              </Button>

              </form>
          </Form>
  </CardWrapper>


  );
};



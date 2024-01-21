"use server"
import * as z from 'zod'
import {LoginSchema} from "@/schemas";
import {db} from "@/lib/db";
import bcrypt from "bcrypt";

export const login =async (values:z.infer<typeof  LoginSchema>) => {


    //server side validation
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:'Invalid fields!'}
    }

    const { email, password} = validatedFields.data

    const user = await db.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        return {error:'User has not been registered!'}
    }
    //check if login password is the same as user password


    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return {error: 'invalid password!'}

                          // await db.user.


    return {success: 'Email is sent'}
}
"use server"
import * as z from 'zod'
import {LoginSchema} from "@/schemas";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

export const login =async (values:z.infer<typeof  LoginSchema>) => {


    //server side validation
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:'Invalid fields!'}
    }

    const { email, password} = validatedFields.data


    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error:'Email does not exist'}
    }


    //generating token for users who have not verified their email address
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {success:'Confirmation Email sent'}
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT,
        })
    }catch(error){
        if(error  instanceof AuthError ){
            switch(error.type){
                case 'CredentialsSignin':
                    return {error:'Invalid credentials'}
                default:
                    return {error:'something went wrong!'}
            }
        }

        throw  error
    }


}
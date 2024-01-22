"use server"
import * as z from 'zod'
import {RegisterSchema} from "@/schemas";
import bcrypt from 'bcryptjs'
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";

export const register =async (values:z.infer<typeof  RegisterSchema>) => {


    //server side validation
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:'Invalid fields!'}
    }


    const {name, email, password} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    //check if email is in use
    const existingUser = await  getUserByEmail(email)

    if(existingUser){
        return {
            error:'Email is already in use'
        }
    }

    await db.user.create({
        data:{
                name,
                email,
                password:hashedPassword
            }

})


    //send verification token email

    const verificationToken = await generateVerificationToken(email)


    return {success: 'Email Confirmation sent'}
}
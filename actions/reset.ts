"use server"
import * as z from 'zod'
import {ResetSchema} from "@/schemas";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken, generateVerificationToken} from "@/lib/tokens";
import {sendPasswordResetEmail, sendVerificationEmail} from "@/lib/mail";

export const reset =async (values:z.infer<typeof  ResetSchema>) => {


    //server side validation
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:'Invalid fields!'}
    }

    const { email} = validatedFields.data


    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email ){
        return {error:'Email does not exist'}
    }


    //generating token and reset email

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )


    return {
        success:'Rest email sent'
    }



}
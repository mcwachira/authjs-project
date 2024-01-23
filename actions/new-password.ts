"use server"
import * as z from 'zod'
import {NewPasswordSchema, ResetSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken} from "@/lib/tokens";
import {sendPasswordResetEmail} from "@/lib/mail";
import {getVerificationTokenByToken} from "@/data/verification-token";
import {getPasswordResetByToken} from "@/data/password-reset-token";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";


export const newPassword = async(values:z.infer<typeof NewPasswordSchema>, token?:string | null) => {


    //server side validation
    const validatedFields = NewPasswordSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:'Invalid fields!'}
    }

    const { password, confirmPassword} = validatedFields.data


    const resetToken = await getPasswordResetByToken(token)

    //check if token exist
    if(!resetToken){
        return {error:'Token does not exist'}
    }

    //check if reset token expired

    const  hasExpired = new Date(resetToken.expires) < new Date();

    if(hasExpired){
        return {error:'Token has expired!'}
    }

    const existingUser = await  getUserByEmail(resetToken.email)

    if(!existingUser){
        return {error:'Email does not Exist'}
    }

    if(password !== confirmPassword) {
return {error:'Passwords do not match'}
    }

    //hash the password
    const hashedPassword  = await bcrypt.hash(password, 10)

    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
    password:hashedPassword
        }
    })


    //delete the password reset token

    await db.passwordResetToken.delete({
        where:{id:resetToken.id}
    })

    return {
        success:'password  updated successful'
    }

}
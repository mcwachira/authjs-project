'use server'

import {getVerificationTokenByToken} from "@/data/verification-token";
import {getUserByEmail} from "@/data/user";
import {db} from "@/lib/db";

export const newVerification   = async(token:string) => {
    const existingToken = await getVerificationTokenByToken(token)

    console.log('existing token : ', existingToken)
    //check if token exist
    if(!existingToken){
        return {error:'Token does not exist'}
    }

    //check if existing token expired

    const  hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error:'Token has expired!'}
    }

    const existingUser = await  getUserByEmail(existingToken.email)

    if(!existingUser){
        return {error:'Email does not Exist'}
    }

    await db.user.update({

        where:{
            id:existingUser.id
        },
        data:{
            emailVerified:new Date(),

            //enable user to change their email
            email:existingToken.email
        }
    });

    await db.verificationToken.delete({
        where:{id:existingToken.id}
    })

    return {success:'Email is verified'}
}


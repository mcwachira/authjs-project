import {db} from '@/lib/db'


export const getVerificationTokenByToken=async(token:string) => {

    console.log(token)
    try{

        const verificationToken = await db.verificationToken.findUnique({
            where:{token}
        })

        console.log('verify' ,verificationToken)
        return verificationToken
    }catch{
        return null
    }
}


export const getVerificationTokenByEmail =async(email:string) => {

    try{

        const verificationToken = await db.verificationToken.findFirst({
            where:{email}
        })

        return verificationToken
    }catch{
        return null
    }
}
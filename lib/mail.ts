import {Resend} from 'resend'
const resend  = new Resend(process.env.RESEND_API_KEY)


export const sendPasswordResetEmail = async(email:string, token:string)=> {

    const resetLink = `http://locolhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from:'omboarding@resend.dev',
        to:email,
        subject:'Reset your account password',
        html:`<p> Click <a href="${resetLink}">Here</a> to reset passowrd. </p>`
    })
}
export const sendVerificationEmail = async (
    email:string,
    token:string
)=> {
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from:'omboarding@resend.dev',
        to:email,
        subject:'Confirm your email',
        html:`<p> Click <a href="${confirmationLink}">Here</a> to confirm email . </p>`
    })
}
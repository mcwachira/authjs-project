import {auth, signOut} from '@/auth'
const SettingsPage = async() => {

    const session = await auth()


    return (
        <div>
            {JSON.stringify(session)}

            <form action={ async() => {

                //exclusive for server components
            'use server'

await signOut()
            }}>

                <button  type='submit'>
                    Sign Out
                </button>
            </form>
        </div>
    )
}

export default SettingsPage
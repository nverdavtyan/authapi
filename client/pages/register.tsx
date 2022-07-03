import Head from 'next/head'
import Link from 'next/link'
import Label from '../components/label'
import Input from '../components/input'
import Button from '../components/button'
import Errors from '../components/errors'
import axios from 'axios'
import swal from 'sweetalert'
import {SetStateAction,useState} from 'react'

export default function Register() {

    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])


    const signup = async () => {
        const user = {name,email,lastname,password,password_confirmation}

        try {
            const resp = await axios.post('http://localhost:8000/api/register',user);
            console.log(resp.data);
            swal(resp.data.message)
        } catch (error:any) {
            if(error.response){
            console.log(error.response.data.validation_errors);

            setErrors(Object.values(error.response.data.validation_errors))

            }

        }
    
    };
    

    return (
        <>
            <Head>
                <title>Auth API — Register</title>
            </Head>

            <div className={"w-1/2 mx-auto bg-white p-5 rounded-lg"}>
               
            <Errors className="mb-5" errors={errors} />

                    <div>
                        <Label htmlFor="email">Prénom</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={(event: { target: { value: SetStateAction<string> } }) => setName(event.target.value)}
                            required
                            autoFocus
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Nom de famille</Label>

                        <Input
                            id="lastname"
                            type="text"
                            value={lastname}
                            className="block mt-1 w-full"
                            onChange={(event: { target: { value: SetStateAction<string> } }) => setLastName(event.target.value)}
                            required
                            autoFocus
                            autoComplete="off"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={(event: { target: { value: SetStateAction<string> } }) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password">Mot de Passe</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={(event: { target: { value: SetStateAction<string> } }) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password">Confirmation du  mot de passe</Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            className="block mt-1 w-full"
                            onChange={(event: { target: { value: SetStateAction<string> } }) => setPasswordConfirmation(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link href="/login">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Already registered?
                            </a>
                        </Link>

                        <Button  onClick={signup} className="ml-3"> S&apos;inscrire</Button>
                    </div>
        
            </div>
        </>
    )
}



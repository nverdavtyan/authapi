
import Head from 'next/head'
import Link from 'next/link'
import Label from '../components/label'
import Input from '../components/input'
import Button from '../components/button'
import { SetStateAction, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import Errors from '../components/errors'
export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])


    const login = async () => {

        const user = { email, password }

        await axios.post('http://localhost:8000/api/login', user).then((res) => {

            if (res.data.status === 200) {
                swal(`Félicitations ${res.data.user} ${res.data.message}`)
                console.log(res.data)

            }
            else if (res.data.status === 401) {
                swal('Attention', res.data.message)
            } else {
                setErrors(Object.values(res.data.validation_errors))
            }
        });










    };

    return (
        <>
            <Head>
                <title>Auth API — Login</title>
            </Head>


            <div className={"w-1/2 mx-auto bg-white p-5 rounded-lg"}>
                <Errors className="mb-5" errors={errors} />

                <div className="mt-4">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={(event: { target: { value: SetStateAction<string> } }) => setEmail(event.target.value)}

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

                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button onClick={login} className="ml-3">Se connecter</Button>
                </div>
            </div>
        </>
    )
}

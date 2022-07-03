import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useEffect, useState } from "react";
import axios from 'axios'
function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <div className="bg-white">
                <main className="shadow">
                    <div className="max-w-screen-lg mx-auto flex flex-row justify-between items-center p-4 sm:p-7 relative z-10 space-x-2 sm:space-x-3">
                        <Link href="/">
                            <a className="block">
                                <h1 className="text-2xl font-black"><span className="text-blue-700">
                                    Auth </span>API
                                </h1>
                            </a>
                        </Link>

                        <div className="flex items-center text-sm font-semibold">

                            <Link href={"/login"}>
                                <a className="text-gray-700 ml-7 border border-gray-300 hover:border-gray-400 rounded px-4 py-2">Se connecter</a>
                            </Link>
                            <Link href={"/register"}>
                                <a className="text-gray-700 ml-7 border border-gray-300 hover:border-gray-400 rounded px-4 py-2">S inscrire</a>
                            </Link>

                        </div>
                    </div>
                </main>
            </div>
            <div className="max-w-screen-lg mx-auto p-4 sm:p-7 mt-10">
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default MyApp

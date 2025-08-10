import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

import { signIn } from "@/actions/userActions";
import { useUIStore, useUserStore } from '@/hooks/useStore'

import * as types from '@/types';

const Login = () => {
    const setSession = useUserStore(state => state.setSession);
    const setIsLoading = useUIStore(state => state.setIsLoading);
    const router = useRouter();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const [emailError, setEmailError] = useState<types.InputError>({ errorState: false, errorDescription: '' });
    const [passwordError, setPasswordError] = useState<types.InputError>({ errorState: false, errorDescription: '' });
    const [generalError, setGeneralError] = useState<types.InputError>({ errorState: false, errorDescription: '' });

    const handleSignIn = async () => {
        if (emailInputRef.current && passwordInputRef.current) {
            setIsLoading(true)
            const response = await signIn(
                emailInputRef.current.value, 
                passwordInputRef.current.value
            );

            setIsLoading(false)
            handleResponse(response);
        }
    }

    const handleResponse = (response: types.AuthResponse) => {
        switch (response.type) {
            case 'EMAIL':
                setEmailError({ errorState: true, errorDescription: response.error });
                break;
            
            case 'PASSWORD':
                setPasswordError({ errorState: true, errorDescription: response.error });
                break;

            case 'GENERAL':
            case 'AUTH':
                setGeneralError({ errorState: true, errorDescription: response.error });
                break;

            case 'SUCCESS': 
                setSession(response.session);

                router.push('/');
                break;

            default:
                break;
        }
    }

    const signInOnEnterKey = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            await handleSignIn();
        }
    }

    const renderLogIn = () => {
        return (
            <section className="flex flex-col gap-4 p-6 bg-neutral-700 w-full rounded-lg">
                <Input id="email-input" type="email" label="E-mail" inputRef={emailInputRef} error={emailError} onChange={() => setEmailError({ errorState: false, errorDescription: '' })} onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => signInOnEnterKey(event)}/>
                <Input id="password-input" type="password" label="Password"inputRef={passwordInputRef} error={passwordError} onChange={() => setPasswordError({ errorState: false, errorDescription: '' })}  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => signInOnEnterKey(event)} />
                <Button content="Log in" className="mt-2 !text-base" onClick={handleSignIn} />

                {generalError?.errorState && generalError?.errorDescription && <p className="text-xs text-red-600 mt-0.5 mx-0.5 text-center">
                    {generalError.errorDescription}
                </p>}
            </section>
        )
    }

    return (
        <section className="flex flex-col justify-center items-center h-full">
            <section className="flex flex-col w-full max-w-80">
                <p className="text-neutral-100 text-4xl uppercase text-center py-3">Login</p>
                <div className="w-full h-px bg-neutral-700"/>
                <div className="py-4 w-full">
                    {renderLogIn()}
                </div>
            </section>
        </section>
    )
}

export default Login;
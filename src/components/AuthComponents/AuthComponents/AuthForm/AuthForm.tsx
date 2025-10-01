import './AuthForm.css';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import { type AuthPhase } from '../../../../types/authTypes';
import { useState } from 'react';
import ChatContainer from '../../../ChatComponents/ChatContainer/ChatContainer';

function AuthForm()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [authPhase, setAuthPhase] = useState<AuthPhase>('login');

    type logInReqBody = {
        userName: string,
        password: string,
    }

    async function logIn() 
    {
        const body: logInReqBody = {
            userName: username,
            password: password,
        };

        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        console.log("asddd");
        if (!res.ok) {
            console.log("Error logging in.");
            return;
        }

        const data = await res.json();
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken)
        setAuthPhase("loggedIn");
    }

    type signUpReqBody = logInReqBody & {
        email: string,
        phoneNumber?: string
    }

    async function signUp()
    {
        const body: signUpReqBody = {
            userName: username,
            password: password,
            email: email,
            ...(phoneNumber && { phoneNumber })
        }

        const res = await fetch("http://localhost:3000/auth/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        if(!res.ok)
        {
            console.log("Error signing up.")
            return;
        }

        const data = await res.json();
        const userName = data.userName;
        const userId = data.userId;
        sessionStorage.setItem("accessToken", data.accessToken);
        setAuthPhase("loggedIn");
    }

    async function refresh()
    {
        const res = await fetch("http://localhost:3000/auth/refresh", {
            credentials: "include"
        })

        if (!res.ok) {
            console.log("Error refreshing token");
            return;
        }

        const data = await res.json();
        sessionStorage.setItem("accessToken", data.accessToken);
        console.log("Access token refreshed:", data.accessToken);
    }



    let whatToShow;

    if(authPhase === "loggedIn" || sessionStorage.getItem('accessToken') !== null)
    {
        whatToShow = <ChatContainer/> 
    }
    else if(authPhase === "login")
    {
        whatToShow = <div className='login-container'>
                        <div className="form-container">
                            <LoginForm setUsername={setUsername} setPassword={setPassword} logIn={logIn} setAuthPhase={setAuthPhase}></LoginForm>
                        </div>
                    </div>
    }
    else
    {
        whatToShow = <div className='login-container'>
                        <div className="form-container">
                            <SignUpForm setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setPhoneNumber={setPhoneNumber} signUp={signUp} setAuthPhase={setAuthPhase}></SignUpForm>                
                        </div>
                    </div>
    }


    return (
        <>
            {whatToShow}
        </>
    );
}

export default AuthForm;
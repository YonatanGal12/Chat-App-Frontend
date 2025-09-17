import './AuthForm.css';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import { type AuthPhase } from '../../../types';
import { useState } from 'react';
import axios from 'axios';

function AuthForm()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [authPhase, setAuthPhase] = useState<AuthPhase>('login');

    type reqBody = {
        userName: string,
        password: string,
    }

    async function onClick()
    {
        const body: reqBody = {
            userName: username,
            password: password,
        }

        axios.get("http://localhost:3005/auth/12", {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJ1c2VyTmFtZSI6IlNoaXIgR2Vyem9uIiwiaWF0IjoxNzU3OTUyNTA5LCJleHAiOjE3NTc5NTYxMDl9.ZoovscB502GmvntPHAj8KfNNvdzagn9C4YWkYQVri90"
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }

    return (
        <>
            <div className='login-container'>
                <div className="form-container">
                    {authPhase === 'login' ? 
                        <LoginForm setUsername={setUsername} setPassword={setPassword} logIn={onClick} setAuthPhase={setAuthPhase}></LoginForm>
                    :
                        <SignUpForm setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} setPhoneNumber={setPhoneNumber} logIn={onClick} setAuthPhase={setAuthPhase}></SignUpForm>
                    }
                </div>
            </div>
        </>
    );
}

export default AuthForm;
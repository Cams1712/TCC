import React from 'react'
import { Saudacao } from '../class/Saudacao'
import {Link} from 'react-router-dom'
import '../css/Login.css'
import Head from './Head'

const inputField = [
    {
        id: 'email',
        type: 'text',
        label: 'Email'
    },
    {
        id: 'senha',
        type: 'password',
        label: 'Senha'
    },
    {
        id: 'enviar',
        type: 'submit',
    }
]

const Login = () => {
    const [login, setLogin] = React.useState({
        email: '',
        senha: '',
        enviar: 'Entrar'
    })

    const [erro, setErro] = React.useState('')

    function limparDados() {
        setLogin({...login, email: '', senha: ''})
    }

    function handleSubmit(e) {
        e.preventDefault() 

        if(login.email === '' || login.senha === '') {
            setErro('Erro! Preencha os campos corretamente')
        } else {
            setErro('Sucesso!')
            limparDados()
        }      
    }

    function handleChange({target}) {
        const {id, value} = target
        setLogin({...login, [id]:value})
    }

    return <>
        <Head title='Login' />

        <div className='row login-container'>
            <div className='col-md-7 login-form'>
                <form className='form' onSubmit={handleSubmit}>
                    <div>
                        <h2>{Saudacao()}</h2>
                        <p style={{color: 'gray'}}>Faça login para continuar</p>
                    </div>
                    {inputField.map(({ id, type, label}, index) => (
                        <div className='login-inputs' key={index}>
                            <label htmlFor={id} style={{color: '#333', fontWeight: '600'}}>{label}</label>
                            <input type={type} id={id} value={login[id]} onChange={handleChange} />
                        </div>
                    ))}
                </form>

                <span>Não possui uma conta? <Link to='/cadastrar' className='login-cadastrar'>Cadastre-se</Link></span>
            </div>

            <div className='col-md-4 login-img'>
            </div>
        </div>
    </>
}

export default Login
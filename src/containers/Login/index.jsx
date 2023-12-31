import styled from 'styled-components'

import logo from '../../assets/img/logo.svg'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AuthContainer = styled.section``

const Inner = styled.div``

const Form = styled.form`
  max-width: 330px;
  min-width: 330px;
`

export default function Auth() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const auth = localStorage.getItem('auth')
    
    if (!auth) {
      alert('Usuário não encontrado')
      return
    }

    const authObject = JSON.parse(auth)

    if (authObject.email !== email || authObject.password !== password) {
      alert('Usuário não encontrado')
      return
    } else {
      alert('Usuário logado com sucesso')

      localStorage.setItem('logado',  true)
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    // verifica se usuário está logado
    const logado = localStorage.getItem('logado')
  
    if (logado) {
      navigate('/dashboard')
    }
  }, [navigate])


  return (
    <AuthContainer className='d-flex align-items-center py-4'>
      <Inner className='container'>
        <div className="d-flex align-items-center justify-content-center">
          <Form onSubmit={handleSubmit}>
            <img className="mb-4" src={logo} alt="" width="140" />
            <h1 className="h3 mb-3 fw-normal">Por favor, faça o login</h1>

            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={updateEmail} />
              <label htmlFor="floatingInput">E-mail</label>
            </div>
            
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={updatePassword} />
              <label htmlFor="floatingPassword">Senha</label>
            </div>

            <div className="text-start my-3">
              <Link to={'/register'} className="link-primary">Não tem uma conta? Cadastre-se</Link>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
          </Form>
        </div>
      </Inner>
    </AuthContainer>
  )
}
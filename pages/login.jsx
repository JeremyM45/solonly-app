import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function Signup(){
  const { user, login} = useAuth()
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [err, setErr] = useState(null)
  const router = useRouter()

  async function handleLogin(e){
    e.preventDefault()
    try{
      await login(data.email, data.password)
      router.push('/dashboard')
    } catch(err){
      setErr(err.message)
      console.log(err)
    }
  }

  return(
    <div>
      <h1>Login</h1>
      
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder="email@email.com"
            required
            onChange={(e) => setData({
              ...data,
              email: e.target.value
            })
          }
          value={data.email}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            placeholder='example@Password1'
            required
            onChange={(e) => setData({
              ...data,
              password: e.target.value
            })}
          />
        </Form.Group>
        {err ? <h2>{err}</h2> : null}
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  )
}
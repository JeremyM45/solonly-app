import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function Signup(){
  const { user, signup } = useAuth()
  
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  async function handleSignup(e){
    e.preventDefault()
    console.log(data)
    try{
      await signup(data.email, data.password)
    } catch(err){
      console.log(err)
    }
  }
  
  return(
    <div>
      <h1>Signup</h1>
      <Form onSubmit={handleSignup}>
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

        <Button variant="success" type="submit">Signup</Button>
      </Form>
    </div>
  )

}
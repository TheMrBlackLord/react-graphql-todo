import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../api/mutations';
import AuthForm from '../ui/AuthForm';

const Login = ({setUser, refetch}) => {

   const [formData, setFormData] = useState({username: '', password: ''});
   const [loginMutation, { loading, data, error }] = useMutation(LOGIN);
   const navigate = useNavigate();

   const login = e => {
      e.preventDefault();
      loginMutation({ variables: formData });
   }

   useEffect(() => {
      if (data) {
         localStorage.setItem("token", data.login.tokens.accessToken);
         const { id, username } = data.login.user;
         setUser({ id, username });
         refetch();
         navigate("/");
      }
   }, [data, error, navigate, setUser, refetch]);

   return (
      <Container>
         <Row className="center">
            <Col md={8}>
               <h2 className="text-center">Login</h2>
               <AuthForm 
                  formData={formData}
                  setFormData={setFormData}
                  loading={loading}
                  submitHandler={login}
                  buttonText="Login"
               />
            </Col>
         </Row>
         <Row className="center my-5">
            <Col md={4}>
               {error && <Alert variant="danger">{error.message}</Alert>}
            </Col>
         </Row>
      </Container>
   )
}

export default Login;

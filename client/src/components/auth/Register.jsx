import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../../api/mutations';
import AuthForm from '../ui/AuthForm';

const Register = ({ setUser, refetch }) => {
   const [formData, setFormData] = useState({ username: "", password: "" });
   const [registerMutation, { loading, data, error }] = useMutation(REGISTER);
   const navigate = useNavigate();

   const register = (e) => {
      e.preventDefault();
      registerMutation({ variables: formData });
   };

   useEffect(() => {
      if (data) {
         localStorage.setItem("token", data.register.tokens.accessToken);
         const { id, username } = data.register.user;
         setUser({ id, username });
         refetch();
         navigate("/");
      }
   }, [data, error, navigate, setUser, refetch]);

   return (
      <Container>
         <Row className="center">
            <Col md={8}>
               <h2 className="text-center">Register</h2>
               <AuthForm
                  formData={formData}
                  setFormData={setFormData}
                  loading={loading}
                  submitHandler={register}
                  buttonText="Register"
               />
            </Col>
         </Row>
         <Row className="center my-5">
            <Col md={4}>
               {error && <Alert variant="danger">{error.message}</Alert>}
            </Col>
         </Row>
      </Container>
   );
};

export default Register;

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Spinner from './Spinner';

const AuthForm = ({formData, setFormData, loading, submitHandler, buttonText}) => {
   return (
      <Form>
         <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control value={formData.username} onChange={e => {
               setFormData({ ...formData, username: e.target.value })
            }} type="text" placeholder="Enter username" />
         </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={formData.password} onChange={e => {
               setFormData({ ...formData, password: e.target.value })
            }} type="password" placeholder="Password" />
         </Form.Group>
         <Button variant="primary" onClick={submitHandler} disabled={loading} type="submit">
            {buttonText}
            &nbsp;
            {loading && <Spinner />}
         </Button>
      </Form>
   );
};

export default AuthForm;

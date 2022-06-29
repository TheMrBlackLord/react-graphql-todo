import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Spinner from './Spinner';

const TodoForm = ({addTodoHandler, loading}) => {
   const [todo, setTodo] = useState({ title: '', deadline: '' });
   
   const submit = e => {
      e.preventDefault();
      setTodo({ title: '', deadline: '' });
      addTodoHandler(todo);
   }

   return (
         <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Title</Form.Label>
               <Form.Control type="text" value={todo.title} onChange={e => {
                  setTodo({ ...todo, title: e.target.value });
               }} placeholder="Enter title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Deadline</Form.Label>
            <Form.Control type="date" value={todo.deadline} onChange={e => {
               setTodo({ ...todo, deadline: e.target.value });
            }} placeholder="Enter deadline" />
            </Form.Group>
         <Button variant="primary"
            onClick={submit}
            disabled={!todo.title || !todo.deadline || loading}
            type="submit">
            Add
            {loading && <Spinner />}
         </Button>
         </Form>
   );
};

export default TodoForm;

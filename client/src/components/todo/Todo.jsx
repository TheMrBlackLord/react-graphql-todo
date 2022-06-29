import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faXmark, faEdit, faCheck);

const formatDate = (date) => {
   const d = new Date(date);
   return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
   });
}

const Todo = ({ todo, completeHandler, deleteTodo, updateTodo }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [currentTitle, setCurrentTitle] = useState(todo.title);

   const cancelEditing = () => {
      setIsEditing(false);
      setCurrentTitle(todo.title);
   }
   
   const submitEditing = e => {
      e.preventDefault();
      updateTodo(currentTitle);
      setIsEditing(false);
   }

   return (
      <li className='todo-item'>
         {isEditing ?
            <Form className="d-flex">
               <Form.Group className="me-1">
                  <Form.Control type="text" placeholder="New title" 
                     value={currentTitle}
                     onChange={(e) => setCurrentTitle(e.target.value)}
                  />
               </Form.Group>
               <Button variant="primary" type="submit" className="me-1" onClick={submitEditing}>
                  <FontAwesomeIcon icon="fa-solid fa-check" />
               </Button>
               <Button variant="secondary" type="button" onClick={cancelEditing}>
                  <FontAwesomeIcon icon="fa-solid fa-xmark" />
               </Button>
            </Form>
            :
            <label className={`title me-2 ${todo.completed ? 'completed' : ''}`}>
               <input type="checkbox" defaultChecked={todo.completed} onClick={() => completeHandler()} />
               &nbsp;
               {currentTitle}
            </label>
         }
         <span className="text-muted">
            {formatDate(todo.deadline)}
         </span>
         <div className="controls">
            <Button variant="danger" onClick={() => deleteTodo()}>
               <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </Button>
            {!isEditing &&
               <Button variant="warning" onClick={() => setIsEditing(true)}>
                  <FontAwesomeIcon icon="fa-solid fa-edit" />
               </Button>
            }
         </div>
      </li>
   );
};

export default Todo;

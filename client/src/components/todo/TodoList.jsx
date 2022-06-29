import React, { useMemo, Fragment } from 'react';
import { Col } from 'react-bootstrap'
import Todo from './Todo';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, UPDATE_TODO, CREATE_TODO } from '../../api/mutations';
import TodoForm from '../ui/TodoForm';
import Spinner from '../ui/Spinner';

const TodoList = ({ userId, todosProps: { todos, loading, refetch} }) => {
   const [createTodoMutatuon, { loading: createTodoLoading }] =
      useMutation(CREATE_TODO);

   const [deleteTodoMutatuon, { loading: deleteTodoLoading }] =
      useMutation(DELETE_TODO);

   const [updateTodoMutatuon, { loading: updateTodoLoading }] =
      useMutation(UPDATE_TODO);

   const addTodo = async (todo) => {
      await createTodoMutatuon({ variables: { id: userId, ...todo } });
      refetch();
   };

   const toggleTodo = async (id) => {
      const todo = todos.find((todo) => todo.id === id);
      const updates = {
         completed: !todo.completed,
      };
      await updateTodoMutatuon({ variables: { id, updates } });
      refetch();
   };

   const updateTodo = async (id, title) => {
      const updates = {
         title,
      };
      await updateTodoMutatuon({ variables: { id, updates } });
      refetch();
   };

   const deleteTodo = async (id) => {
      await deleteTodoMutatuon({ variables: { id } });
      refetch();
   };

   const isSpinnerShow = useMemo(() => {
      return deleteTodoLoading || updateTodoLoading;
   }, [deleteTodoLoading, updateTodoLoading]);

   return (
      <Col sm={10} className="my-5">
         <TodoForm addTodoHandler={addTodo} loading={createTodoLoading} />
         &nbsp;
         <div className="todos">
            {todos.length > 0 && (
               <h2>
                  Todos &nbsp;
                  {isSpinnerShow && <Spinner />}
               </h2>
            )}
            {loading ? (
               <Spinner />
            ) : (
               <Fragment>
                  {todos.length ? (
                     <ul className="todo-list">
                        {todos.map((todo) => (
                           <Todo
                              key={todo.id}
                              todo={todo}
                              completeHandler={() => toggleTodo(todo.id)}
                              deleteTodo={() => deleteTodo(todo.id)}
                              updateTodo={(title) => updateTodo(todo.id, title)}
                           />
                        ))}
                     </ul>
                  ) : (
                     <p className="text-center">No todos yet</p>
                  )}
               </Fragment>
            )}
         </div>
      </Col>
   );
};

export default TodoList;

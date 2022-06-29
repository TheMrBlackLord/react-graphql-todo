import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import TodoList from './todo/TodoList';
import Spinner from './ui/Spinner';

const Home = ({user, loading, todosProps}) => {

   return (
      <Container>
         <Row className="center">
            {loading ? (
               <Spinner />
            ) : (
               <Fragment>
                  {user ? (
                     <TodoList userId={user?.id} todosProps={todosProps} />
                  ) : (
                     <div className="center">
                        <Link to="/login">Login</Link>
                        &nbsp; or &nbsp;
                        <Link to="/register">Register</Link>
                     </div>
                  )}
               </Fragment>
            )}
         </Row>
      </Container>
   );
}

export default Home;

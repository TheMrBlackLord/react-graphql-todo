import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { USER, TODOS } from './api/queries';
import { LOGOUT } from './api/mutations';
import Header from './components/ui/Header';
import Spinner from './components/ui/Spinner';
import Home from './components/Home';

const Register = lazy(() => import('./components/auth/Register.jsx'));
const Login = lazy(() => import('./components/auth/Login.jsx'));

function App() {

   const [user, setUser] = useState(null);
   const [todos, setTodos] = useState([]);

   const { loading, data, error } = useQuery(USER);

   const [getTodos, { 
      loading: loadingTodos,
      data: dataTodos,
      error: errorTodos,
      refetch: refetchTodos
      }] = useLazyQuery(TODOS);

   const [logoutMutatuon] = useMutation(LOGOUT);

   const logout = () =>
      logoutMutatuon().then(() => {
         setUser(null);
         setTodos([]);
         localStorage.removeItem("token");
      });

   useEffect(() => {
      if (data) {
         const { id, username } = data.me;
         setUser({ id, username });
         getTodos();
      }
   }, [data, error, getTodos]);

   useEffect(() => {
      if (dataTodos) {
         setTodos(dataTodos.userTodos);
      }
   }, [dataTodos, errorTodos]);

   const todosProps = useMemo(() => {
      return {
         todos,
         loading: loadingTodos,
         refetch: refetchTodos
      };
   }, [loadingTodos, todos, refetchTodos]);

  return (
     <div className="App">
        <main>
           <BrowserRouter>
              <Header user={user} logout={logout} />
              <Routes>
                 <Route
                    exact
                    path="/"
                    element={<Home user={user} loading={loading} todosProps={todosProps} />
                  }
                 />
                 <Route
                    path="/register"
                    element={
                       !user ? (
                          <Suspense fallback={<Spinner />}>
                             <Register setUser={setUser} refetch={refetchTodos} />
                          </Suspense>
                       ) : (
                          <Navigate to="/" />
                       )
                    }
                 />
                 <Route
                    path="/login"
                    element={
                       !user ? (
                          <Suspense fallback={<Spinner />}>
                             <Login setUser={setUser} refetch={refetchTodos} />
                          </Suspense>
                       ) : (
                          <Navigate to="/" />
                       )
                    }
                 />
              </Routes>
           </BrowserRouter>
        </main>
     </div>
  );
}

export default App;

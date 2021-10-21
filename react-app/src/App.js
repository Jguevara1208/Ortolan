import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SideNav from './components/SideNav/NavBar'
import ProtectedRoute from './components/auth/ProtectedRoute';
import RecipesPage from './components/RecipesPage/Recipes';
import RecipeForm from './components/NewRecipe/RecipeForm';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <SideNav />
      <Switch>
        <ProtectedRoute path='/recipes' exact={true}>
          <RecipesPage />
        </ProtectedRoute>
      </Switch>
      <Switch>
        <ProtectedRoute path='/recipes/new' exact={true}>
          <RecipeForm />
        </ProtectedRoute>
      </Switch>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

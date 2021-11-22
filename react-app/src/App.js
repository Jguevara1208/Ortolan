import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './components/SignupPage/Signup';
import Login from './components/LoginPage/Login';
import SideNav from './components/SideNav/NavBar'
import TopNav from './components/TopNav/TopNav'
import ProtectedRoute from './components/auth/ProtectedRoute';
import RecipesPage from './components/RecipesPage/Recipes';
import RecipeForm from './components/NewRecipe/RecipeForm';
import RecipeEditForm from './components/RecipeEdit/RecipeEditForm';
import SingleRecipePage from './components/SingleRecipePage/SingleRecipePage';
import ProjectsPage from './components/ProjectsPage/ProjectsPage';
import Dashboard from './components/Dashboard/DashBoard';
import Splash from './components/Splash/Splash';
import Settings from './components/SettingsPage/Settings';
import Menu from './components/Menu/Menu';
import OrderingGuide from './components/OrderingGuide/OrderingGuide';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

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
      <TopNav />
      <div className='main-body'>
        {user && <SideNav />}
        <Switch>
          <ProtectedRoute path='/projects' exact={true}>
            <ProjectsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/settings' exact={true}>
            <Settings />
          </ProtectedRoute>
          <ProtectedRoute path='/recipes' exact={true}>
            <RecipesPage />
          </ProtectedRoute>
          <ProtectedRoute path='/ordering' exact={true}>
            <OrderingGuide />
          </ProtectedRoute>
          <ProtectedRoute path='/menu' exact={true}>
            <Menu />
          </ProtectedRoute>
          <ProtectedRoute path='/recipes/new' exact={true}>
            <RecipeForm />
          </ProtectedRoute>
          <ProtectedRoute path='/recipes/:recipeId' exact={true}>
            <SingleRecipePage/>
          </ProtectedRoute>
          <ProtectedRoute path='/recipes/:recipeId/edit/' exact={true}>
            <RecipeEditForm />
          </ProtectedRoute>
          <Route path='/login' exact={true}>
            <Login />
          </Route>
          <Route path='/signup' exact={true}>
            <Signup />
          </Route>
          {user 
            ? 
              <ProtectedRoute path='/' exact={true} >
                <Dashboard />
              </ProtectedRoute>
            :
              <Route path='/' exact={true} >
                <Splash />
              </Route>
          }
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import allRecipesReducer from './allRecipes';
import currentRecipeReducer from './currentRecipe';
import ingredientsReducer from './ingredients';
import orderCategoriesReducer from './orderCategories';
import projectsReducer from './projects';
import recentRecipesReducer from './recentRecipes';
import recipesTreeReducer from './recipesTree';
import tagsReducer from './tags';
import unitsReducer from './units';
import teamMembersReducer from './teamMembers';
import currentMenuReducer from './currentMenu';

const rootReducer = combineReducers({
  session,
  recentRecipes: recentRecipesReducer,
  projects: projectsReducer,
  recipesTree: recipesTreeReducer,
  allRecipes: allRecipesReducer,
  units: unitsReducer,
  tags: tagsReducer,
  orderCategories: orderCategoriesReducer,
  ingredients: ingredientsReducer,
  currentRecipe: currentRecipeReducer,
  teamMembers: teamMembersReducer,
  currentMenu: currentMenuReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

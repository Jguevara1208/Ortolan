***Replace default README File***
**User Story**
As a Project Manager, I want to see a completed Readme file so that I can understand more about your project. 
**Acceptance Criteria**
- [ ] Readme located at the root of your project has been updated with info from the wiki.  
See https://github.com/adamLovettApps/JamOut/blob/main/README.md for an example. 



***Replace default favicon File***
**User Story**
As a Project Manager, I want to see an updated favicon so that I can easily identify your application in a list of tabs. 
**Acceptance Criteria**
- [ ] Favicon has been updated from the default icon provided by the project starter. See https://www.favicon-generator.org/ for a simple favicon generator 



***Deploy for the first time***
**User Story**
As a Developer, I want to deploy my starter app to Heroku so that I can make sure I can deploy changes consistently. 
**Acceptance Criteria**
- [ ] The cloned starter app has been deployed to Heroku.



***Create About Links on the Home Page***
**User Story**
As a Developer, I want to display links to my GitHub and LinkedIn profiles so that prospective hiring managers can learn more about me after looking at my project. 
**Acceptance Criteria**
- [ ] Links to your LinkedIn and GitHub profiles should appear on the homepage of your application 



***Sign Up Functionality***
**User Story**
As a User, I want to create an account so I can use the website. 
**Acceptance Criteria**
- [ ] A link/button appears in the navigation for Sign Up (only when not already logged in)
- [ ] When clicking the link/button the user is redirected to a sign up form.
- [ ] After filling out the form and clicking a Submit button an account is created. 
- [ ] The form should be different whether the user is an admin or user
- [ ] A message is displayed to the user indicating that the account has been created. (optional)
- [ ] The user is redirected to an appropriate page (determined by the developer)
- [ ] The user has some indication that the user is now logged in. 



***Login Functionality***
**User Story**
As a User, I want to login with my previously created account so I can use the website. 
**Acceptance Criteria**
- [ ] A link/button appears in the navigation for Log In (only when not already logged in)
- [ ] When clicking the link/button the user is redirected to a login form. 
- [ ] After filling out the form with username and password and clicking a Login button the user is logged in.  
- [ ] A message is displayed to the user indicating that the user has successfully logged in (optional) 
- [ ] The user is redirected to an appropriate page (determined by the developer)
- [ ] The user can visually identify they’ve been logged in by having their username displayed in the navigation bar. 



***Error handling Complete***
**User Story**
As a Developer, I want to validate the LogIn/Signup forms being submitted so my users have a good experience when using my application. 
**Acceptance Criteria**
- [ ] (Log In) If the username/password combination is wrong, or the user does not exist the login fails. 
- [ ] (Log In) A message is displayed to the end user indicating which fields are invalid. 
- [ ] (Sign Up) If the username/email already exists, the signup form fails
- [ ] (Sign Up) A message is displayed to the end user indicating which fields are invalid. 



***Logout Functionality Complete***
**User Story**
As a Logged In User, I can log out of my account so I can ensure it isn’t used without my permission. 
**Acceptance Criteria**
- [ ] A link/button appears in the navigation for Log Out (only when logged in)
- [ ] When clicking this button/link the session ends and the user is logged out. 
- [ ] When refreshing the page or traveling to other pages the user does not appear to be logged in 
- [ ] The logged out user can log in with a separate account without issue. 



***Demo Login Functionality Complete***
**User Story**
As a Project Manager, I can use a Demo Account so that I can use the application without having to use the signup form.  
**Acceptance Criteria**
- [ ] A link/button appears in the navigation form and/or Login Form titled “Demo Login”  (only when logged out)
- [ ] When clicking this button/link the user is automatically logged in as a Demo User (a previously created account for testing) without the need to fill out the signup/login form. 
- [ ] The user is redirected as if they successfully completed the Log In form.



***Auth Styling Complete***
**User Story**
As a User, I would like to see at least basic styling on the signup and login forms so that the application doesn’t appear too similarly to the default application provided. 
**Acceptance Criteria**
- [ ] Sign up and Login forms have been styled appropriately. 

***Admin Recipe Functionality***
**User Story**
As an Admin, I would like to create a new recipe so that it will be archived until I delete it, and so that members of the establishment may view them as well
**Acceptance Criteria**
- [ ] A nav bar link that will take the admin to the recipe component
- [ ] A button to create a new recipe is present, and when clicked brings me to a form to create a recipe
- [ ] When a recipe is submitted it should be added to my tree of recipes
- [ ] When on an individual recipe as an admin I should be able to edit my recipe by clicking an edit button
- [ ] When editing, any changes that I make to the recipe should be saved upon completion
- [ ] While in edit mode, I should have the option to delete the recipe completely (add notification that all progress will be lost)

***Admin Menu Items Functionality***
**User Story**
As an Admin, I would like to be able to view, add, and delete items from my current menu tab so that I can keep the establishments current menu up to date
**Acceptance Criteria**
- [ ] On the dashboard have a card that contains links to all of the current items on the menu
- [ ] I should be able to click a button to edit the current menu items list that brings up a modal for the additions and deletions

***Admin Employee Functionality***
**User Story**
As an Admin, I would like to add users to my establishment so that they may also be connected to the content that I provide to the establishment account
**Acceptance Criteria**
- [ ] On the dashboard I should see a card that presents all of the employees and thier positions in the establishment
- [ ] have a button to click so that an admin can add or remove members to/from this list to remove access
- [ ] I should be able to change their positions

***Admin Order List Functionality***
**User Story**
As an Admin, I would like to add/delete/update/view an up to date order list so that I can confirm that the orders are proper and edit it to my specifications.
**Acceptance Criteria**
- [ ] a card in the dashboard that shows an outline of the current orders for the day
- [ ] a button that will bring me to the extended layout of the order form
- [ ] in the extended layout I should be able to add, delete, and edit orders in all of the sections.
- [ ] I should be able to clear all items from a specific section
- [ ] I should be able to clear all items from all sections

***Admin Project Board Functionality***
**User Story**
As an Admin, I would like to be able to create projects with detailed descriptions so that members of the team can see the overall list of big projects and be able to assign themselves to it. I would like to see who is currently assigned to each project
**Acceptance Criteria**
- [ ] a card on the dashboard that shows all active projects and the users assigned to it.
- [ ] the ability to add members to the project
- [ ] the ability to remove/edit/add projects

***Admin Recipe Search Functionality***
**User Story**
As an Admin, I would like to type into a search bar to find any recipes I have created so that I dont have to dig through all of my recipes to find a specific one
**Acceptance Criteria**
- [ ] cross check all recipes written by a user, or filtered by tag

***Admin Recipe Form Functionality***
**User Story**
As an Admin, I would like to have a templated and easy to understand form so that I can quickly format and add recipes to my archive.
**Acceptance Criteria**
- [ ] I would like to list the main items as the 'title' of the recipe
- [ ] I would like to add a photo of the dish
- [ ] I would like to have a component section, listing all of the components of the dish
- [ ] I would like to have the ability to create as many sub-recipes inside of the dish
- [ ] In each sub recipe, I would like to have a title for that component
- [ ] In each sub recipe, I would like to list the ingredients, their adjectives, and the measurement. 
- [ ] I would like to be able to pick which measurement I am using from a drop down
- [ ] I would like to add a detailed walk through below the ingredients
- [ ] When I add an ingredient, I would like to choose which section it will be included in on the order guide if I havent added it before



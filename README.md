<br />
<p align="center">
  <a href="https://ortolan.herokuapp.com/">
    <img src="https://raw.githubusercontent.com/Jguevara1208/Ortloan-photos/c917f7f440f77cc45e71c4ae4843a6bb93ae2c3f/orto-logo.svg?token=AR27E63IHZOGHRLYQQJAKYTBPLKUW" alt="Logo" width="90" height="90">
  </a>

  <h3 align="center">Ortolan</h3>

  <p align="center">
    <a href="https://ortolan.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li>
      <a href="#interesting-issues">Interesting Issues</a>
    </li>
    <li>
      <a href="#features-to-implement-next">Features to Implement Next</a>
    <li><a href="#contact">Contact</a></li>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project 
[Back to top](#table-of-contents)

<br>

### [Ortolan](https://finstagram-project.herokuapp.com/)

Ortolan is a web application built for professional chefs to automate and organize the non technical aspect of cooking. Ortolan eases the creation, exploration, and organization of the recipe archival process. With every new recipe entered by a user Ortolan will be able to predict the completion of ingredients and ordering categories to help expedite the completion of recipe additions. Ortolan also offers a project board where projects can be made, tasks created, and assignments to cooks given. Watch the progress of these tasks in real time.

### Built With 
[Back to top](#table-of-contents)
* [AWS - Amazon Web Services](https://aws.amazon.com/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

<!-- USAGE EXAMPLES
## Usage
[Back to top](#table-of-contents)

Users can signup and login to use Finstagram, and can login as a demo user to experience the website quickly.

[![Product Name Screen Shot][signup]](https://finstagram-project.herokuapp.com/signup)
[![Product Name Screen Shot][product-screenshot]](https://finstagram-project.herokuapp.com/login)
<br>
<br>
Once logged in, the user is directed to the Feed page, where logged-in users can view a feed of posts from users they follow, as well as their own posts.

[![Product Name Screen Shot][feed]](https://finstagram-project.herokuapp.com/signup)

Logged in users can add a new post, which appears at the top of the screen. Users can post images, gifs, or videos, as accepted file types. For posts a user owns, they can edit and delete the post. Users can also like and unlike a post.

### Adding a post:
[![Product Name Screen Shot][addPost]](https://finstagram-project.herokuapp.com/feed)

### Editing a post:
[![Product Name Screen Shot][editPost]](https://finstagram-project.herokuapp.com/feed)

### Deleting a post:
[![Product Name Screen Shot][deletePost]](https://finstagram-project.herokuapp.com/feed)

### Liking and unliking a post:
[![Product Name Screen Shot][likeUnlike]](https://finstagram-project.herokuapp.com/feed)

Users can add, edit, and delete a comment.

### Adding a comment:
[![Product Name Screen Shot][addComment]](https://finstagram-project.herokuapp.com/feed)

### Editing a comment:
[![Product Name Screen Shot][editComment]](https://finstagram-project.herokuapp.com/feed)

### Deleting a comment:
[![Product Name Screen Shot][deleteComment]](https://finstagram-project.herokuapp.com/feed)

Users can hover over the username or user image of a post's author to view that user's information. It also shows the following status of the logged in user in relation to the post author user.

### View user hover card:
[![Product Name Screen Shot][viewHover]](https://finstagram-project.herokuapp.com/feed)

Users can also click on the likes count on any post to view which users liked that post. From here, users can see whether they're following anyone in this list, and follow/unfollow as they wish.

### View post's liked users:
[![Product Name Screen Shot][viewLikes]](https://finstagram-project.herokuapp.com/feed)

<br>
<br>
Over on the Explore page, users can view posts from users they don't follow, and interact with these posts like on the Feed page.
<br>
<br>

### View posts from unfollowed users:
[![Product Name Screen Shot][exploreModal]](https://finstagram-project.herokuapp.com/explore)


Once you follow a user, their posts will appear on the feed page

### Newly followed users posts:

[![Product Name Screen Shot][newlyFollowedPosts]](https://finstagram-project.herokuapp.com/explore)
<br>
<br>

From any page where there are user posts or comments, you can click on a user's username to go to their profile page, which displays that user's number of posts, followers, and users followed.

### User profile pages:

(add profile navigation gif) -->

## Interesting Issues:
### Dynamic Form for Recipe 
[Back to top](#table-of-contents) 

<b>Issue</b>: Each dish or base recipe can have many sub recipes. Each of these sub recipes can have many ingredients. I had a hard time wrapping my head around this at first while maintaining a clean state and controlling each input within the component. The backend I built required for each of these things be connected to each other. An ingredient to an ordering category and a sub recipe, and a sub recipe to the base recipe. Because of this I built the api endpoint for creating a recipe to recieve a giant JSON object, which breaks it down and creates those rows in the database in order.

<b>Solution</b>: I found a way to set the sub recipe state to an array filled with an object template for all of the keys that one sub recipe with one ingredient would have. When a user clicks to add an additional subrecipe, I copy the current state into an array, and push another one of the templates into it. For an ingredient in a specific sub recipe, I push another ingredient template into the specific subrecipe in the state. This way I'm able to keep track of each individual ingredient and sub recipe all in one state.

## Features to Implement Next
[Back to top](#table-of-contents)

<b>Overview</b>: I would like to implement many features to this application, I see this being something I work on for many years as a passion project. The next few features I would like to work on for the admin user include: Organizing the restaurants current menu, the ability to share certain recipes with team members, and an ordering guide for the entire current menu.

### <b>Feature</b>: Current Menu
<b>How I would do it</b>: This is a simple implementation, but I would add another table to the database that would like the admin user and a dish, any row of that table linked to a specific user would be a dish on the menu. Further I would like to add some additional information to that table, holding data on the current menu price, and position on the menu.

### <b>Feature</b>: Sharing Recipes
<b>How I would do it</b>: I believe this needs another table as well. Each row in this table would connect a recipe to a non admin user, and a non admin user would have a component made to see recipes that have been shared with them.

### <b>Feature</b>: Ordering Guide
<b>How I would do it</b>: I was thinking ahead a bit when I was designing the initial database schema for this project. Because of that, this feature will be seamless to add to the project. To make this work, I would grab all of the information about the current menu's subrecipes, which include the ingredients. Each ingredient has a category for ordering already set to it. I would then map through the data and organize the ingredients based on the category, and display it as so in a component.

<!-- CONTACT -->
## Contact
[Back to top](#table-of-contents)

Jordan Guevara - [LinkedIn](https://www.linkedin.com/in/jordan-guevara-a9370521a/) - jordansacct@gmail.com

Project Repo Link: [https://github.com/Jguevara1208/Ortolan](https://github.com/Jguevara1208/Ortolan)

Project Link: [https://ortolan.herokuapp.com/](https://ortolan.herokuapp.com/)


<!-- ACKNOWLEDGEMENTS --

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-url]: https://linkedin.com/in/

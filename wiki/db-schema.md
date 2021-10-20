## Users
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| first_name      	| string(50)  	| not null         	|
| last_name       	| string(50)  	| not null         	|
| email          	| string(150) 	| not null, unique 	|
| hashed_password 	| string(255) 	| not null         	|
| admin             | Boolean      	| not null         	|
| position          | Boolean      	| not null         	|

<br>
<br>


## Recipes
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| title         	| string(250)  	| not null         	|
| photo         	| string(300)  	|                	|
| user_id          	| integer   	| not null      	|

FK - user_id > Users.id

<br>
<br>


## Components
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| recipe_id      	| integer   	| not null         	|
| description     	| text      	| not null         	|

FK - recipe_id > Recipes.id

<br>
<br>


## SubRecipes
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| title         	| string(250)  	| not null         	|
| recipe_id       	| integer   	| not null         	|
| order          	| integer   	| not null 	|

FK - recipe_id > Recipes.id

<br>
<br>


## Units
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| unit          	| string(50)  	| not null         	|
| user_id       	| integer   	| not null         	|

FK - user_id > Users.id

<br>
<br>


## OrderListCategories
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| user_id        	| integer    	| not null         	|
| name          	| string(50)  	| not null         	|

FK - user_id > Users.id
<br>
<br>

## Ingredients
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| name          	| string(50)  	| not null         	|
| category_id      	| integer    	| not null         	|

FK - category_id > OrderListCategories.id

<br>
<br>

## SubRecipeIngredients
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| ingredient_id    	| integer   	| not null         	|
| amount        	| integer   	|               	|
| unit_id          	| integer   	| not null      	|
| description   	| string(500) 	|               	|
| order             | integer     	| not null         	|
| sub_recipe_id     | integer      	| not null         	|

FK - ingredient_id > Ingredients.id
FK - unit_id > Units.id
FK - > sub_recipe_id > SubRecipes.id

<br>
<br>


## Tags
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| name           	| string(50)  	| not null         	|


<br>
<br>


## RecipeTags
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| recipe_id      	| integer   	| not null         	|
| tag_id        	| integer   	| not null         	|

FK - recipe_id > Recipes.id
FK - tag_id > Tags.id
<br>
<br>



## OrderLists
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| user_id       	| integer    	| not null         	|

FK - user_id > Users.id
<br>
<br>


## OrderListItems
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| list_id       	| integer   	| not null         	|
| ingredient_id     | integer   	| not null         	|
| qty            	| string(150) 	| not null      	|

FK - list_id > OrderLists.id
FK - ingredient_id > Ingredients.id

<br>
<br>


## Projects
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| title         	| string(100)  	| not null         	|
| description      	| string(500)  	|               	|
| user_id        	| integer   	| not null         	|

FK - user_id > Users.id

<br>
<br>


## AssignedToProjects
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| cook_id      	    | integer   	| not null         	|
| project_id       	| integer   	| not null         	|

FK - cook_id > Users.id
FK - project_id > Projects.id

<br>
<br>


## Cooks
| Column Name    	| Data Type   	| Details          	|
|----------------	|-------------	|------------------	|
| id             	| integer     	| primary key      	|
| cook_id       	| integer   	| not null         	|
| chef_id        	| integer   	| not null         	|

FK - cook_id > Users.Id
FK - chef_id > Users.Id


<br>
<br>



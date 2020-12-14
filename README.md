# Word Association Game
Created using React and deployed on heroku

Give it a go at http://jtwordgame.herokuapp.com/

My word association game gives you 3 lives or 30 seconds in which you need to score as many points as possible, then see how you rank on the leaderboard.

## This project showcases
An ability to create and deploy a React app, including linking it to my own backend.<br>
Composing components, including passing props to and from both child and parent components.<br>
Using axios to make GET, POST, PUT and DELETE requests using parameters and route parameters.<br>
Creating common components to be reused in many different contexts<br>
Logging in and out a user and getting user data using JWT's.<br>
Working with events.<br>
Form validation using Joi.<br>
Asynchronous code and. conditional rendering.<br>
Using external and personally created modules, including using npm and the terminal.<br>
Deployment using heroku<br>
Routing.<br>
File management and cleancoding practices.<br>
Debugging and patching upon Deployment.<br>

## Homepage
### Word Game
The word game gives you a new random word each time you submit a guess. There are 100 possible answers supplied by an external API.  
Each correct answer gives you a point, each wrong answer subtracts a life.
When you start the game a timer starts from 90 seconds. If the timer expires or you lose all your lives you get taken to the game over screen, where you have the option to add. your score to the leaderboard.<br>
There is also a rules tab you can swap to without resetting an active game

### Top 5 Leaderboard
Shows the current top 5 scores and automatically updates every time a new score is uploaded without refreshing the page

## Leaderboard Page
Shows all posted scores, ordered by points total.<br>
Includes a searchbar, column sorting, and pagination.<br>
You can click on a registered users name to go to their personal leadrboard, if you click on your own name whilst logged in, you get taken to your personal page.

## Personal Page
Shows all your scores, with a delete button to delete scores.<br>
Whenever you play the game whislt logged in, every wrong answer gets stored. You can view these along with 3 potential answers in the wrong words table on your personal page. This table also features sorting, searchbar, pagination and delete button.

## Login/Register Page
A registraion and a login form which feature validation.<br>
Submit button is invalid if fields are not filled in properly, in addition messages appear telling the user the problem.<br>
You are prevented from registering an already taken username.<br>
Automatic login on registration

## Header and footer
Sticky footer, and navbar collapses to a 'hamburger' on small screens.<br>
Login button changes to logout when user logged in, as well as the option to go to your personal page appearing.

## Layout
Resposive layout using bootstrap along with some custom css in order to acheive nice formatting.
Format adapts to any screen size including mobiles, where container overflow is handled with scrollbars.


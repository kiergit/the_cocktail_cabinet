# 🍹 The Cocktail Cabinet

The Cocktail Cabinet is a Node.js and Express web application that uses
TheCocktailDB public API to allow users to search for cocktails and
discover their ingredients, instructions, glass type, category, and
alcoholic status.

## Features

- Search for cocktails by name
- Display cocktail images
- Display ingredients and measurements
- Display preparation instructions
- Display cocktail category
- Display glass type
- Display alcoholic/non-alcoholic status
- Generate a random cocktail
- View an individual cocktail
- Error handling for failed API requests
- Responsive design for mobile and desktop

## Technologies Used

- Node.js
- Express.js
- Axios
- EJS
- HTML
- CSS
- TheCocktailDB API

## API

This project uses TheCocktailDB public API.

API documentation:

https://www.thecocktaildb.com/api.php

## Installation

Clone or download this project.

Open the project folder in your terminal.

Install the required packages:

npm install

## Running the application

Start the server with:

npm start

The application will run at:

http://localhost:3000

## Development Mode

If you have nodemon installed through the project dependencies,
you can run:

npm run dev

The server will automatically restart whenever you modify the code.

## Example Searches

Try searching for:

- Margarita
- Mojito
- Martini
- Negroni
- Daiquiri
- Cosmopolitan

You can also click the Random Cocktail button.

## API Endpoints

The application contains the following Express GET endpoints:

GET /

Displays the homepage.

GET /search?cocktail=margarita

Searches TheCocktailDB for a cocktail.

GET /random

Retrieves a random cocktail.

GET /cocktail/:id

Retrieves a specific cocktail by its API ID.

## How Axios Is Used

Axios is used on the server to send HTTP GET requests
to TheCocktailDB.

For example:

axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php")

The returned JSON data is then processed before being passed
to the EJS templates.

## Data Manipulation

TheCocktailDB provides cocktail ingredients using separate fields:

strIngredient1
strIngredient2
strIngredient3
...

Measurements are also provided separately:

strMeasure1
strMeasure2
strMeasure3
...

The application loops through these fields and combines them
into an array of ingredients.

This makes the API data easier to display to the user.

## Error Handling

The application handles several possible errors:

- Empty searches
- Cocktails that cannot be found
- Failed API requests
- Missing API responses
- Invalid application routes

Users receive a friendly error page or message instead of
seeing raw server errors.

## Author

Kier Vincent Salano

## License

This project was created as a capstone project.

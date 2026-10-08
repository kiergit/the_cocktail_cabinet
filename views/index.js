import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

// TheCocktailDB API
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

/*
 * Takes the cocktail returned by the API and converts
 * the separate ingredient/measurement fields into
 * one easy-to-use array.
 */
function formatIngredients(drink) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ""
            });
        }
    }

    return ingredients;
}

/*
 * Converts the API response into the data
 * our EJS templates actually need.
 */
function formatCocktail(drink) {
    return {
        id: drink.idDrink,
        name: drink.strDrink,
        category: drink.strCategory,
        alcoholic: drink.strAlcoholic,
        glass: drink.strGlass,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb,
        ingredients: formatIngredients(drink)
    };
}

/*
 * GET /
 *
 * Displays the homepage.
 */
app.get("/", (req, res) => {
    res.render("index", {
        error: null
    });
});

/*
 * GET /search
 *
 * Searches TheCocktailDB for a cocktail.
 *
 * Example:
 * /search?cocktail=margarita
 */
app.get("/search", async (req, res) => {
    const cocktailName = req.query.cocktail?.trim();

    if (!cocktailName) {
        return res.render("index", {
            error: "Please enter a cocktail name."
        });
    }

    try {
        const response = await axios.get(
            `${API_URL}/search.php`,
            {
                params: {
                    s: cocktailName
                }
            }
        );

        const drinks = response.data.drinks;

        // The API returns null when no cocktails are found.
        if (!drinks) {
            return res.render("index", {
                error: `Sorry, we couldn't find a cocktail called "${cocktailName}".`
            });
        }

        const cocktails = drinks.map(formatCocktail);

        res.render("cocktail", {
            cocktails
        });

    } catch (error) {
        console.error("API Search Error:", error.message);

        res.status(500).render("error", {
            message:
                "Something went wrong while contacting the cocktail API. Please try again later."
        });
    }
});

/*
 * GET /random
 *
 * Retrieves a random cocktail from TheCocktailDB.
 */
app.get("/random", async (req, res) => {
    try {
        const response = await axios.get(
            `${API_URL}/random.php`
        );

        if (!response.data.drinks) {
            return res.status(404).render("error", {
                message: "The API did not return a cocktail."
            });
        }

        const cocktail = formatCocktail(response.data.drinks[0]);

        res.render("cocktail", {
            cocktails: [cocktail]
        });

    } catch (error) {
        console.error("Random Cocktail Error:", error.message);

        res.status(500).render("error", {
            message:
                "We couldn't retrieve a random cocktail. Please try again."
        });
    }
});

/*
 * GET /cocktail/:id
 *
 * Retrieves one cocktail by its ID.
 *
 * This demonstrates another GET endpoint
 * and gives us more control over individual cocktails.
 */
app.get("/cocktail/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(
            `${API_URL}/lookup.php`,
            {
                params: {
                    i: id
                }
            }
        );

        if (!response.data.drinks) {
            return res.status(404).render("error", {
                message: "Cocktail not found."
            });
        }

        const cocktail = formatCocktail(response.data.drinks[0]);

        res.render("cocktail", {
            cocktails: [cocktail]
        });

    } catch (error) {
        console.error("Cocktail Lookup Error:", error.message);

        res.status(500).render("error", {
            message:
                "Something went wrong while retrieving this cocktail."
        });
    }
});

/*
 * Handle unknown routes.
 */
app.use((req, res) => {
    res.status(404).render("error", {
        message: "The page you are looking for does not exist."
    });
});

/*
 * Start the server.
 */
app.listen(port, () => {
    console.log(`🍹 Cocktail Explorer running at http://localhost:${port}`);
});
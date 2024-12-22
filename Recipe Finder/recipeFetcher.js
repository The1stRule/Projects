
// Error message function

const errorMessage = (error, messageP) => {
    messageP.textContent = error;
    messageP.style.color = "red";
}

// get ingredients and push them in arr

const convertIngredients = (meal) => {
    const ingredients = [];
    for(let i = 1; i < 20 + 1; i++) {
        if(meal[`strIngredient${i}`] !== '' && meal[`strIngredient${i}`] !== null) {
            ingredients.push(`${meal[`strIngredient${i}`]} ${meal[`strMeasure${i}`]}`);
        }
    }

    return ingredients;
}

// Main function

const getMeals = async (ingredient, messageP) => {
    try {
        const dataArr = await fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const mealDetails = await fetchFullDetails(dataArr, messageP);
        return mealDetails || [];
    } catch(error) {
        console.log(error);
        return []
    }
}

// Get meal full details by Id

const fetchFullDetails = async (dataArr, messageP) => {
    if(dataArr.length === 0) {
        errorMessage("Meal not found", messageP);
        return [];
    }

    const meals = [];
    for(const meal of dataArr) {
        try {
            const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            data[0].ingredients = convertIngredients(data[0]);
            meals.push(data);
        } catch(error) {
            console.log(error);
        }
    }

    return meals;
}


// Filter by Category

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            console.log(`Http error status ${response.status}`);
            return [];
        }
        const data = await response.json();
        return data.meals || [];
    } catch(error) {
        console.log(error);
        return [];
    }
}

// export main function(default export)

export default getMeals;
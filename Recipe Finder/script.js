// Recipe Finder App

// import main function
import fetchData from './recipeFetcher.js';

const form = document.querySelector('form');
const mainDiv = document.querySelector('main');
const messageP = document.querySelector('span');

// A function that creates a unordered list with ingredient list

const renderIngredients = (data) => {
    const ul = document.createElement('ul');
    data.forEach((curValue) => {
        ul.innerHTML += `<li>${curValue}</li>`;
    });

    return ul;
}

// Meals render function

const renderMeals = async (ingredient) => {
    try {
        const data = await fetchData(ingredient, messageP)
        for(const meal of data) {
            mainDiv.innerHTML += `
            <div class="meal">
                <div class="img-ingredients">
                    <img src="${meal[0].strMealThumb}">
                    <div class="ingredients">
                        <h2>${meal[0].strMeal}</h2>
                        <ul>${renderIngredients(meal[0].ingredients).innerHTML}</ul>
                    </div>
                </div>
                <p class="instruction-p">${meal[0].strInstructions}></p>
            <div>`
        }
    } catch(error) {
        console.log(error);
    }
}

// Event listener

form.addEventListener('submit', (e) => {
    e.preventDefault();
    mainDiv.innerHTML = '';
    
    messageP.textContent = '';

    const ingredient = form.ingredient.value;
    renderMeals(ingredient);

    form.reset();
})
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mealGrid = document.getElementById('mealGrid');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const error = document.getElementById('error');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

async function searchMeals(ingredient) {
    const query = ingredient.trim();
    if (!query) {
        alert('Please enter an ingredient');
        return;
    }

    loading.style.display = 'block';
    mealGrid.innerHTML = '';
    noResults.style.display = 'none';
    resultsCount.style.display = 'none';
    error.style.display = 'none';

    try {
        const response = await fetch(API_URL + query);
        const data = await response.json();

        loading.style.display = 'none';

        if (!data.meals) {
            noResults.style.display = 'block';
            return;
        }

        displayMeals(data.meals);

    } catch (err) {
        loading.style.display = 'none';
        error.textContent = 'Something went wrong. Please try again.';
        error.style.display = 'block';
    }
}

function displayMeals(meals) {
    resultsCount.textContent = `Found ${meals.length} meal${meals.length > 1 ? 's' : ''}`;
    resultsCount.style.display = 'block';

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'meal-card';

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
            <div class="info">
                <div class="name">${meal.strMeal}</div>
                <div class="category"> ${meal.strCategory || 'Uncategorized'}</div>
                <div class="area"> ${meal.strArea || 'Unknown'}</div>
            </div>
        `;

        card.addEventListener('click', () => showMealDetails(meal));
        mealGrid.appendChild(card);
    });
}

function showMealDetails(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
            ingredients.push(`${measure} ${ing}`.trim());
        }
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
        <div class="modal-content">
            <button class="close" onclick="this.closest('.modal-overlay').remove()">✕</button>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <div class="tags">
                <span class="category">${meal.strCategory || 'Uncategorized'}</span>
                <span class="area"> ${meal.strArea || 'Unknown'}</span>
            </div>
            <h3> Ingredients</h3>
            <ul class="ingredients">
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <h3> Instructions</h3>
            <p class="instructions">${meal.strInstructions || 'No instructions available.'}</p>
            ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank" class="youtube">▶ Watch on YouTube</a>` : ''}
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });
}

searchBtn.addEventListener('click', () => searchMeals(searchInput.value));

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
});
const usersArray = [
    {
      "id": 1,
      "name": "Administrator",
      "username": "admin",
      "password": "admin123"
    },
    {
      "id": 2,
      "name": "Guest",
      "username": "guest",
      "password": "guest123"
    }
];

let cities = [
    {
        "name": "Paris",
        "country": "France",
        "population": 67012883,
        "placesToVisit": ["Eiffel Tower", "Louvre Museum"],
        "imageUrl": "Images/france.jpg"
    },
    {
        "name": "Munich",
        "country": "Germany",
        "population": 2000000,
        "placesToVisit": ["Berlin", "Munich"],
        "imageUrl": "Images/germany.jpg"
    },
];

let btnLogin = document.getElementById("submit-login");
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
let login_div = document.getElementById("login-form");
let cities_div = document.getElementById("cities");
let add_cities_div = document.getElementById("add-city-form");
let remove_cities_div = document.getElementById("remove-city");
let search_div = document.getElementById("search-filter");
let images_div = document.getElementById("images");
let contact_us_div = document.getElementById("contact-us");
let user_rating_div = document.getElementById("user-rating");
let addCityForm = document.getElementById("city-form");
let removeButton = document.getElementById("remove-button");
let searchBar = document.getElementById("search-bar");
let countryFilter = document.getElementById("country-filter");
let countriesSubmenu = document.getElementById("country-filter");
let citySelect = document.getElementById("city-select");
let countries = [...new Set(cities.map(city => city.country))];
let contact_us_btn = document.getElementById("submit-contact-us");
let rating_btn = document.getElementById("submit-rating");
let link_to_cities = document.getElementById("cities-href");
let link_to_add_city = document.getElementById("add-city-href");
let link_to_remove_city = document.getElementById("remove-city-href");
let link_to_search_filter = document.getElementById("search-filter-href");
let link_to_contact_us = document.getElementById("contact-us-href");

btnLogin.addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (login(username, password)) {
        alert("Login successful");
        login_div.style.display = 'none';
        cities_div.style.display = "";
        search_div.style.display = "";
        images_div.style.display = "";
        link_to_cities.style.display = "";
        link_to_search_filter.style.display = "";
        if (username == 'admin' && password == 'admin123'){
            add_cities_div.style.display = "";
            remove_cities_div.style.display = "";
            link_to_add_city.style.display = "";
            link_to_remove_city.style.display = "";
        } else {
            contact_us_div.style.display = "";
            user_rating_div.style.display = "";
            link_to_contact_us.style.display = "";
        }
    } else {
        alert("Login failed");
    }
});

function login(username, password) {
    for (let i = 0; i < usersArray.length; i++) {
        const user = usersArray[i];
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    return false;
}

function populateCities(citiesArray) {
    let citiesSection = document.getElementById("cities");
    citiesSection.innerHTML = "";

    citiesArray.forEach(function(city) {
        let cityElement = document.createElement("div");
        cityElement.classList.add("city");

        let cityName = document.createElement("h3");
        cityName.textContent = city.name;
        cityElement.appendChild(cityName);

        let country = document.createElement("p");
        country.textContent = "Country: " + city.country;
        cityElement.appendChild(country);

        let population = document.createElement("p");
        population.textContent = "Population: " + city.population;
        cityElement.appendChild(population);

        let placesToVisit = document.createElement("p");
        placesToVisit.textContent = "Places to Visit: " + city.placesToVisit.join(", ");
        cityElement.appendChild(placesToVisit);

        let image = document.createElement("img");
        image.src = city.imageUrl;
        cityElement.appendChild(image);

        citiesSection.appendChild(cityElement);
    });
}

window.addEventListener("DOMContentLoaded", function() {
    populateCities(cities);
});

addCityForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let cityNameInput = document.getElementById("city-name");
    let countryInput = document.getElementById("country");
    let populationInput = document.getElementById("population");
    let placesToVisitInput = document.getElementById("places-to-visit");
    let imageUrlInput = document.getElementById("image-url");

    let newCity = {
        "name": cityNameInput.value,
        "country": countryInput.value,
        "population": parseInt(populationInput.value),
        "placesToVisit": placesToVisitInput.value.split(","),
        "imageUrl": imageUrlInput.value
    };

    cities.push(newCity);
    populateCities(cities);

    cityNameInput.value = "";
    countryInput.value = "";
    populationInput.value = "";
    placesToVisitInput.value = "";
    imageUrlInput.value = "";
});

removeButton.addEventListener("click", function() {
    let selectedCityIndex = citySelect.selectedIndex;

    if (selectedCityIndex !== -1) {
        cities.splice(selectedCityIndex, 1);
        populateCities(cities);
    }
});

searchBar.addEventListener("input", function() {
    let keyword = searchBar.value.toLowerCase();
    let filteredCities = cities.filter(function(city) {
        return city.name.toLowerCase().includes(keyword) ||
            city.country.toLowerCase().includes(keyword) ||
            city.placesToVisit.join(", ").toLowerCase().includes(keyword);
    });
    populateCities(filteredCities);
});

countryFilter.addEventListener("change", function() {
    let selectedCountry = countryFilter.value;
    if (selectedCountry === "All") {
        populateCities(cities);
    } else {
        let filteredCities = cities.filter(function(city) {
            return city.country === selectedCountry;
        });
        populateCities(filteredCities);
    }
});

cities.forEach(function(city, index) {
    let option = document.createElement("option");
    option.textContent = city.name;
    option.value = index;
    citySelect.appendChild(option);
});

contact_us_btn.addEventListener("click", function() {
    alert("Thank you for leaving a message, We'll get back to you asap!");
});
let searchResCont = document.getElementById("searchResults");
let searchInputElement = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    // creating an result item
    let resultElement = document.createElement("div");
    resultElement.classList.add("result-item");
    searchResCont.appendChild(resultElement);
    // creating an title element
    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultElement.appendChild(titleEl);
    // creating an break element 
    let breakElement = document.createElement("br");
    resultElement.appendChild(breakElement);
    // creating url element 
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultElement.appendChild(urlEl);
    // creating an break element
    let lineBreakEl = document.createElement("br");
    resultElement.appendChild(lineBreakEl);
    // create an description element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultElement.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function wikipediaSearch(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResCont.textContent = "";
        let searchInput = searchInputElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results)
            });
    }
}
searchInputElement.addEventListener("keydown", wikipediaSearch);
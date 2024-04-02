const formElemnt = document.querySelector("form");
const fetchResult = document.getElementById("search-result");
const searchBtn = document.getElementById("result-btn");

let searchQuery = "";

const APP_ID = "fc2ed73f";
const APP_Key = "4fb8f0fbf11a4e9a3112bfa8809a659b";

formElemnt.addEventListener("submit", async (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  console.log(searchQuery);
  await fetchAPI();
});

async function fetchAPI() {
  const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&from=0&to=60`;
  console.log(url);

  // Try Part

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    console.log(data); // Log the fetched data
    generateHTML(data.hits);
  } 
//   Catch Part
  catch (error) {
    console.Error("Fetch error:",error);
  }

}
function generateHTML(results) {
  let getData = "";
  results.map((output) => {
    getData += `<div class="item">
        <img src="${output.recipe.image}" alt="">
        <div class="container">
            <h2>${output.recipe.label}</h2>
            <button><a href="${output.recipe.url}" target="_blank">View Recipe</a></button>
        </div>
        <p>Calories : ${output.recipe.calories}</p>
    </div>`;
  });
  fetchResult.innerHTML = getData;
}


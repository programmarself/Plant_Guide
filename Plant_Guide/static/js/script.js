// Load datasets
const datasets = {
    summer: "datasets/summer.csv",
    winter: "datasets/winter.csv",
    spring: "datasets/spring.csv"
};

// Fetch and display data for a specific season
function loadSeason(season) {
    const list = document.getElementById(`${season}-list`);
    list.innerHTML = ""; // Clear previous content

    fetch(datasets[season])
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Skip header
            rows.forEach(row => {
                const [name, description] = row.split(",");
                if (name && description) {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${name}</strong>: ${description}`;
                    list.appendChild(li);
                }
            });
            showSection(season); // Show the selected section
        })
        .catch(error => console.error(`Error loading ${season} data:`, error));
}

// Show only the selected section
function showSection(season) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(season).style.display = "block";
}

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
    // Set up buttons
    document.querySelectorAll("nav a").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            const season = event.target.getAttribute("href").replace("#", "");
            loadSeason(season);
        });
    });

    // Initially load Summer section
    loadSeason("summer");
});

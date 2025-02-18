from flask import Flask, render_template, request
import pandas as pd

# Initialize the Flask app
app = Flask(__name__)

# Load datasets
data_paths = {
    "summer": "datasets/summer.csv",
    "winter": "datasets/winter.csv",
    "spring": "datasets/spring.csv"
}
datasets = {}
for season, path in data_paths.items():
    try:
        datasets[season] = pd.read_csv(path)
    except Exception as e:
        print(f"Error loading {season} data: {e}")

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Category route
@app.route('/category/<season>')
def category(season):
    plants = datasets.get(season)
    if plants is None:
        return render_template('404.html', message=f"No data found for {season}"), 404
    return render_template('category.html', plants=plants.to_dict(orient='records'), season=season.capitalize())

# Search route
@app.route('/search')
def search():
    query = request.args.get('q', '').lower()
    results = []
    for season, data in datasets.items():
        matches = data[data['Name'].str.lower().str.contains(query)]
        if not matches.empty:
            results.append({"season": season, "plants": matches.to_dict(orient='records')})
    return render_template('search.html', results=results, query=query)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

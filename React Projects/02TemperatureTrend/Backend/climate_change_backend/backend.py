import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')  # Ensure Matplotlib uses the Agg backend
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

app = Flask(__name__)

# Configure CORS to allow requests from the frontend
CORS(app, resources={r"/*": {"origins": "*"}})

STATIC_DIR = os.path.join(os.getcwd(), "static")
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(STATIC_DIR, filename)

@app.route('/process_city', methods=['POST'])
def process_city():
    data = request.json
    city = data.get('city')

    if city:
        try:
            img_path = process_city_data(city.lower())
            if img_path:
                img_file_name = os.path.basename(img_path)
                return jsonify({"image_path": f"/static/{img_file_name}"}), 200
            else:
                return jsonify({"error": "Error generating image"}), 500
        except Exception as e:
            return jsonify({"error": f"Error processing data for {city}: {str(e)}"}), 500
    else:
        return jsonify({"error": "No city provided"}), 400

def process_city_data(city):
    try:
        # Load the CSV file
        file_path = r"C:\Users\prama\PycharmProjects\climate_change_backend\TemperatureTrendDataset.csv"
        df = pd.read_csv(file_path)

        # Preprocess the DataFrame
        df['Date'] = pd.to_datetime(df['Date'], format='%d-%m-%Y', errors='coerce')
        df = df.dropna(subset=['Date'])
        df['Year'] = df['Date'].dt.year

        # Filter data by city
        city_data = df[df['City'].str.lower() == city.lower()]
        if city_data.empty:
            raise ValueError(f"No data available for the city: {city}")

        # Ensure 'Temp Max' and 'Temp Min' are numeric
        city_data = city_data.copy()  # Ensure we're working with a new DataFrame, not a slice
        city_data.loc[:, 'Temp Max'] = pd.to_numeric(city_data['Temp Max'], errors='coerce')
        city_data.loc[:, 'Temp Min'] = pd.to_numeric(city_data['Temp Min'], errors='coerce')

        # Calculate yearly average temperature
        yearly_data = city_data.groupby('Year').agg({
            'Temp Min': 'mean',
            'Temp Max': 'mean'
        }).reset_index()

        # Calculate yearly average temperature
        yearly_data['Temp Avg'] = (yearly_data['Temp Min'] + yearly_data['Temp Max']) / 2

        # Create a plot
        fig, ax = plt.subplots(figsize=(12, 6))
        ax.plot(yearly_data['Year'], yearly_data['Temp Min'], label='Yearly Avg Temp Min', color='blue')
        ax.plot(yearly_data['Year'], yearly_data['Temp Max'], label='Yearly Avg Temp Max', color='red')
        ax.plot(yearly_data['Year'], yearly_data['Temp Avg'], label='Yearly Avg Temp', color='orange', linestyle='--')
        ax.set_title(f'Yearly Temperature Trends for {city.capitalize()}')
        ax.set_xlabel('Year')
        ax.set_ylabel('Temperature (°C)')
        ax.legend()
        ax.grid(True)

        # Save the plot as an image
        img_file_name = f"{city.lower()}_temperature_trend.png"
        img_path = os.path.join(STATIC_DIR, img_file_name)
        plt.savefig(img_path)
        plt.close(fig)

        return img_path
    except Exception as e:
        print(f"Error in processing data for {city}: {e}")
        return None


@app.route('/compare_cities', methods=['GET'])
def compare_cities_heatmap():
    try:
        # Load the CSV file
        file_path = r"C:\\Users\\prama\\PycharmProjects\\climate_change_backend\\TemperatureTrendDataset.csv"
        df = pd.read_csv(file_path)

        # Preprocess the DataFrame
        df['Date'] = pd.to_datetime(df['Date'], format='%d-%m-%Y', errors='coerce')
        df = df.dropna(subset=['Date'])
        df['Year'] = df['Date'].dt.year

        # Filter for the 8 cities
        cities = ["ahemadabad", "bengaluru", "chennai", "delhi", "hyderabad", "kolkata", "mumbai", "pune"]
        city_data = df[df['City'].str.lower().isin(cities)]

        # Ensure 'Temp Max' and 'Temp Min' are numeric
        city_data['Temp Max'] = pd.to_numeric(city_data['Temp Max'], errors='coerce')
        city_data['Temp Min'] = pd.to_numeric(city_data['Temp Min'], errors='coerce')
        city_data = city_data.dropna(subset=['Temp Max', 'Temp Min'])

        # Group by Year and City and calculate average maximum temperature
        city_year_max = city_data.groupby(['City', 'Year'])['Temp Max'].mean().unstack()
        city_year_min = city_data.groupby(['City', 'Year'])['Temp Min'].mean().unstack()

        # Create a heatmap for max temperatures
        plt.figure(figsize=(12, 8))
        sns.heatmap(city_year_max, annot=False, cmap="coolwarm", linewidths=0.5)
        plt.title("Heatmap of Yearly Max Temperatures Across Cities")
        plt.ylabel("City")
        plt.xlabel("Year")
        img_file_name_max = "city_comparison_heatmap_max_temp.png"
        img_path_max = os.path.join(STATIC_DIR, img_file_name_max)
        plt.savefig(img_path_max)
        plt.close()

        # Create a heatmap for min temperatures
        plt.figure(figsize=(12, 8))
        sns.heatmap(city_year_min, annot=False, cmap="coolwarm", linewidths=0.5)
        plt.title("Heatmap of Yearly Min Temperatures Across Cities")
        plt.ylabel("City")
        plt.xlabel("Year")
        img_file_name_min = "city_comparison_heatmap_min_temp.png"
        img_path_min = os.path.join(STATIC_DIR, img_file_name_min)
        plt.savefig(img_path_min)
        plt.close()

        return jsonify({
            "image_paths": {
                "max_temp": f"/static/{img_file_name_max}",
                "min_temp": f"/static/{img_file_name_min}"
            }
        }), 200
    except Exception as e:
        print(f"Error in processing data for city comparison: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/compare_cities_radar', methods=['GET'])
def compare_cities_radar():
    try:
        # Load the CSV file
        file_path = r"C:\\Users\\prama\\PycharmProjects\\climate_change_backend\\TemperatureTrendDataset.csv"
        df = pd.read_csv(file_path)

        # Preprocess the DataFrame
        df['Date'] = pd.to_datetime(df['Date'], format='%d-%m-%Y', errors='coerce')
        df = df.dropna(subset=['Date'])
        df['Year'] = df['Date'].dt.year

        # Filter for the 8 cities
        cities = ["ahemadabad", "bengaluru", "chennai", "delhi", "hyderabad", "kolkata", "mumbai", "pune"]
        city_data = df[df['City'].str.lower().isin(cities)]

        # Ensure 'Temp Max' and 'Temp Min' are numeric
        city_data['Temp Max'] = pd.to_numeric(city_data['Temp Max'], errors='coerce')
        city_data['Temp Min'] = pd.to_numeric(city_data['Temp Min'], errors='coerce')
        city_data = city_data.dropna(subset=['Temp Max', 'Temp Min'])

        # Calculate the average maximum and minimum temperature for each city
        city_max_temp = city_data.groupby('City')['Temp Max'].mean()
        city_min_temp = city_data.groupby('City')['Temp Min'].mean()

        # Radar Chart Data Preparation for Max Temp
        labels_max = city_max_temp.index.tolist()
        values_max = city_max_temp.values.tolist()
        values_max += values_max[:1]  # Close the circle
        angles_max = [n / float(len(labels_max)) * 2 * 3.14159 for n in range(len(labels_max))]
        angles_max += angles_max[:1]

        fig, ax = plt.subplots(figsize=(8, 8), subplot_kw={'projection': 'polar'})
        ax.fill(angles_max, values_max, color='red', alpha=0.25)
        ax.plot(angles_max, values_max, color='red', linewidth=2)
        ax.set_yticks([])
        ax.set_xticks(angles_max[:-1])
        ax.set_xticklabels(labels_max)
        ax.set_title("Radar Chart of Max Temperatures Across Cities", va='bottom')
        img_file_name_max_radar = "city_comparison_radar_max_temp.png"
        img_path_max_radar = os.path.join(STATIC_DIR, img_file_name_max_radar)
        plt.savefig(img_path_max_radar)
        plt.close()

        # Radar Chart Data Preparation for Min Temp
        labels_min = city_min_temp.index.tolist()
        values_min = city_min_temp.values.tolist()
        values_min += values_min[:1]  # Close the circle
        angles_min = [n / float(len(labels_min)) * 2 * 3.14159 for n in range(len(labels_min))]
        angles_min += angles_min[:1]

        fig, ax = plt.subplots(figsize=(8, 8), subplot_kw={'projection': 'polar'})
        ax.fill(angles_min, values_min, color='blue', alpha=0.25)
        ax.plot(angles_min, values_min, color='blue', linewidth=2)
        ax.set_yticks([])
        ax.set_xticks(angles_min[:-1])
        ax.set_xticklabels(labels_min)
        ax.set_title("Radar Chart of Min Temperatures Across Cities", va='bottom')
        img_file_name_min_radar = "city_comparison_radar_min_temp.png"
        img_path_min_radar = os.path.join(STATIC_DIR, img_file_name_min_radar)
        plt.savefig(img_path_min_radar)
        plt.close()

        return jsonify({
            "image_paths": {
                "max_temp": f"/static/{img_file_name_max_radar}",
                "min_temp": f"/static/{img_file_name_min_radar}"
            }
        }), 200
    except Exception as e:
        print(f"Error in processing data for radar chart: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)

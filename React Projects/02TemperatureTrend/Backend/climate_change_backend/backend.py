import os
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')  # Ensure Matplotlib uses the Agg backend
import matplotlib.pyplot as plt
import pandas as pd
from io import BytesIO

app = Flask(__name__)

# Configure CORS to allow requests from the frontend
CORS(app, origins=["http://localhost:5173"])

@app.route('/process_city', methods=['POST'])
def process_city():
    data = request.json
    city = data.get('city')

    if city:
        try:
            # Generate the plot and return it as a base64 string
            image_base64 = process_city_data(city)
            if image_base64:
                return jsonify({"image_base64": image_base64}), 200
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

        # Ensure 'Temp Max' is numeric
        city_data['Temp Max'] = pd.to_numeric(city_data['Temp Max'], errors='coerce')
        city_data = city_data.dropna(subset=['Temp Max'])

        # Calculate yearly average temperature
        yearly_avg = city_data.groupby('Year')['Temp Max'].mean().reset_index()

        # Create a plot
        fig, ax = plt.subplots(figsize=(12, 6))
        ax.plot(yearly_avg['Year'], yearly_avg['Temp Max'], label='Yearly Avg Temperature', color='orange')
        ax.set_title(f'Yearly Average Temperature Trend for {city.capitalize()}')
        ax.set_xlabel('Year')
        ax.set_ylabel('Average Temperature (°C)')
        ax.legend()
        ax.grid(True)

        # Save the plot to a BytesIO object
        img_io = BytesIO()
        plt.savefig(img_io, format='png')
        plt.close(fig)
        img_io.seek(0)

        # Convert the image to base64
        img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')

        return img_base64
    except Exception as e:
        print(f"Error in processing data for {city}: {e}")
        return None

if __name__ == "__main__":
    app.run(debug=True, port=5000)

import pandas as pd
import matplotlib.pyplot as plt
import os

def process_city_data(city, data_path):
    try:
        # Load the data
        data = pd.read_csv(data_path)

        # Filter the data for the selected city
        city_data = data[data['City'] == city]

        # Ensure 'Temp Max' and 'Temp Min' columns are numeric
        city_data['Temp Max'] = pd.to_numeric(city_data['Temp Max'], errors='coerce')
        city_data['Temp Min'] = pd.to_numeric(city_data['Temp Min'], errors='coerce')

        # Calculate the average temperature for each record
        city_data['Avg Temp'] = (city_data['Temp Max'] + city_data['Temp Min']) / 2

        # Extract year from date and calculate yearly average
        city_data['Year'] = pd.to_datetime(city_data['Date']).dt.year
        yearly_avg = city_data.groupby('Year')['Avg Temp'].mean().reset_index()

        # Plotting
        fig, ax = plt.subplots(figsize=(12, 6))
        ax.plot(yearly_avg['Year'], yearly_avg['Avg Temp'], marker='o', linestyle='-', color='b')
        ax.set_title(f"Average Yearly Temperature Trend for {city}")
        ax.set_xlabel("Year")
        ax.set_ylabel("Average Temperature (°C)")

        # Save plot as an image
        img_path = os.path.join("static", f"{city}_temperature_trend.png")
        plt.savefig(img_path)
        plt.close()

        return img_path

    except Exception as e:
        print(f"Error in processing data for {city}: {e}")
        return None

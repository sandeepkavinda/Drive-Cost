# 🚗 Drive Cost

Drive Cost is a web-based car rental cost calculator that helps users estimate the total cost of renting a vehicle before making a booking. By entering rental details, trip distance, and fuel information, users can calculate estimated rental charges, additional kilometer fees, and fuel expenses.

🌐 **Live Website:** https://drivecosts.netlify.app/

## Purpose

Drive Cost helps users make informed decisions before renting a vehicle. It provides an easy way to estimate trip expenses, compare rental rates, understand extra-distance charges, and calculate potential fuel costs before committing to a rental.

## Features

- **Vehicle Templates** – Choose from predefined vehicles or select Custom.
- **Rental Cost Calculation** – Calculate the base rental cost based on the daily rate and rental duration.
- **Free Kilometer Allowance** – Calculate the total free kilometers included for the rental period.
- **Extra Kilometer Charges** – Estimate additional charges for exceeding the free kilometer allowance.
- **Fuel Cost Estimation** – Calculate fuel consumption and estimated fuel expenses.
- **Cost Breakdown** – View rental charges, extra kilometer fees, and fuel costs separately.
- **Cost Per Day** – Calculate the average estimated cost per rental day.
- **Cost Per Kilometer** – Calculate the average estimated cost per kilometer driven.
- **Real-Time Calculation** – Update the estimated total as input values change.
- **Responsive Interface** – Includes a sticky total-cost display for mobile devices.

## Available Vehicle Templates

Drive Cost provides predefined rental rates and extra-kilometer charges for different vehicle models.

| Vehicle                       | Daily Rate (LKR) | Extra KM Charge (LKR/km) | Fuel Efficiency |
| ----------------------------- | ---------------: | -----------------------: | --------------: |
| Toyota Aqua                   |            6,000 |                       30 |    Manual input |
| Honda Fit GP 5                |            6,000 |                       30 |    Manual input |
| Toyota Prius 3rd Gen          |            7,000 |                       30 |    Manual input |
| Wagon R                       |            4,500 |                       25 |    Manual input |
| Suzuki Every                  |            5,000 |                       25 |    Manual input |
| Suzuki Spacia                 |            4,500 |                       25 |    Manual input |
| Toyota Aqua - 22KM/L          |            6,000 |                       30 |         22 km/L |
| Honda Fit GP5 - 19KM/L        |            6,000 |                       30 |         19 km/L |
| Toyota Prius 3rd Gen - 21KM/L |            7,000 |                       30 |         21 km/L |
| Wagon R - 19KM/L              |            4,500 |                       25 |         19 km/L |

All prices are in Sri Lankan rupees (LKR).

### Custom Vehicle

The **Custom** option allows users to enter their own daily rental rate and extra-kilometer charge instead of using a predefined vehicle template.

## Default Trip Settings

The calculator starts with the following default values:

| Setting                   | Default Value |
| ------------------------- | ------------: |
| Free KM allowance per day |        100 km |
| Number of rental days     |         1 day |
| Default vehicle           |        Custom |

Users can adjust these values according to their rental agreement and travel plans.

## Cost Calculation

### 1. Base Rental Cost

The base rental cost is calculated using the daily rental rate and number of rental days.

`Base Rental Cost = Daily Rate × Number of Days`

### 2. Total Free Kilometer Allowance

The total free distance is calculated for the complete rental period.

`Total Free KM = Free KM per Day × Number of Days`

### 3. Extra Kilometer Charges

Additional charges apply only when the total distance exceeds the free kilometer allowance.

`Extra KM = MAX(Total Distance − Total Free KM, 0)`

`Extra KM Cost = Extra KM × Extra KM Charge`

### 4. Fuel Cost

Fuel expenses are estimated using the total distance, vehicle fuel efficiency, and fuel price per liter.

`Fuel Needed (L) = Total Distance ÷ Fuel Efficiency (km/L)`

`Fuel Cost = Fuel Needed × Fuel Price per Liter`

If fuel consumption is not entered, the calculator treats the fuel cost as zero until a valid value is provided.

### 5. Total Estimated Cost

The final estimated cost includes the base rental cost, extra kilometer charges, and estimated fuel expenses.

`Total Cost = Base Rental Cost + Extra KM Cost + Fuel Cost`

### 6. Average Cost Per Day

`Cost Per Day = Total Cost ÷ Number of Days`

### 7. Average Cost Per Kilometer

`Cost Per KM = Total Cost ÷ Total Distance`

The average cost per kilometer is displayed when the total distance is greater than zero.

## Live Demo

Try the calculator online: **https://drivecosts.netlify.app/**

## ⚠️ Disclaimer

Drive Cost provides estimates based on user-entered information and predefined vehicle templates. Actual costs may vary depending on rental company policies, fuel prices, traffic conditions, driving style, vehicle condition, insurance, taxes, and additional fees.

Fuel consumption values are estimates and may not reflect actual real-world performance.

---

Developed as a practical web application for estimating car rental and trip expenses.

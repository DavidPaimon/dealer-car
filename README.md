# Car Dealer App

## Overview

The **Car Dealer App** is a web application built with Next.js and Tailwind CSS. It allows users to filter and display vehicle models based on the selected vehicle type and model year using data from the VPIC API.

## Features

- Filter vehicles by type and model year
- Responsive design with Tailwind CSS
- Fetches vehicle data from the VPIC API

## Technologies

- **Next.js**
- **Tailwind CSS**
- **VPIC API**

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/car-dealer-app.git
   cd car-dealer-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Go to `http://localhost:3000` in your browser.

## API Endpoints

- **Get Vehicle Types:**
  `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`

- **Get Vehicle Models:**
  `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json`

## GITHUB

https://github.com/DavidPaimon
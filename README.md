# Inventory Manager

Inventory Managing Web App that tracks book inventories over 5 different cities.
It shows the local weather, as well as allows the user to download the data to a CSV file for working in excel or other data processing.

Leverages Next.js to build and interactive Web App with a CRUD API

![Image](https://i.ibb.co/w6N33g5/Screenshot-2022-05-13-at-08-46-55-Inventory-Manager.png)

## Getting Started

#### Prerequisites

To get the app running locally, you will need Node installed.

After installing [Node](https://nodejs.org/en/), run

```bash
npm install
```

For Weather functionality, you will need a free API key from [Open Weather](https://openweathermap.org/). The API is stored in .env.local file as NEXT_PUBLIC_API_KEY

#### Development Server

To run a development server at http://localhost:3000 use

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Application Structure

- This app follows a mostly typical Next.js app structure, using pages directory to create the structure and URL routing of the project.

  - I chose Next.js to use their server side rendering functionality to allow quick loads and communication with the local database.

- The main page shows the cities, their weather and inventory allocated to them.

  - The Layout component is used to create the navigation bar and structure of each page.
  - Each city links to a breakdown of it's items to edit or delete.
  - There are also links on each page to create a new item or list all items, which then allows a CSV download.

- The api endpoints are managed in the api directory.
  - The frontend first checks that any data entry fits the necessary write parameters, then sends the data through the api to the repo component which strips any excess data, revalidates and writes or retreives from the JSON database.

```
inventory-manager/
│   db.json
│
└───pages/
│   │   _app.tsx
│   │   index.tsx
│   │
│   └───api/
│   │     └───cities/
|   |     |        index.ts
│   │     └───items/
|   |           |   index.ts
|   |           |   [id].ts
│   │
│   └───items/
│   │    |  new.tsx
│   │    |  list.tsx
│   │    |
│   │    └───edit/
│   │        │   [id].tsx
│   │
│   └───city/
│        │   [city].tsx
|
└───components/
|        |   Layout.tsx
|        |   Weather.tsx
|        |   repo.ts
|
└───interfaces/
|        |   Item.ts
|
└───public/
|        |   favicon.ico
│
└───styles/
    │   global.css
    │   Home.module.css

```

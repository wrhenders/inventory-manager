# Inventory Manager

Can be seen [on Replit](https://replit.com/@wrhenders/inventory-manager#.replit) by clicking Run

![Image](https://i.ibb.co/w6N33g5/Screenshot-2022-05-13-at-08-46-55-Inventory-Manager.png)

Inventory Managing Web App tracks book inventories over 5 different cities.

- Shows the local weather of the city
- CRUD functionality for working with the data
- Allows the user to download the data to a CSV file

Leverages Next.js to build and interactive Web App with a CRUD API

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

## Application Architecture

- This app follows a mostly typical Next.js app structure, using /pages directory to create the structure and URL routing of the project.

  - I chose Next.js to use their server side rendering functionality to allow quick loads and communication with a local database.

- The main page shows the cities, their weather and inventory allocated to them.

  - The Layout component is used to create the navigation bar and structure of each page.
  - Each city links to a breakdown of it's items to edit or delete.
  - There are also links on each page to create a new item or list all items, which then allows a CSV download.

- The api endpoints are managed in the api directory.

  - The frontend first checks that any data entry fits the necessary write parameters, then sends the data through the api to the repo component which strips any excess data, revalidates and writes or retreives from the JSON database.

- The database is stored locally in a db.json file for testing, but can be changed once deployed.
  - The /components/repo file can switch to a key-value database for using the built in Replit db when deployed. This change can be made by changing the DB env variable.

## Testing

Testing uses the [Cypress](https://docs.cypress.io) library and runs tests to confirm

To use Cypress, after libraries are installed, you can use the CLI with run or Browser GUI using open

```bash
npx cypress run

or

npx cypress open
```

The included end-to-end Cypress tests check:

- All pages are available
- Items can be created
  - Submittals that break the form throw an Alert error
  - Items that are duplicates are added to current quantity
- Items can be deleted

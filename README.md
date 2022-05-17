# Made to order Online Store

This project is a fullstack react and express web app to provide businesses with a online store for custom made products.  The user can look through a list of products select the ones they like and instead of paying for the items right away they fill out a form that will be emailed to the owner.  The owner will then be able to get in contact with the buyer to set up shipping and delivery dates. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

This will need to be done for both the frontend and the backend


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Description of each page

## Main page
This page is an overview of th business, and the owner themselves

## Products page
A list of tiles using the bootstrap library displaying all the products listed in the database

## Cart page
A similar list of tiles as the products page only just showing which items have been stored in the cart for purchase

## Order page
A form where The user will than fill out information and click submit, the form data will then be sent to the owner through their email. 
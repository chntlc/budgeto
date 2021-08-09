# Budgeto

## 1. Project Description
Budgeto is a web application to assist individuals who want to manage their expenses and gain clear insights into their spending patterns. Seamlessly upload your receipts, edit & filter items by categories, and view the trends of your expenses. See more. Spend less. Budgeto.

## 2. Goals

### Minimal Requirements (3-5)
* Create user, login, logout ✅
* Choose a category ✅
* Ability to enter receipt info ✅
* Set a budget ✅
* See spending: daily, monthly (in a plain format) ✅

### "Standard" Requirements (3-7)
* Pie graph for spending ✅
* Line chart for spending ✅
* Show weekly summary on dashboard ✅
* Calendar to show total spending ✅
     * Pick a date or specific timeframe (day, month & custom range) ✅

### Stretch Requirements (2-3)
* Warning messages for approaching budget ✅
     * Notifications ✅
* Parse a receipt from an image ✅
* Create some kind of grocery list ❗ (╯°□°）╯︵ ┻━┻
     * Based on analytics ❗ (╯°□°）╯︵ ┻━┻
* Generate suggestions ❗ (╯°□°）╯︵ ┻━┻
* Look for offers, or find best price for certain items ❗ (╯°□°）╯︵ ┻━┻

## 3. Tech

### Unit 1 (HTML, CSS, Javascript)
We used a global colour scheme and defined variables for these colours that could be used throughout the project. This helped keep our styles clean and consistent as we did not have random hex codes throughout the code. We used JavaScript in our frontend and backend, and specifically JSX with React to produce elements.

### Unit 2 (React)
We used React useState in combination with Redux toolkit for state management.

We fetched our backend APIs to handle CRUD operations while using useEffect hook to perform side effects such as fetching a user custom categories to be displayed on the application.

### Unit 3 (Node & Express)
We created a backend server using ExpressJs, connecting endpoints of HTTP requests from the frontend. We parsed the data fetched from the database, tailoring it to fit our needs before sending it back to the frontend. 

### Unit 4 (MongoDB)
We used MongoDB to store user, item, category and receipt information. Each information is stored in a collection created using schemas. We use Mongoose to create collections and schemas and to fetch information from MongoDB.

### Unit 5 (Release Engineering)
We have modified the package.json to install the npm packages and to build a react-app which will be used to render pages on the production environment. We used GitHub actions to have continuous deployment of our app to Heroku. Heroku will start up the server which serves the react-app to render different pages using the production build.

## 4. Above and Beyond Functionality
In addition to allowing users to manually add rows of inputs to add their spendings, we also implemented a functionality where users can upload a receipt to record their transactions. We leveraged an open source OCR library called Tesseract.js to parse a receipt image into base64 text string. Using regular expressions, we were able to filter for information needed to create transactions that capture the user’s spendings.

## 5. Next Steps
We are planning to implement more analytics and provide suggestions to users based on their spending patterns (such as setting budgets for specific categories). As we support receipt uploading and can store items and business data, providing users with relevant store flyers or coupons would be valuable. In the future, we could look for similar items across different establishments and find the best prices. Generating a grocery list for frequently purchased items is also something we'd like to look into in the future.

## 6. Team Contributions

#### Chantal:
I worked on the general design and theme of our web application, choosing colour schemes, setting up reusable CSS variables and React components, and consolidating styles across the project. Also integrated Redux Toolkit for state management and setup the correct scripts and GitHub actions for Heroku deployment. I focused on general team organization, keeping track of issues that need to be worked on, setting reminders, and driving meetings.

#### Kass:
Leveraged Tesseract.js to parse a receipt image in order to extract relevant information to create a transaction. Implemented the flow of filtering receipt transactions by creating components and endpoints for handling CRUD operations on categories. Additionally, an open source library called react-beautiful-dnd was also used to enable an intuitive drag-and-drop functionality when filtering transactions.

#### Kevin:
My main focus in this project was to create a Local Authentication Strategy that uses jwtwebtoken library to create a token to maintain user session. User session will keep the user logged in during refresh of the page. When the user is not authenticated, he/she will not be able to route to different pages. Not authenticated users will only be able to access the Landing page. I have also worked with the team to set up GitHub Action for continuous deployment to Heroku.

#### Thomas:
Focused on the design and functionality of the View and the Report pages of the application. Paid extra attention to make the pages user-friendly and incorporated design libraries such as ‘AntDesign’ and ‘Chart.js’ for the aesthetic touch. Implemented a feature to choose and update the profile image of a user, storing the image as a base64 string in the database.

<hr />

<details><summary>Click for Old Project Description</summary>

### Who is it for?
* People who want to see their spending behaviour

### What will it do?
* Allow users to set a daily, weekly, or monthly budget
* Visualize graphical representations of what the spending pattern looks like

### What type of data will it store?
* User data (name, email, password - basic auth)
* JSON objects with item's name, item's price, and an automatically generated `uuid`
* Receipt object with date
* Categories

### What will users be able to do with this data?
* Add a receipt
* Add a unique category
* See spending patterns
     * See if they are going over or under their budget

### What is some additional functionality you can add/ remove based on time constraints?
* Analyzing spending patterns
* Making shopping lists from previous spending data

## Project Task Requirements

### Minimal Requirements (3-5)
* Create user, login, logout ✅
* Choose a category ✅
* Ability to enter receipt info ✅
* Set a budget ✅
* See spending: daily, monthly (in a plain format) ✅

### "Standard" Requirements (3-7)
* Pie graph for spending ✅
* Line chart for spending ✅
* Show weekly summary on dashboard ✅
* Calendar to show total spending ✅
     * Pick a date or specific timeframe (day, month & custom range) ✅

### Stretch Requirements (2-3)
* Warning messages for approaching budget ✅
     * Notifications ✅
* Parse a receipt from an image ✅
* Create some kind of grocery list ❗ (╯°□°）╯︵ ┻━┻
     * Based on analytics ❗ (╯°□°）╯︵ ┻━┻
* Generate suggestions ❗ (╯°□°）╯︵ ┻━┻
* Look for offers, or find best price for certain items ❗ (╯°□°）╯︵ ┻━┻

## Task Breakdown
Choose a category:
* Create buttons to choose categories (including icons)
* Allow user to create a custom category
* Be able to create and categorize before entering receipt info, and edit after

Enter receipt info:
* Create form for entering item name, quantity purchased, item price, date of spending, place of spend (optional)
* Add error handling for invalid inputs

## Prototypes
* Choosing category:
     ![CHOOSE A-1](https://user-images.githubusercontent.com/48393923/119927080-9211b680-bf2d-11eb-9fd1-2a497b693987.jpg)
* Uploading and parsing a receipt:
     ![187835264_248115277117128_97273241836410261_n](https://user-images.githubusercontent.com/37598987/120057173-e84a2c80-bff5-11eb-9891-ce067d19a010.jpg)
* Reports:
    ![KakaoTalk_20210528_231631916](https://user-images.githubusercontent.com/35110824/120060226-5e0cc300-c00b-11eb-8b3d-21fb815a46de.jpg)
    ![KakaoTalk_20210528_231631916_01](https://user-images.githubusercontent.com/35110824/120060227-5ea55980-c00b-11eb-9ae5-d972d288d40f.jpg)
</details>


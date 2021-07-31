# Budgeto

## Project Description
Budgeto is a web application to assist individuals who want to manage their expenses and gain clear insights into their spending patterns. Seamlessly upload your receipts, edit & filter items by categories, and view the trends of your expenses. See more. Spend less. Budgeto.

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
* Create user, login, logout
* Choose a category
* Ability to enter receipt info
* Set a budget
* See spending: daily, weekly, monthly (in a plain format)

### "Standard" Requirements (3-7)
* Pie graph for spending
* Bar graph for spending
* Parse a receipt from an image
* Warning messages for approaching budget 
     * Notifications
* Calendar to show total spending
     * Pick a date or specific timeframe (day, week, month)

### Stretch Requirements (2-3)
* Create some kind of grocery list
     * Based on analytics
* Generate suggestions
* Look for offers, or find best price for certain items

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



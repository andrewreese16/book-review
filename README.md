# Book Review App
Welcome to the Book Review App! This application allows users to manage books, write reviews, and interact with a vibrant community of book enthusiasts. Below you'll find a comprehensive overview of the app's features, user stories, and setup instructions.

## The website is available [Here](https://reader-realm-eef6146ef95e.herokuapp.com/).

## Features
1. **User Registration and Authentication**

    - Register for an account to access personalized features.
    - Log in and log out from any page.
    - Redirect to the homepage or login page after logging out.

2. **Book Management**

   - Add new books to the database.
   - Edit details of books that you added.
   - Delete books that you added.
   - View a list of all books.
3. **Review Management**

   - Add reviews to books.
   - Delete your reviews.
4. **Viewing and Managing Reviews**

   - View reviews for any book.
   - See the author of each review.
5. **Error Handling and Notifications**

   - Receive error messages for missing fields or failed operations.
## Technologies Used
- EJS
- Node.JS
- MongoDB
- Express.JS
- CSS

## Tools and Assistance
- The use of AI such as ChatGPT and Claude were used for degubbing, functionality ideas, and design inquiries 

## Assets Credits
- [Homepage background](https://www.pexels.com/photo/photography-of-book-page-1029141/)
- [book collection background ](https://www.pexels.com/photo/view-of-clouds-during-sunset-880871/)
- [edit book background](https://www.pexels.com/photo/brown-wooden-ladder-on-brown-wooden-bookshelf-220326/)
- [login and sign up background](https://www.pexels.com/photo/low-light-photo-of-opened-book-159872/)
- [Book review background](https://www.pexels.com/photo/chair-beside-book-shelves-2041540/)
- [add new books background](https://www.pexels.com/photo/books-on-shelves-2177482/)


## Check out my User Stories [here](user-stories.md)

## Click [here](https://trello.com/invite/b/66e82e85c1ad2244f5dd7172/ATTI41a8e774282c138f64bb179539333a39735BC5F5/book-review-app) to view my full planning materials.

## Future Plans
- Add the reCAPTCHA feature to ensure only humans are creating accounts
- Add the feature to allow users to follow each other
- Possibly turn into a mobile downloadable app
   
## Installation
   To set up the Book Review App locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/your-username/book-review-app.git
cd book-review-app
```
Install dependencies:
```bash
npm install
```
Create a .env file:
Copy the .env.example file to .env and update it with your configuration settings.

```bash
cp .env.example .env
```
Start the application:
``` bash
npm start
```
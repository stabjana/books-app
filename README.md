# Books

## Second task of React

This is a fork of Margit Tennosaars repository. The aim was to practice React, MUI and working with a ticket system in GitHub.

### Core features

This app helps you to manage books through a modern interface. As a user you can view books in a store-like format, which gives you a brief overview of all the books listed. You can search for specific books via author or title, view the details of the book and add new books to your collection. Material UI components are used for a clean, interactive form design.
List of core features:

- Displays all books
  - with picture (or fallback img)
  - Book title, author and genre
  - Shows a Star rating that can be given in the add part
- Search
  - Filters the books based on title, author or genre and shows the results in real time
- Detailed view shows detailed information about a specific book
  - Larger image and full details
  - A Back button
- Add New book allows to input a new book
  - Title, author, image, genre, completed status, finish date and rating
  - Sends the new book to the server using a POST request and updates the book list

### User guide

- open the folder in vs code
- open the terminal in vs code with command + J
- start the mock backend with the command: `npm run server`
- start the local server with the command: `npm run dev`
- copy the address of the local host to your browser `http://localhost:5173/`
- now you can see the website
- to terminate the server press ctrl + c in the vs code terminaly

# Sonar Cloud Badge

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=stabjana_books-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=stabjana_books-app)

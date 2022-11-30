# Animal Crossing Playlist
### Three Day Project - Animal Crossing New Horizon Playlist App

Want to listen to your favorite ACNH bops without access to your switch? This application features all ACNH songs with an easy, clean UI, so users can create dynamic playlists of their favorite K.K. Slider hits.

## Table of Contents
1. [Tech Stack](#tech-stack)
1. [Technical Challenges](#technical-challenges)
1. [Future Improvements](#future-improvements)
1. [App Demo](#app-demo)
1. [Using this Repo](#using-this-repo)

## Tech Stack
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## Technical Challenges
- The Animal Crossing API crashed on the second day of the project, and I was unable to access any of the album cover images or music. I ended up using various Animal Crossing sites as a quick fix — links to the album covers from Nookazon, song titles from a fan-made excel sheet, and links to the music files from Nookipedia.
- I had never worked with an audio html element, so changing the currently playing music presented issues until I added a useEffect hook to pause the previous song and play the current one.

## Future Improvements
- store the album covers and music in Cloudinary so application not reliant on Nookazon or Nookipedia
- add genres to songs
- add sort by recently added, alphabetical, genre to song list and playlist
- add button to play all music in playlist in order
- caching song covers

## App Demo

https://user-images.githubusercontent.com/57077900/204892550-aba036c9-3811-418c-9418-b32547eae55d.mov

## Using this Repo

> Make sure you have Node 6.13.0 installed!  

Install dependencies within the root directory by running:

```sh
npm install
```

Then, set up the environment by refactoring the example.env file as directed, and seed the database by executing the sql config file from the command line by typing:

```sh
psql postgres < db/config.sql
```

Finally, run the app in development by running the following scripts in the root directory:

```sh
npm run client-dev
npm run server-dev
```

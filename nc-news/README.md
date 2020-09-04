# Charlotte's NC-News

This nc-news frontend allows users to interact with our crafted nc-news backend. When our app is running we have a website where users can browse through articles, vote on articles and write comments (when logged in).

## Backend

The backend api we interact with for this project can be found here:
https://charlottes-nc-news.herokuapp.com/api

We can access the raw data by appending paths to the above URL as per the descriptions given when following the link.

## Frontend

As a user you can:

1. view a list of trending and most recent articles on the homepage
2. view a list of articles filtered by topic
3. sort list of articles filtered by topic by: most recent, most liked and most comments
4. view the contents of any article
5. view the comments of any article

As a logged in user there is some additional functionality:

6. vote on any single article and see the change instantly
7. vote on any comment and see the change instantly
8. post a new comment on any single article and see your posted comment instantly
9. delete any comments that you have written.

## Deployed Version

You can try the frontend out for yourself at this link: https://charlottebrady-nc-news.netlify.app

## Running this project locally

To run this project locally on your system follow the below steps

1. Ensure you have an updated version of Node installed (v12.18.1 minimum). You can check this by running the command

   `node --version`

2. Fork and clone the repo given at this link: https://github.com/charlottebrady/fe-nc-news.git

   `git clone https://github.com/charlottebrady/fe-nc-news.git`

3. cd into the nc-news directory

4. there are numerous packages you will need to install before running the app. These are:

   a. `axios`

   b. `react`

   c. `@reach/router`

   d. `styled-components`

   e. `cors`

5. when everything is successfully installed run the following command to start the development server:

   `npm start`

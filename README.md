1. What is the URL to your GitHub-Pages site? \
  https://benjaminye36.github.io/search-demo/
2. What API did you use and why? \
  I used [Dungeons and Dragons (Alternate)](https://open5e.com/) because it requires no auth, supports CORS and have search api with ordering parameters. \
  I've used APIs that required API keys in my other projects, but the API key won't be safe if it is used directly in the front-end without using any kind of backend or middleware.
  I also don't want to force the users to request an api key themselves just for testing my website.
3. What are some other applications for your API other than searching? Name a few and describe how an app using it for that purpose might work.\
  Other applications for the API I chose are listing information from the game like spells, weapons etc. An app using these listing apis can serve as a game wiki page for to display all this information.
4. Explain the considerations you needed to make for the website to be responsive & mobile-friendly. \
  Using bootstrap layout classes to help with the responsive aspect, so it could fit small to large screen sizes. \
  Also, testing out the smaller screen size through developer tools and adjust element size accordingly is important.
5. How can you make your app accessible to people with disabilities such as blindness or colorblindness? \
  I provided enough contrast ratio between the background color and text color, is user-friendly in using keyboard shortcuts (users can complete a query with tabs and enters), didn't rely only on color to convey the information (the website also uses icons to indicate success/error), and provided aria-label for interactive elements to help people that rely on screen-reader to navigate the website.
6. If you could make further changes to your project to improve/expand the experience, what would they be and how would you go about implementing them? \
  One improvement could be open up a popup to display all the information when a button in the table row is clicked instead of just showing a few columns of information in a row in the table.
  To implement this, besides passing props, we need onClick handlers for buttons in the table rows and a popup component to display all the mapped information from a specific search result row in a table in the popup page.

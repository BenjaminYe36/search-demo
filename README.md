1. What is the URL to your GitHub-Pages site? \
  https://benjaminye36.github.io/search-demo/
3. What API did you use and why? \
  I used [Dungeons and Dragons (Alternate)](https://open5e.com/) because it requires no auth, supports CORS and have search api with ordering parameters.
5. What are some other applications for your API other than searching? Name a few and describe how an app using it for that purpose might work.\
  Other applications for the API I chose are listing information from the game like spells, weapons etc. An app using these listing apis can serve as a game wiki page for to display all these information.
7. Explain the considerations you needed to make for the website to be responsive & mobile-friendly. \
  Using bootstrap to help with the responsive aspect, so it could fit small to large screen sizes.
9. How can you make your app accessible to people with disabilities such as blindness or colorblindness? \
  I could use alt for icons and non-text elements, create descriptive title names and use visual icons in addition to color change to convey information like error or alerts.
11. If you could make further changes to your project to improve/expand the experience, what would they be and how would you go about implementing them? \
  One improvement could be open up a pop up to display all the information when the table row is clicked instead of just showing few information in a row in the table.
  To implement this, we need onClick handlers for the table rows and a popup element to map attributes of a specific query result to a list on the popup page.

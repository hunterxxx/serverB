1. Announcement is the frontend React client running on port 3000 by default
The Announcement is displayed in chronological order.
After creating a new announcement, it is sorted this way as well.
To Begin:
- npm start
2. serverB is the backend nodeJS Express server running on port 3001
To begin:
- node server.js

Instruction to use:
Once started both front- and backend.
User can create a new announcement in the input text field and click on 'Create' Button delete an annoucement via the 'Delete' buttonas well as filter it based on: ALL, last 7 Days and last 30 Days.

Every user interaction is reflected immediately on the UI.
It has 4 default dummy data (announcements), which can be viewed on the server.js from line 25 to 30.

If more time:
Used Redis as I thought I should use it for in memory storage.
Then I tried out with localstorage. However, as server is not a browser, it does not have localstorage that I can use.
Therefore I used a mock local storage provided by the npm.
Would have used a database as it would be easier.


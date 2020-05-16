# asteroid_app

An application that displays a potentially dangerous asteroids based on a entered<br>
time interval [StartDate, EndDate]. The difference between StartDate and EndDate should not<br>
be greater than 7 days.

After chosing the time interval and by clicking the "Asteroids Views" button a table is being created.<br>
Table contains potentially dangerous asteroids and thair data in the selected period of time.<br>
In autocomplete dropdown, only the filtered asteroids from the table are being displayed.<br>
The selected asteroid is displayed in the list of selected asteroids.<br>
Also there is the option of removing them from the list.

By clicking on the "Number of Earth Passes" button a page is displayed containing the name<br>
of an asteroid and chart showing the value of how many times it went past the earth from <br>
1900 to 1999.

The public NASA API is used for collecting the data. 

Created with Vanilla JavaScript, styled with SASS.

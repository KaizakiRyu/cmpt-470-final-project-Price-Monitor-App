# Comments about the project
## Working features
- Register/Login (User must login to see the products)
- Profile page (User can update his/her username, password)
- Retrieve product info, user info, comment info for every product and the wishlist info
- Add/Edit/Update/Delete Product 
- Add/Edit/Update/Delete URL of the product
- The lowest price of the product is shown (based on URLs' prices, default will be N/A)
- Web scraping on lowest price (although it takes 10-15 seconds to update the price and it will update the price again for every 30 minutes)

## Not-working features
- Adding/Update product image (It was working locally but we had to remove it when deploying on Docker because of the write permission issue)
- Push notification through web UI and email to notice user when the price is dropped

## Other useful notes
- When signing up, user will have full privillege to the system since we did not implement admin, moderator and user role
- User is able to update the price manually but the price will be overwritten if the scraper finds out the actual price.
- Users can only delete their own comments but not someone else.
- The backend is protected against SQL Injection, XSS and CSRF attack. 
- The UI is responsive to various screen.
- Every requests except for register and login requests will require token key which provided from the server.
- Simple password/Common password is not accepted (user: admin, password: admin is not accepted).

## Accessible URL
- Navigate to localhost:3000 to see the website.
- Hidden link: localhost:3000/product/all to see all the products

# Command for Running locally
## Prerequisite
- python3
- pip
- pipenv
- node
- postgresql
## Setting up postgres db
http://zetcode.com/springboot/postgresql/

Go to this link to setup the postgresql with the following parameters

Please only look at the postgresql section

- user: testuser
- Shall the new role be a superuser? (y/n) n
- Shall the new role be allowed to create databases? (y/n) y
- Shall the new role be allowed to create more new roles? (y/n) n
- Password: 123  
- db: testdb
- 

If you are on mac links below would help you to setup your database too 
(database name : testdb , user name : testuser ,Password: 123   )
http://www.marinamele.com/taskbuster-django-tutorial/install-and-configure-posgresql-for-django


## Running backend
- Open up a terminal in the project folder
- Run command: `pipenv install` and `pipenv shell`
    - for mac users :  if you havent installed brew first run `pip3 install pipenv` then `brew install pipenv` 
- cd to /backend/backend
- Open `settings.py` and change the setting for the database (the steps are there)
- Run command `python3 manage.py runserver` to start backend server

## Running web scraping API
- On another terminal, run `sudo docker run -p 8050:8050 scrapinghub/splash` to start splash server for web scraping
- Open a separate terminal, cd to scraper, and run `scrapyd` to run the web crawler
- On another terminal, cd to scraper, run `scrapyd-deploy` to update the crawler to the latest version
- Execute `curl http://localhost:6800/schedule.json -d project=scraper -d spider=pricespider` to webscrape and update db
- Go to http://localhost:6800/ and click on Jobs to see the scraper tasks
- Once all tasks are finished, run `psql -U testuser -d testdb` to go into the db, and run `Select * from api_productlinkprice` to check the price updated

## Running periodic task to update db automatically
- Get the web scraping API working first (see step 1->3 above)
- On a terminal, run `docker run -d -p 5672:5672 rabbitmq`
- On another terminal, cd to backend, run `celery -A backend worker -l info`
- On another terminal, cd to backend, run `celery -A backend beat -l info`
- Now, every 30 minutes, Vancouver time, the scraper will automatically update the db

## NOTE: 
- Web scraping only run when execute `scrapy crawl pricespider` command
- Need to configure Django to run it as periodic task 
- Only works with neweggs.ca site at the moment 

# React installation guide (local-development):
- Please make sure to install these libraries before using:
- `npm install @material-ui/core`
- `npm install react-bootstrap bootstrap`
- `npm install --save react-toastify`
- `npm i react-addons-update`
- `npm install react-icons --save`

## Running frontend
- Open up another terminal in the project folder
- cd to /frontend
- Run command: `npm install` to install all dependencies
- Run command: `npm start` to start frontend server

# Production/local mode backend checklist
Need to modify these file accordingly (uncomment and comment the correct line)before running production mode and vice versa
- In /scraper/scraper/settings.py, change SPLASH_URL
- In /scraper/scraper/piplines.py, change hostname
- In /scraper/scraper/pricespider.py, change hostname
- In /backend/backend/settings.py, change CELERY_BROKER_URL and CELERY_RESULT_BACKEND
- In /backend/backend/settings.py, change HOST
- In /backend/backend/settings.py, change DEBUG
- In /backend/api/tasks.py, change response
- In /backend/api/utils.py, change response

# Running in production mode
- cd to the project folder
- Run command: `docker-compose build && docker-compose up`
- Navigate to http://localhost:3000 to see the frontend
- When finish using the app, run command : `docker-compose down && docker system prune -f` to destroy the docker image

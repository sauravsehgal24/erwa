## DEV CONFIG ##

This project contains the springboot api and react ui. Below are the steps to run both ui and api:

### Prerequists ###
- node 22.*
- npm 10.*
- python
- pip (python package manager)

### configure and run  erwa/erwaui ###
- navigate to the erwaui folder in terminal or command-line
- run the following command: npm i --save --force
- the above command will install all the dependencies (just ignore all the errors)
- now run the following command in the same folder: npm start
- this should start the app and you can navigate to the displayed url to see the ui
- navigate to http://localhost:3000
- you should see the sign-in page
- just click on "Sign In" button without entering any credentials
- you should be re-directed to admin dashboard page

### configure and run  erwa/erwaapi ###
- backend has 2 projects: ocrlib and erwaapi
- ocrlib is a standalone python project in which you can add your ocr related code and run it locally without running the django server
- erwapi is django server 
#### Import the ocrlib in erwaapi ####
- go to erwa/ocrlib and after adding your code, run this command to install the package locally: pip install .
- this will install the orclib package in your local python repo
- you can now import the functions from ocrlib into your erwaapi project with this import statement: from ocrlib import <func_name>
- see the example i did in erwa/erwaapi/app/views.py
- i have imported greet() function from ocrlib and added a route infront of it so whenever server starts and user can navigate to that route to see the greet message
#### Run the erwaapi ####
- go to erwa/erwaapi and run the command to start the server: python manage.py runserver
- this will start the server at localhost:8000
- NOTE: if you change the contents of ocrlib then you need to reinstall the ocrlib package in your local with the command noted above
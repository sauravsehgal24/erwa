## DEV CONFIG ##

This project contains the springboot api and react ui. Below are the steps to run both ui and api:

### Prerequists ###
- node 22.*
- npm 10.*
- python
- pip (python package manager)

## UI ##

### configure and run  erwa/erwaui ###
- navigate to the erwaui folder in terminal or command-line
- run the following command: ```npm i --save --force```
- the above command will install all the dependencies (just ignore all the errors)
- now run the following command in the same folder: npm start
- this should start the app and you can navigate to the displayed url to see the ui
- navigate to http://localhost:3000
- you should see the sign-in page
- just click on "Sign In" button without entering any credentials
- you should be re-directed to admin dashboard page

## BACKEND ##

**NOTE:** backend has 2 projects: **ocrlib and erwaapi**

- ocrlib is a standalone python project in which you can add your ocr related code and run it locally without running the django server
- erwapi is django server 

### Import the ocrlib in erwaapi ###
- go to erwa/ocrlib and after adding your code, run this command to install the package locally: ```pip install .```
- this will install the orclib package in your local python repo
- you can now import the functions from ocrlib into your erwaapi project with this import statement: from ocrlib import <func_name>
- see the example i did in erwa/erwaapi/app/views.py
- i have imported greet() function from ocrlib and added a route infront of it so whenever server starts and user can navigate to that route to see the greet message

**NOTE:** YOU HAVE TO INSTALL THIS OCRLIB LIBRARY ATLEAST ONCE BEFORE PROCEEDING

### configure and run  erwa/erwaapi ###
- install all the python dependencies: navigate to erwa/erwaapi and run the following command: ```pip install -r requirements.txt```
- this will install all the required dependencies to run the project
- if the above command doesnt work then you can copy the command from erwa/erwaapi/dependencies_install_command.txt
- copy and run that command in terminal and that should install all your dependencies
- if you adding new dependencies then make sure to run the following command after you install your dependencies inroder to update the requirements.txt: ```pip freeze > requirements.txt```  and append the dependency name in erwa/erwaapi/dependencies_install_command.txt

### Run the erwaapi backend server ###
- go to erwa/erwaapi and run the command to start the server: ```python manage.py runserver```
- this will start the server at **localhost:8000**

**NOTE:** if you change the contents of ocrlib then you need to reinstall the ocrlib package in your local with the command noted above

### OPTIONAL - configure meta llama in your local ###
- install ollama : https://ollama.com/download/windows
- once installed, open cmd and run this command: ollama run llama3.2:1b
- this will install the ollama run llama model in your local 
- you will see the success message once installed and then it will generate a prompt entering command and you can then enter your prompts
- i have integrated this in erwa as well, navigate to erwa/ocrlib/llama/llama.py
- run that file and you can interact with that model


### PYTHON COMMANDS ###
- python manage.py runserver (to run the server locally at localhost:8000)
- python manage.py makemigrations    (create the migration file to run the migration against db, this has to be run before the below command after any model changes)
- python manage.py migrate 
- nohup python manage.py runserver 0.0.0.0:8000 > server.log 2>&1 & (run server in bg and forward logs to log file)

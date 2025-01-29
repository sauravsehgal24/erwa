## DEV CONFIG ##

This project contains the springboot api and react ui. Below are the steps to run both ui and api:

### Prerequists ###
- maven 3.8.*
- java 17
- node 22.*
- npm 10.*

### configure and run  erwa/erwa-ui ###
- navigate to the erwa-ui folder in terminal or command-line
- run the following command: npm i --save --force
- the above command will install all the dependencies (just ignore all the errors)
- now run the following command in the same folder: npm start
- this should start the app and you can navigate to the displayed url to see the ui
- navigate to http://localhost:3000
- you should see the sign-in page
- just click on "Sign In" button without entering any credentials
- you should be re-directed to admin dashboard page

### configure and run  erwa/erwa-api ###
- you need to configure the java source paths in the respective ide you are going to use
- you might also need to configure the java jdk version and runtime and maven version for the project based on the ide you using
- i am using vs code and i had to install the java extension pack extension for it to work
- navigate to the erwa-api folder in terminal or command-line
- run the following command: mvn clean install  (this will install the dependencies and will run the test cases)
- now right click on the ErwaApiApplication.java file and run the file
- this should start the api server on port 3001
- navigate to http://localhost:3001/hello
- you should see the message "server up"
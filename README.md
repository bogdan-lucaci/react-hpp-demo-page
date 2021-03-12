# HPP demo page

**React** + **Material UI** application that allows the user to create, configure the body and submit a POST request.

> **`DATA_RAW.js`** is not available inside this repository for security reasons

### Functionalities so far:
- *< to be updated >*
- UI - dark/ligt mode theme switch
- UI - panel presenting a POST to be submitted overview (params alphabetically ordered)
- toggle accordion areas based on POST URL value ***(\<InputPostUrl\>)*** and Form Data Model ***(src/data/FormDataModel.js)***
- connect **POST URL** list value to **MerchantID helper** list
- clear **MerchantID** value when POST URL value changes
- connect **MerchantID** value to **SiteID helper** list

### Functionalities to come:

- add values to desired inputs according to POST URL value (extend FormDataModel)
- set **Signature** value according to MerchantID / SiteID combination
- add the ability to specify a custom POST URL
- add POST URL to **\<PostOverview\>**
- implement **Hash** and **ComputedString**
- add only desired params to POST body
- handle all helpers
- add custom actions with icons to inputs (clear input, regenerate random val, etc)
- save and restore form data from **localStorage**
- set form action and form inputs value from by URL params


### Components overview

v0.2 - 2021/03/10
<img src="AppDiagram/APP_structure_v0.2.svg">

##### Previous versions:
- [v0.1 - 2021/03/09](https://raw.githubusercontent.com/bogdan-lucaci/react-hpp-demo-page/master/AppDiagram/APP_structure_v0.1.svg)


### ----------


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
<!---
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
--->

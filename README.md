This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Fixed errors, optimisations and adjustments from the original repo

1. Removed commas in App.js after declaring every Route component
2. Added missed semicolons in a few places
3. Removed side effects from the products reducer ( reducers shouldn`t containt any side effects )
   and placed them into action creators ( could also be done in the component, but it's more scalable that way )
4. Changed default state value for "featured" checkbox ( it was causing controlled/uncontrolled form error )
5. Parse the return value of generateId() from string to number
6. Made submit button disable and prevent clicking when the form is invalid
7. Removed unused actions "requestCategories" and "requestProducts"
8. Removed unused "timestampToDays()" and written new function "getDaysDiff()"
9. Checkbox "Featured" checked every time when the user select "Rating" more than 8 ( note that it will not uncheck
when reselect "Rating" under 8 )
10. Added validation for "Expiration date" to a minimum of 30 days in the future
11. Added missing dispatch methods for creating/updating product

## Refactoring suggestions

1. Create "pages" folder and place there components which will be rendered by Router ( e.g "ProductsContainer", "UpdateFormContainer", "AddFormContainer" )
2. Use TypeScript instead of PropTypes or in the extreme case write shapes for objects and arrays
3. Refactor Class Components to Functional Components ( those which use Redux are class components )
4. Use Redux hooks - useSelector, useDispatch instead of mapStateToProps
5. Create reusable components for the form ( e.g <InputGroup /> by combining FormGroup, Label and Input)
6. Use library for the forms like "Formik"
7. Helper methods like "validators.js" is better to be in separate folder and not in components
7. Add some stylings :)
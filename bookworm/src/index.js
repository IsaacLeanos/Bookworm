import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import{Provider}from'react-redux'
import{createStore,applyMiddleware}from'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import decode from 'jwt-decode'
import{composeWithDevTools}from'redux-devtools-extension'
import{BrowserRouter,Route}from'react-router-dom'
import{userLoggedIn}from'./actions/auth'
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationHeader from './utils/setAuthorizationHeader'
import 'semantic-ui-css/semantic.min.css';

const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

if(localStorage.bookwormJWT){
    const payLoad=decode(localStorage.bookwormJWT)
    const user={
        token:localStorage.bookwormJWT,
        email:payLoad.email,
        confirmed:payLoad.confirmed
    }
    setAuthorizationHeader(localStorage.bookwormJWT)               //header after a request past the login request (INSPECT)
    store.dispatch(userLoggedIn(user))
}

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
    <Route component={App}/>
    </Provider>
    </BrowserRouter>
    ,document.getElementById('root'));
registerServiceWorker();


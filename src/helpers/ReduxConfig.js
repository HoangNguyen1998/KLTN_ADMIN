import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "reducers";
import rootSaga from "sagas";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];
const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;

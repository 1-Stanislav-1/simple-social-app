import {combineReducers, configureStore} from "@reduxjs/toolkit";
import sliceLocation from "./sliceLocation";
import sliceHome from "./sliceHome";
import sliceSignIn from "./sliceSignIn";
import sliceSignUp from "./sliceSignUp";
import sliceAccount from "./sliceAccount";
import sliceAccountEdit from "./sliceAccountEdit";
import slicePeople from "./slicePeople";

export const rootReducer = combineReducers({
    sliceLocation,
    sliceHome,
    sliceSignIn,
    sliceSignUp,
    sliceAccount,
    sliceAccountEdit,
    slicePeople
});

export const setStore = () => configureStore({reducer: rootReducer});
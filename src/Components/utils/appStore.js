import { configureStore } from "@reduxjs/toolkit";

import userreducer from "./userSlice";
import feedreducer from "./feedSlice";

const appstore = configureStore({
    reducer: {
        user: userreducer,
        feed: feedreducer
    }
})

export default appstore;
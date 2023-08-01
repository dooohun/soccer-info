import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import soccerSlice from "./soccerSlice";
import { mainPageApis } from "../services/mainPageApis";
import { teamInfoApis } from "../services/teamInfoApis";


export const store = configureStore({
  reducer: {
    soccerInfo: soccerSlice.reducer,
    [mainPageApis.reducerPath]: mainPageApis.reducer,
    [teamInfoApis.reducerPath]: teamInfoApis.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(
      mainPageApis.middleware,
      teamInfoApis.middleware,
    )
    )  
})

setupListeners(store.dispatch);
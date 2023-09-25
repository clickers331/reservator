import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["users/add", "user/updateUserDetails"],
        ignoredActionPaths: [
          "payload.timestamp",
          "payload.birthDate",
          "user.birthDate",
        ],
      },
    }),
});

export default store;

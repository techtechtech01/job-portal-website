import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/toast"
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist";
import store ,{persistor}from './redux/store.js'

import { PersistGate } from "redux-persist/integration/react";

 
//const persistor = persistStore(store);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>

      <App />
      <Toaster />
      </PersistGate>

    </Provider>

  </StrictMode>,
)

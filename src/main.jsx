import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/store.js'
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh(){
    if(confirm("New Content Available. Reload?")){
      updateSW(true);
    }
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
)

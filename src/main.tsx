import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { UnlockedProvider } from "./providers/UnlockedContext"

document.documentElement.classList.add("dark") // 🌙 SEMPRE DARK

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UnlockedProvider>
        <App />
      </UnlockedProvider>
    </BrowserRouter>
  </React.StrictMode>
)

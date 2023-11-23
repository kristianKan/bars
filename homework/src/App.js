import "./App.css"
import { Provider } from "react-redux"
import { store } from "./store"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Data from "./components/Data"
import Datum from "./components/Datum"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Data />} />
            <Route exact path="/datum/:id" element={<Datum />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App

import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Data from './components/Data'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Data />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

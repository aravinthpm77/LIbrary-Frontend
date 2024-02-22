import {BrowserRouter} from 'react-router-dom';
import AllRoutes from './routes.jsx'
import './App.css';

function App() {
  return (
    <div >
      <BrowserRouter>
        <AllRoutes/>
      </BrowserRouter>

    </div>
  );
}

export default App;
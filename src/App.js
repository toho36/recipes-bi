import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;

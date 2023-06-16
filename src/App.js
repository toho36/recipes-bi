import SearchBar from './components/SearchBar';
import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
        <SearchBar />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;

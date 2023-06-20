import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [input, setInput] = useState('');
  const [searchOption, setSearchOption] = useState('name'); // Default search option is 'name'
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      navigate('/'); // Navigate to the homepage if the search input is empty
    } else {
      if (searchOption === 'name') {
        navigate(`/search?name=${input}`);
      } else if (searchOption === 'tags') {
        navigate(`/tag/${input}`);
      } else if (searchOption === 'authors') {
        navigate(`/author/${input}`);
      }
    }
  };

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <FormStyle onSubmit={submitHandler}>
        {/* <FaSearch></FaSearch> */}
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
        />
        <label>
          <input
            type="radio"
            value="name"
            checked={searchOption === 'name'}
            onChange={handleOptionChange}
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            value="tags"
            checked={searchOption === 'tags'}
            onChange={handleOptionChange}
          />
          Tags
        </label>
        <label>
          <input
            type="radio"
            value="authors"
            checked={searchOption === 'authors'}
            onChange={handleOptionChange}
          />
          Author
        </label>
      </FormStyle>
    </div>
  );
}

export default SearchBar;

const FormStyle = styled.form`
  margin: 2rem 10rem;
  div {
    position: relative;
    width: 100%;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    width: 100%;
    outline: none;
  }
  svg {
    position: absolute;
    width: 10%;

    // top: 7%;
    // left: 18%;
    // transform: translate(100%, -50%);
    color: white;
  }
`;

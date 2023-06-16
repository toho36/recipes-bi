import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?name=${input}`);
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

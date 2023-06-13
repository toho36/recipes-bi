import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Menu() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const api = await fetch(
      `https://react-http-98ba6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`
    );
    const data = await api.json();
    console.log(data);
    setList(data);
  };

  return (
    <Grid>
      {list.map((recipe) => {
        const limitedTags = recipe.tags.slice(0, 3); // Extract only the first 3 tags
        const tagsString = limitedTags.join(', '); // Join the limited tags into a string

        return (
          <Card key={recipe.id}>
            <Link to={'/recipe/' + recipe.id}>
              <h4>{recipe.name}</h4>
              <img src={recipe.image} alt={recipe.title} />
            </Link>
            <p>Tags: {tagsString}</p> {/* Output the limited tags */}
            <p>Author: {recipe.author}</p>
          </Card>
        );
      })}
    </Grid>
  );
}

export default Menu;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  p {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

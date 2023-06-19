import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import fireDb from '../firebase';
import styled from 'styled-components';

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get('name');
  console.log('search', search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    fireDb
      .child('recipes')
      .orderByChild('name')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          const recipesArray = Object.values(data);
          console.log('array ' + recipesArray);
          // Filter the recipes based on partial match of the name
          const filteredRecipes = recipesArray.filter((recipe) => {
            return recipe.name.toLowerCase().includes(search.toLowerCase());
          });

          setSearchedRecipes(filteredRecipes);
        } else {
          setSearchedRecipes([]); // Set an empty array if no matching recipes found
        }
      });
  };
  return (
    <Grid>
      {searchedRecipes.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <h4>{item.name}</h4>
              <img src={item.image} alt={item.name} />
              {/* <p>{recipe.tags}</p> */}
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    display: block; /* Ensures the image is treated as a block element */
    margin: 0 auto; /* Sets the left and right margins to 'auto' */
    width: 100%;
    max-width: 40rem;
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

export default Searched;

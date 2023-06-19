import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fireDb from '../firebase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Fragment } from 'react';

function Tag() {
  let params = useParams();
  const selectedTag = params.tag;
  const [searchedTag, setSearchedTag] = useState([]);
  console.log('tag', selectedTag);

  useEffect(() => {
    searchData();
  }, [selectedTag]);

  const searchData = () => {
    fireDb
      .child('recipes')
      .orderByChild('tags')
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          const tagArray = Object.values(data);

          const filteredRecipes = tagArray.filter((recipe) => {
            // Check if the recipe has tags
            if (recipe.tags && Array.isArray(recipe.tags)) {
              // Convert the tags to lowercase for case-insensitive comparison
              const lowercaseTags = recipe.tags.map((tag) => tag.toLowerCase());

              // Check if the selectedTag exists in the lowercaseTags array
              return lowercaseTags.includes(selectedTag.toLowerCase());
            }

            return false;
          });

          setSearchedTag(filteredRecipes);
        } else {
          setSearchedTag([]);
        }
      });
  };
  return (
    <Grid>
      {searchedTag.map((item) => {
        const limitedTag = item.tags?.slice(0, 3) || []; // Check if tag exist and slice the array
        // const tagString = limitedTag.join(', '); // Join the limited tag into a string
        console.log(item);
        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <h4>{item.name}</h4>
              <img src={item.image} alt={item.name} />
            </Link>
            <p>
              Tags:{' '}
              {limitedTag.map((tag, index) => (
                <Fragment key={index}>
                  <Link to={'/tag/' + tag}>{tag}</Link>
                  {index !== limitedTag.length - 1 && ', '}
                </Fragment>
              ))}
            </p>
            <Link to={'/author/' + item.author}>
              <p>Author: {item.author}</p>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}
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

export default Tag;

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import fireDb from '../firebase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Author = () => {
  let params = useParams();
  const selectedAuthor = params.author;
  const [searchedAuthor, setSearchedAuthor] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().selectedAuthor);
  };

  let query = useQuery();
  let author = query.get('author');
  console.log('author', selectedAuthor);

  useEffect(() => {
    searchData();
  }, [selectedAuthor]);

  const searchData = () => {
    fireDb
      .child('recipes')
      .orderByChild('author')
      .equalTo(selectedAuthor)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          const authorArray = Object.values(data);
          console.log('array ' + authorArray);
          // Filter the recipes based on partial match of the name
          // const filteredAuthor = authorArray.filter((recipe) => {
          //   return recipe.author.toLowerCase().includes(search.toLowerCase());
          // });

          setSearchedAuthor(authorArray);
        } else {
          setSearchedAuthor([]); // Set an empty array if no matching recipes found
        }
      });
  };
  return (
    <Grid>
      {searchedAuthor.map((item) => {
        const limitedTags = item.tags?.slice(0, 3) || []; // Check if tags exist and slice the array
        const tagsString = limitedTags.join(', '); // Join the limited tags into a string

        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <h4>{item.name}</h4>
              <img src={item.image} alt={item.name} />
              {/* <p>{recipe.tags}</p> */}
            </Link>
            <p>Tags: {tagsString}</p> {/* Output the limited tags */}
            <p>Author: {item.author}</p>
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

export default Author;

import React from 'react';
import { Button } from '@material-ui/core';

const SearchFilters = ({ searchModel, setResults, all }) => {
  const petTypes = ['< 1', '1-3', '3-5', '> 5'];
  const userTypes = ['owner', ''];

  const filterResults = (query) => {
    return all?.filter((result) => {
      if (searchModel === 'pet') {
        return result.type === query;
      } else {
        return result.owner === query;
      }
    });
  };

  const updateResults = (query) => {
    const newResults = filterResults(query);
    setResults(newResults);
  };

  return (
    <div>
      {searchModel === 'pet'
        ? petTypes.map((filter) => (
            <Button
              key={filter}
              style={{ backgroundColor: 'lightblue' }}
              onClick={() => updateResults(filter)}
            >
              {filter}
            </Button>
          ))
        : userTypes.map((filter) => (
            <Button
              key={filter}
              style={{ backgroundColor: 'lightblue' }}
              onClick={() => updateResults(Boolean(filter))}
            >
              {filter ? 'owner' : 'sitter'}
            </Button>
          ))}
    </div>
  );
};

export default SearchFilters;

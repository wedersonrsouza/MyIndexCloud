import axios from 'axios';
import React, { useState } from 'react';

const Search = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const response = await axios.get('http://localhost:9292/_search', {
      params: {
        q: term
      },
      auth: {
        username: 'elastic',
        password: 'elastic'
      }
    });

    setResults(response.data.hits.hits);
  };

   const highlightTerm = (text, term) => {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark style="background-color: yellow;">$1</mark>');
  };



  return (
    <div>
      <input 
        type="text" 
        value={term} 
        onChange={e => setTerm(e.target.value)} 
        placeholder="Digite sua pesquisa aqui..."
      />
      <button onClick={search}>Buscar</button>

      
      {results.map(result => (
        <div key={result._id}>
          <h2>{result._source.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: highlightTerm(result._source.content, term) }} />
          <p><strong>Index:</strong> {result._index}</p>
          <p><strong>ID:</strong> {result._id}</p>
          {/* <p><strong>Score:</strong> {result._score}</p> */}
          {/* <p><strong>Ignored:</strong> {result._ignored.join(', ')}</p> */}
          {/* <p><strong>Path:</strong> {result._source.path.join(', ')}</p> */}
          <p><strong>Duplicados:<br/></strong> <span dangerouslySetInnerHTML={{ __html: result._source.path.join('<br />') }} /></p>

          {/* <p><strong>Path:</strong> {result._source.path.join(', ')}</p> */}

          {/* <p><strong>Metadatas:</strong><p dangerouslySetInnerHTML={{ __html: highlightTerm(JSON.stringify(result._source.metadatas, null, 2), term) }} /></p> */}
              <p><strong>Metadatas:</strong></p>
              <table>
      {Object.entries(result._source.metadatas).map(([key, value]) => {
        if (value) {
            return (
            <tr key={key}>
                <td>{key}</td>
                <td dangerouslySetInnerHTML={{ __html: highlightTerm(String(value), term) }} />
            </tr>
            );
        }
        return null;
        })}
        </table>
           
        </div>
      ))}
    </div>
  );
};

export default Search;

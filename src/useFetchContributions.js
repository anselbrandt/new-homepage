import { useEffect, useState } from "react";

const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

export default function useFetch(query, variables) {
  const [results, setResults] = useState();

  const baseURL = `https://api.github.com/graphql`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  };

  useEffect(() => {
    if (query) {
      fetch(baseURL, options)
        .then((response) => response.json())
        .then((response) => {
          setResults(response);
        });
    }
  }, [query, variables, baseURL, options]);

  return { results };
}

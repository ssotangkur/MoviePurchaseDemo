import axios from "axios";
import { useEffect, useState, useRef } from "react";

const BASE_URL = `https://www.omdbapi.com/?`;
const API_KEY = "d242574e";
const API_KEY_PARAM = `apikey=${API_KEY}`;

// HTTP Params and their values
type paramVal = [string, string];

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
};

export type SearchResult = {
  Search: Movie[];
  totalResults: string;
  Response: string;
};

const paramBuilder = (kv: paramVal) => `${kv[0]}=${kv[1]}`;

const urlBuilder = (paramVals: paramVal[]) => {
  const urlParts = [BASE_URL + API_KEY_PARAM];
  const params = paramVals.map(paramBuilder);
  urlParts.push(...params);
  const rawURI = urlParts.join("&");
  return encodeURI(rawURI);
};

export const search = (query: string) => {
  const searchUrl = urlBuilder([["s", query]]);
  return axios.get(searchUrl);
};

export const useSearch = (
  query: string
): [boolean, SearchResult | undefined] => {
  const [searchResults, setSearchResults] = useState<any>();
  const inFlightQuery = useRef(query);
  useEffect(() => {
    let isMounted = true;
    inFlightQuery.current = query;
    search(query)
      .then(response => {
        if (isMounted && inFlightQuery.current === query) {
          setSearchResults(response.data);
        }
      })
      .catch(err => console.log(err));
    return () => {
      isMounted = false;
    };
  }, [query]);
  const loading = !searchResults;
  const retResults: SearchResult | undefined = searchResults;
  return [loading, retResults];
};

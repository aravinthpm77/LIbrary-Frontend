import "./SearchResultsList.css";
import  SearchResults  from "./SearchResults";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResults result={result.Name} key={id} />;
      })}
    </div>
  );
};
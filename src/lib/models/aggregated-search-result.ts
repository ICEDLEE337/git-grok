import RepoSearchResult from "./repo-search-result";
import SearchOptions from "./search-options";

export default interface AggregatedSearchResult {
    repoSearchResults: Array<RepoSearchResult>;
    elapsed: string;
    searchOptions?: SearchOptions;
}
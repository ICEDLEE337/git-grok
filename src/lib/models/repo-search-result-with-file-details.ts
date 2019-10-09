import RepoSearchResult from "./repo-search-result";
import FileSearchResult from "./file-search-result";

export default interface RepoSearchResultWithFileDetails extends RepoSearchResult {
    matchesRefined: Array<FileSearchResult>;
    fileList: Array<string>;
}
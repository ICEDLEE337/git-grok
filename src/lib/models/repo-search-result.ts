import FileSearchResult from "./file-search-result";

export default interface RepoSearchResult {
    fileList: Array<string>;
    lineCount: number;
    matches: {[key: string]: FileSearchResult};
    path:  string;
    repo: string;
}
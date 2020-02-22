import FileSearchResult from "./file-search-result";

export default interface RepoSearchResult {
    fileList: Array<string>;
    lineCount: number;
    matches: Array<FileSearchResult>;
    path:  string;
    repo: string;
}
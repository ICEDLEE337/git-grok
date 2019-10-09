export default interface RepoSearchResult {
    repo: string;
    matches: string;
    path?: string;
    ref?: string;
}
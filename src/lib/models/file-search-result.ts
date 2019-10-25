export default interface FileSearchResult {
    name: string;
    path?: string;
    ref?: string;
    matchingLines: Array<string>,
    url: string;
}
import { ParsedPath } from "path";

export default interface FileSearchResult extends ParsedPath{
    path: string;
    lines: Array<string>,
}
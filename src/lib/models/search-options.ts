import RepoRefMap from "./repo-ref-map";

export default interface SearchOptions {
    term: string;
    lines?: number;
    case?: boolean;
    word?: boolean;
    path?: string;
    kebab?: boolean;
    repos?: Array<string>;
    repoRefMap?: Array<RepoRefMap>;
}
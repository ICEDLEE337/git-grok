export interface Links {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
}

export interface Namespace {
    id: number;
    name: string;
    path: string;
    kind: string;
    full_path: string;
    parent_id?: any;
}

export interface Permissions {
    project_access?: any;
    group_access?: any;
}

export default interface SourceRepoConfig {
    id: number|string;
    description?: string;
    default_branch: string;
    http_url_to_repo: string;
    ssh_url_to_repo?: string;
    web_url?: string;
    name?: string;
    name_with_namespace?: string;
}

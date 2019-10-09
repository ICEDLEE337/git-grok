import SourceRepoConfig from "./source-repo-config";

export default interface EnhancedRepoConfig extends SourceRepoConfig {
    ui?: boolean;
    fullyQualifiedName: string;
    manifest?: string;
    appname?: string;
}
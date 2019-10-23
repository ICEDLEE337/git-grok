
import _ from 'lodash';
import RepoSearchResultWithFileDetails from './models/repo-search-result-with-file-details';
import FileSearchResult from './models/file-search-result';
import RepoSearchResult from './models/repo-search-result';
// import FileSearchResult from './models/file-search-result';

export default class ResultTransformer {

    static transformEventually(repoSearchResult: RepoSearchResult): RepoSearchResultWithFileDetails {
        const fileSearchResults: any = _((repoSearchResult.matches || '').split('\n'))
            .filter(_.partialRight(_.includes, ':'))
            // .map(line => line && console.log(line) || line)
            .groupBy((line: string) => line.split(':')[0])
            // .map(groups => console.log(JSON.stringify(groups, null, 2)))
            .value();

        return fileSearchResults;
    }

    static transformNoop(result: any): any {
        return _.identity(result);
    }

    static transform(matches: string, repo: string): RepoSearchResultWithFileDetails {
        return this.transformInternal({matches, repo});
    }

    static transformInternal(result: RepoSearchResult): RepoSearchResultWithFileDetails {
        const matchesRefined = _(result.matches.split('\n\n')).map(this.splitFileChunk).value();
        const transformed: RepoSearchResultWithFileDetails = _.assign({}, result,
            {
                matchesRefined,
                fileList: _.map(matchesRefined, 'name')
            });
        return transformed;
    }

    private static splitFileChunk(text: string): FileSearchResult {
        const lines = text.split('\n');
        return { name: lines[0], matchingLines: lines.slice(1).filter(_.identity) } as FileSearchResult;
    }

}


import _ from 'lodash';
import RepoSearchResultWithFileDetails from './models/repo-search-result-with-file-details';
import FileSearchResult from './models/file-search-result';
import RepoSearchResult from './models/repo-search-result';

export default class ResultTransformer {

    static transform(matches: string, repo: string): RepoSearchResultWithFileDetails {
        const output = this.transformInternal({matches, repo});
        return output;
    }

    private static transformInternal(result: RepoSearchResult): RepoSearchResultWithFileDetails {
        const matchesRefined = _(result.matches.split('\n\n')).map(this.splitFileChunk)
        .map(r => {
            r.url = result.repo;
            return r;
        })
        .map(r => {
            r.path = result.repo.replace('https://', '').replace('.git', '') + '/' + r.name;
            return r;
        })
        .value();
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

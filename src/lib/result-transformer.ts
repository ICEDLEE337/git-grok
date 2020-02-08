
import _ from 'lodash';
import RepoSearchResultWithFileDetails from './models/repo-search-result-with-file-details';
import FileSearchResult from './models/file-search-result';
import RepoSearchResult from './models/repo-search-result';
import { writeFile } from 'fs';

export default class ResultTransformer {

    static transform(matches: string, repo: string): RepoSearchResultWithFileDetails {
        writeFile('./input', matches + '\n\n\n\n\n\n\n\n' + repo, 'utf8', () => {})
        const output = this.transformInternal({matches, repo});
        writeFile('./output', JSON.stringify(output, null, 2), 'utf8', () => {})

        return output;
    }

    private static transformInternal(result: RepoSearchResult): RepoSearchResultWithFileDetails {
        const matchesRefined = _(result.matches.split('\n\n')).map(this.splitFileChunk)
        .map(r => {
            r.url = result.repo;
            return r;
        }).value();
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

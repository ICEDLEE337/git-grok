
import _ from 'lodash';
import RepoSearchResultWithFileDetails from './models/repo-search-result-with-file-details';
import FileSearchResult from './models/file-search-result';
import RepoSearchResult from './models/repo-search-result';
import ResultTransformer from './result-transformer';

describe('ResultTransformer', () => {
    describe('transform', () => {
        let matches: string;
        let repo: string;
        let expected: RepoSearchResultWithFileDetails;
        it('transforms', () => {
            expect(ResultTransformer.transform(matches, repo)).toEqual('something');

        });
    });
});

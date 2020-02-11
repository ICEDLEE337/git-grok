
import _ from 'lodash';
import ResultTransformer from './result-transformer';
import FileSearchResult from './models/file-search-result';

const url = "https://github.com/angular/components.git";

const repo = url;

const fileNameOne = 'fileNameOne';
const fileNameTwo = 'fileNameTwo';

const lineOne = '111: one';
const lineTwo = '22: two';

describe('ResultTransformer', () => {

    describe('transform', () => {
        it('captures the files containing matches', () => {
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ fileList: [fileNameOne, fileNameTwo] }));
        });

        it('captures the repo', () => {
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ repo }));
        });

        it('captures the matching lines for each matching file', () => {
            const dir = 'github.com/angular/components';
            const matchesRefined: FileSearchResult[] = [
                { "matchingLines": ["111: one"], "name": "fileNameOne", url, path: `${dir}/fileNameOne`},
                { "matchingLines": ["22: two"], "name": "fileNameTwo", url, path: `${dir}/fileNameTwo`}
            ];
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ matchesRefined }));
        });

        it('captures the raw std out', () => {
            const matches = getMockMatches();
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ matches }));
        });
    });
});

function getMockMatches() {
    return `${fileNameOne}
${lineOne}

${fileNameTwo}
${lineTwo}`;
}


import _ from 'lodash';
import RepoSearchResult from './models/repo-search-result';
import FileSearchResult from './models/file-search-result';
import { parse } from 'path';
export default class ResultTransformer {

    static transform(matches: string, repo: string): RepoSearchResult {
        const result: RepoSearchResult = {
            repo,
            path: repo.replace('https://', '').replace('.git', ''),
            matches: [],
            fileList: [],
            lineCount: 0
        };

        result.matches = matches.split('\n\n')
        .map(this.splitFileChunk)
        .map(f => {
            result.lineCount += f.lines.length;
            f.path = result.path + '/' + f.name;
            Object.assign(f, parse(f.path));
            return f;
        });

        result.fileList = _.map(result.matches, 'name');

        return result;
    }

    private static splitFileChunk(text: string): FileSearchResult {
        const lines = text.split('\n');
        return { name: lines[0], lines: lines.slice(1).filter(_.identity) } as FileSearchResult;
    }

}

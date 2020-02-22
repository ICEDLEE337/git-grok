import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const fakeResult = {
    repo: 'https://github.com/nrwl/nx.git',
    path: 'github.com/nrwl/nx',
    matches: {
        'github.com/nrwl/nx/.yarn/releases/yarn-1.19.0.js': {
            name: 'yarn-1.19.0',
            lines: ['Array'],
            path: 'github.com/nrwl/nx/.yarn/releases/yarn-1.19.0.js',
            root: '',
            dir: 'github.com/nrwl/nx/.yarn/releases',
            base: 'yarn-1.19.0.js',
            ext: '.js'
        }
    },
    fileList: ['github.com/nrwl/nx/.yarn/releases/yarn-1.19.0.js'],
    lineCount: 1
};

const searchResultSubject = new BehaviorSubject(fakeResult);
const searchResultStore = searchResultSubject
    .asObservable()
    .pipe(d => tap(console.log(d)))
    .subscribe();
searchResultStore.update = (r) => searchResultSubject.next(r);
export default searchResultStore;

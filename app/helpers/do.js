import { helper } from '@ember/component/helper';

export default helper( ( [ fn, ...input ] ) => fn( ...input ) );

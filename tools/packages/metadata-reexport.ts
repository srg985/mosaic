import { writeFileSync } from 'fs';
import { join } from 'path';


/** Creates a metadata file that re-exports the metadata bundle inside of the typings. */
/* tslint:disable-next-line:no-reserved-keywords */
export function createMetadataReexportFile(destDir: string, from: string | string[],
                                           entryPointName: string, importAsName: string) {
    from = Array.isArray(from) ? from : [from];

    const metadataJsonContent = JSON.stringify({
        __symbolic: 'module',
        version: 3,
        metadata: {},
        exports: from.map(f => ({from: f})),
        flatModuleIndexRedirect: true,
        importAs: importAsName
        /* tslint:disable-next-line:no-magic-numbers */
    }, null, 2);

    writeFileSync(join(destDir, `${entryPointName}.metadata.json`), metadataJsonContent, 'utf-8');
}


import { NgModule } from '@angular/core';
import { McCommonModule } from '@ptsecurity/mosaic/core';

import { McBadge} from './badge.component';


@NgModule({
    imports: [ McCommonModule ],
    exports: [ McBadge ],
    declarations: [McBadge ]
})
export class McBadgeModule {}

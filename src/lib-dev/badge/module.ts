import {Component, NgModule, ViewEncapsulation} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {ThemePalette} from '@ptsecurity/mosaic/core';

import {McBadgeModule} from '../../lib/badge';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@Component({
    selector: 'app',
    styleUrls: ['./styles.scss'],
    encapsulation: ViewEncapsulation.None,
    template: require('./template.html')
})
class BadgeDemoComponent {
    badgeColor: ThemePalette;
    badgeContent = '55';
    badgeDirection = 'above after';
    badgeHidden = false;
    badgeSize = 'medium';
    badgeOverlap = false;
}

@NgModule({
    declarations: [
        BadgeDemoComponent
    ],
    imports: [
        BrowserModule,
        McBadgeModule,
        BrowserAnimationsModule
    ],
    bootstrap: [
        BadgeDemoComponent
    ]
})
export class BadgeDemoModule {}

platformBrowserDynamic()
    .bootstrapModule(BadgeDemoModule)
    .catch((error) => console.error(error));


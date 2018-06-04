import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThemePalette } from '@ptsecurity/mosaic/core';

import { McBadge, McBadgeModule } from './index';


describe('McBadge', () => {

    let fixture: ComponentFixture<any>;
    let testComponent: BadgeTestApp;
    let badgeNativeElement: HTMLElement;
    let badgeDebugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [McBadgeModule],
            declarations: [BadgeTestApp]
        }).compileComponents();

        fixture = TestBed.createComponent(BadgeTestApp);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        badgeDebugElement = fixture.debugElement.query(By.directive(McBadge));
        badgeNativeElement = badgeDebugElement.nativeElement;
    }));
});

/** Test component that contains a McBadge. */
@Component({
    template: `
    <span [mcBadge]="badgeContent"
          [mcBadgeColor]="badgeColor"
          [mcBadgePosition]="badgeDirection"
          [mcBadgeHidden]="badgeHidden"
          [mcBadgeSize]="badgeSize"
          [mcBadgeOverlap]="badgeOverlap"
          [mcBadgeDescription]="badgeDescription">
      home
    </span>
  `
})
class BadgeTestApp {
    badgeColor: ThemePalette;
    badgeContent = '1';
    badgeDirection = 'above after';
    badgeHidden = false;
    badgeSize = 'medium';
    badgeOverlap = false;
    badgeDescription: string;
}

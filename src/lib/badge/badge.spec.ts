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

    it('should update the badge based on attribute', () => {
        let badgeContentDebugElement = badgeNativeElement.querySelector('.mc-badge-content')!;

        expect(badgeContentDebugElement.textContent).toContain('1');

        testComponent.badgeContent = '22';
        fixture.detectChanges();

        badgeContentDebugElement = badgeNativeElement.querySelector('.mc-badge-content')!;
        expect(badgeContentDebugElement.textContent).toContain('22');
    });

    it('should apply class based on color attribute', () => {
        testComponent.badgeColor = 'primary';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mc-badge-primary')).toBe(true);

        testComponent.badgeColor = 'second';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mc-badge-second')).toBe(true);

        testComponent.badgeColor = 'warn';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mc-badge-warn')).toBe(true);

        testComponent.badgeColor = undefined;
        fixture.detectChanges();

        expect(badgeNativeElement.classList).not.toContain('mc-badge-second');
    });

    it('should update the badge position on direction change', () => {
        expect(badgeNativeElement.classList.contains('mc-badge-above')).toBe(true);
        expect(badgeNativeElement.classList.contains('mc-badge-after')).toBe(true);

        testComponent.badgeDirection = 'below before';
        fixture.detectChanges();

        expect(badgeNativeElement.classList.contains('mc-badge-below')).toBe(true);
        expect(badgeNativeElement.classList.contains('mc-badge-before')).toBe(true);
    });

    it('should change visibility to hidden', () => {
        expect(badgeNativeElement.classList.contains('mc-badge-hidden')).toBe(false);

        testComponent.badgeHidden = true;
        fixture.detectChanges();

        expect(badgeNativeElement.classList.contains('mc-badge-hidden')).toBe(true);
    });

    it('should change badge sizes', () => {
        expect(badgeNativeElement.classList.contains('mc-badge-medium')).toBe(true);

        testComponent.badgeSize = 'small';
        fixture.detectChanges();

        expect(badgeNativeElement.classList.contains('mc-badge-small')).toBe(true);

        testComponent.badgeSize = 'large';
        fixture.detectChanges();

        expect(badgeNativeElement.classList.contains('mc-badge-large')).toBe(true);
    });

    it('should change badge overlap', () => {
        expect(badgeNativeElement.classList.contains('mc-badge-overlap')).toBe(false);

        testComponent.badgeOverlap = true;
        fixture.detectChanges();

        expect(badgeNativeElement.classList.contains('mc-badge-overlap')).toBe(true);
    });
});

/** Test component that contains a McBadge. */
@Component({
    template: `
    <span [mcBadge]="badgeContent"
          [mcBadgeColor]="badgeColor"
          [mcBadgePosition]="badgeDirection"
          [mcBadgeHidden]="badgeHidden"
          [mcBadgeSize]="badgeSize"
          [mcBadgeOverlap]="badgeOverlap">
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

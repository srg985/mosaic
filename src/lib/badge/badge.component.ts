import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, NgZone, Optional } from '@angular/core';
import { ThemePalette, toBoolean } from '@ptsecurity/mosaic/core';


let nextId = 0;

export type McBadgePosition = 'above after' | 'above before' | 'below before' | 'below after';
export type McBadgeSize = 'small' | 'medium' | 'large';


@Directive({
    selector: '[mcBadge]',
    host: {
        /* tslint:disable-next-line:object-literal-key-quotes */
        'class': 'mc-badge',
        '[class.mc-badge-overlap]': 'overlap',
        '[class.mc-badge-above]': 'isAbove()',
        '[class.mc-badge-below]': '!isAbove()',
        '[class.mc-badge-before]': '!isAfter()',
        '[class.mc-badge-after]': 'isAfter()',
        '[class.mc-badge-small]': 'size === "small"',
        '[class.mc-badge-medium]': 'size === "medium"',
        '[class.mc-badge-large]': 'size === "large"',
        '[class.mc-badge-hidden]': 'hidden'
    }
})
export class McBadge {

    /** Size of the badge. Can be 'small', 'medium', or 'large'. */
    @Input('mcBadgeSize') size: McBadgeSize = 'medium';

    /** The color of the badge. Can be `primary`, `second`, or `warn`. */
    @Input('mcBadgeColor')
    get color(): ThemePalette {
        return this._color;
    }

    set color(value: ThemePalette) {
        this._setColor(value);
        this._color = value;
    }

    private _color: ThemePalette = ThemePalette.Primary;

    /** Whether the badge should overlap its contents or not */
    @Input('mcBadgeOverlap')
    get overlap(): boolean {
        return this._overlap;
    }

    set overlap(val: boolean) {
        this._overlap = toBoolean(val);
    }

    private _overlap: boolean = true;

    /**
     * Position the badge should reside.
     * Accepts any combination of 'above'|'below' and 'before'|'after'
     */
    /* tslint:disable-next-line:member-ordering */
    @Input('mcBadgePosition') position: McBadgePosition = 'above after';

    /** The content for the badge */
    @Input('mcBadge')
    get content(): string {
        return this._content;
    }

    set content(val: string) {
        this._content = val;
        this._updateTextContent();
    }

    private _content: string;

    /** Whether the badge is hidden. */
    @Input('mcBadgeHidden')
    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(val: boolean) {
        this._hidden = toBoolean(val);
    }

    private _hidden: boolean;


    /** Unique id for the badge */
    _id: number = nextId++;

    private _badgeElement: HTMLElement;

    constructor(
        @Optional() @Inject(DOCUMENT) private _document: any,
        private _ngZone: NgZone,
        private _elementRef: ElementRef) {
    }

    /** Whether the badge is above the host or not */
    isAbove(): boolean {
        return this.position.indexOf('below') === -1;
    }

    /** Whether the badge is after the host or not */
    isAfter(): boolean {
        return this.position.indexOf('before') === -1;
    }

    /** Injects a span element into the DOM with the content. */
    private _updateTextContent(): HTMLSpanElement {
        if (!this._badgeElement) {
            this._badgeElement = this._createBadgeElement();
        } else {
            this._badgeElement.textContent = this.content;
        }

        return this._badgeElement;
    }

    /** Creates the badge element */
    private _createBadgeElement(): HTMLElement {
        const badgeElement = this._document.createElement('span');
        const activeClass = 'mc-badge-active';

        badgeElement.setAttribute('id', `mc-badge-content-${this._id}`);
        badgeElement.classList.add('mc-badge-content');
        badgeElement.textContent = this.content;

        this._elementRef.nativeElement.appendChild(badgeElement);

        // animate in after insertion
        if (typeof requestAnimationFrame === 'function') {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => {
                    badgeElement.classList.add(activeClass);
                });
            });
        } else {
            badgeElement.classList.add(activeClass);
        }

        return badgeElement;
    }

    /** Adds css theme class given the color to the component host */
    private _setColor(colorPalette: ThemePalette) {
        if (colorPalette !== this._color) {
            if (this._color) {
                this._elementRef.nativeElement.classList.remove(`mc-badge-${this._color}`);
            }
            if (colorPalette) {
                this._elementRef.nativeElement.classList.add(`mc-badge-${colorPalette}`);
            }
        }
    }

}

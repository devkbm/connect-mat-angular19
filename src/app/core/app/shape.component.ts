import { ChangeDetectionStrategy, Component, input, TemplateRef, inject, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shape',
  imports: [
    CommonModule
  ],
  template: `
    @if (header() || headerString()) {
      <div class="header" [ngStyle]="{'height': headerHeight()}">
        {{headerString()}}
        <ng-container [ngTemplateOutlet]="header()"></ng-container>
      </div>
    }

    @if (search()) {
      <div [ngStyle]="{'height': searchHeight()}">
        <ng-container [ngTemplateOutlet]="search()"></ng-container>
      </div>
    }

    <div class="body">
      <ng-content></ng-content>
    </div>

    @if (footer()) {
      <div class="footer" [ngStyle]="{'height': footerHeight()}">
        <ng-container [ngTemplateOutlet]="footer()"></ng-container>
      </div>
    }
  `,
  styles: `
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .header {
      background-color: red;
    }

    .search {
      background-color: yellow;
    }

    .body {
      flex: 1;
      background-color: blue;
    }

    .footer {
      height: 50px;
      background-color: green;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShapeComponent implements AfterViewInit {

  header = input<TemplateRef<{}> | null>(null);
  headerString = input();
  headerHeight = input('50px');

  search = input<TemplateRef<{}> | null>(null);
  searchHeight = input('50px');

  footer = input<TemplateRef<{}> | null>(null);
  footerHeight = input('50px');

  private hostElement = inject(ElementRef);

  constructor() {}

  ngAfterViewInit(): void {   
    console.log(this.hostElement.nativeElement.offsetHeight);
  }
}

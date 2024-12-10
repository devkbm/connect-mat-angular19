import { ChangeDetectionStrategy, Component, input, TemplateRef, inject, ElementRef, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shape',
  imports: [
    CommonModule
  ],
  template: `
    @if (header().template) {
      <div class="header" [ngStyle]="{'height': header().height}">
        <ng-container [ngTemplateOutlet]="header().template"></ng-container>
      </div>
    }

    @if (search().template) {
      <div [ngStyle]="{'height': search().height}">
        <ng-container [ngTemplateOutlet]="search().template"></ng-container>
      </div>
    }
    <!-- [ngStyle]="{ 'height': 'calc(50% - ' + headerHeight() + 'px)' }"-->
    <div class="body" >
      <ng-content></ng-content>
    </div>

    @if (footer().template) {
      <div class="footer" [ngStyle]="{'height': footer().height}">
        <ng-container [ngTemplateOutlet]="footer().template"></ng-container>
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      //background-color: red;
    }

    .search {
      //background-color: yellow;
    }

    .body {
      flex: 1;
      //background-color: blue;
    }

    .footer {
      //background-color: green;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShapeComponent implements AfterViewInit {

  header = input<{template: TemplateRef<{}> | null, height: string | null}>({
    template: null, height: '0px'
  });

  search = input<{template: TemplateRef<{}> | null, height: string | null}>({
    template: null, height: '0px'
  });

  footer = input<{template: TemplateRef<{}> | null, height: string | null}>({
    template: null, height: '0px'
  });

  //private hostElement = inject(ElementRef);

  constructor() {}

  ngAfterViewInit(): void {
    //console.log(this.hostElement.nativeElement);
    //console.log(this.hostElement.nativeElement.offsetHeight);
  }
}

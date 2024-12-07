import { ChangeDetectionStrategy, Component, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { StringTemplateOutletDirective } from './string_template_outlet.directive';

@Component({
  selector: 'mat-drawer-custom',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatIcon,
    StringTemplateOutletDirective
  ],
  template: `
    <mat-drawer-container class="container" hasBackdrop="true">
      <mat-drawer #drawer
        mode="over"
        position="end"
        [style.width]="width()"
      >
        <mat-drawer-content class="inner-container">
          <div class="header">
            <mat-icon class="close" (click)="drawer.close()">close</mat-icon> {{title()}}
          </div>

          <div class="body">
            <ng-content select="[drawerContent]"></ng-content>
          </div>

          @if (nzFooter()) {
            <div class="footer">
              <ng-container *stringTemplateOutlet="nzFooter()">{{ nzFooter() }}</ng-container>
            </div>
          }
        </mat-drawer-content>

      </mat-drawer>

      <!-- MAIN CONTENT -->
      <mat-drawer-content>
        <ng-content></ng-content>
      </mat-drawer-content>

    </mat-drawer-container>
  `,
  styles: `
    .container {
      height: calc(100vh - 64px);
    }

    .inner-container {
      background-color: skyblue;
      display: flex;
      flex-direction: column;
    }

    .header {
      //background-color: red;
    }

    .body {
      flex: 1;
      //background-color: blue;
    }

    .footer {
      //background-color: green;
    }

    .mat-drawer-inner-container {
      display: flex;
      flex-direction: column;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatDrawerCustomComponent {
  width = input('50%');
  title = input('');

  drawer = viewChild.required(MatDrawerContainer);

  nzFooter = input<string | TemplateRef<{}> | null>();

  constructor() {
  }

  open() {
    this.drawer().open();
  }

  close() {
    this.drawer().close();
  }

}

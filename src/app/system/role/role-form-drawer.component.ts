import { Component, input, TemplateRef, viewChild } from '@angular/core';

import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';

import { NzStringTemplateOutletDirective } from 'src/app/core/outlet/string_template_outlet.directive';

@Component({
  selector: 'app-role-form-drawer',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatIcon,
    NzStringTemplateOutletDirective
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
              <ng-container *nzStringTemplateOutlet="nzFooter()">{{ nzFooter() }}</ng-container>
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
  `
})
export class RoleFormDrawerComponent {
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

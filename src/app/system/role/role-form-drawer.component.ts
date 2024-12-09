
import { Component, effect, input, model, TemplateRef, viewChild } from '@angular/core';

import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';

import { RoleFormComponent } from './role-form.component';

@Component({
  selector: 'app-role-form-drawer',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatIcon,
    RoleFormComponent,
  ],
  template: `
    <!-- 100vh - 메인헤더 높이 - 제외높이  -->
    <!-- [style.height]="'calc(100vh - var(--main-header-height) - 100px)'" -->
    <mat-drawer-container class="container" hasBackdrop="true" [style.height]="'calc(100vh - var(--main-header-height) - ' + excludingHeight() +')'">
      <mat-drawer #drawer
        mode="over"
        position="end"
        [style.width]="width()"
        (openedChange)="visible.set($event)"
      >
        <mat-drawer-content class="inner-container">
          <div class="header">
            <mat-icon (click)="this.visible.set(false)">close</mat-icon>
            타이틀 {{initLoadId()}}
          </div>

          <div class="body">
            <app-role-form></app-role-form>
          </div>

          <div class="footer">
              Footer
          </div>
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
      //height: calc(100vh - var(--main-header-height) - 40px);
      background-color: yellow;
    }

    .inner-container {
      background-color: skyblue;
      display: flex;
      flex-direction: column;
    }

    .header {
      //background-color: red;
      height: 48px;
    }

    .body {
      flex: 1;
      --background-color: blue;
    }

    .footer {
      //background-color: green;
      height: 48px;
    }

  `
})
export class RoleFormDrawerComponent {
  width = input('50%');
  title = input('');
  initLoadId = input('');

  excludingHeight = input('0px');

  visible = model(false);

  drawer = viewChild.required(MatDrawerContainer);
  form = viewChild.required(RoleFormComponent);

  constructor() {
    effect(() => {
      if (this.visible()) {
        this.open();
        this.form().get(this.initLoadId());
      } else {
        this.close();
      }
    })
  }

  open() {
    this.drawer().open();
  }

  close() {
    this.drawer().close();
  }

}

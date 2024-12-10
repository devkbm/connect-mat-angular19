
import { Component, computed, effect, input, model, viewChild } from '@angular/core';

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
    <mat-drawer-container hasBackdrop="true" [style.height]="containerHeight()">
      <!-- MAIN CONTENT -->
      <mat-drawer-content>
        <ng-content></ng-content>
      </mat-drawer-content>

      <!-- DRAWER CONTENT -->
      <mat-drawer
        mode="over"
        position="end"
        [style.width]="width()"
        (openedChange)="visible.set($event)"
      >
        <mat-drawer-content class="drawer-container">
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
    </mat-drawer-container>
  `,
  styles: `
    .drawer-container {
      background-color: skyblue;
      display: flex;
      flex-direction: column;
    }

    .header {
      height: 48px;
    }

    .body {
      flex: 1;
      //background-color: blue;
    }

    .footer {
      height: 48px;
    }
  `
})
export class RoleFormDrawerComponent {

  visible = model(false);
  width = input('60%');
  title = input('');

  excludingHeight = input('0px');
  containerHeight = computed(() => {
    return 'calc(100vh - var(--main-header-height) - ' + this.excludingHeight() +')';
  });

  drawer = viewChild.required(MatDrawerContainer);
  form = viewChild.required(RoleFormComponent);

  initLoadId = input('');

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


import { Component, computed, effect, input, model, output, viewChild } from '@angular/core';

import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RoleFormComponent } from './role-form.component';


@Component({
  selector: 'app-role-form-drawer',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatIcon,
    MatButtonModule,
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
            타이틀 {{formLoadId()}}
          </div>

          <div class="body">
            <app-role-form
              (formSaved)="formChanged()"
              (formDeleted)="formChanged()">
            </app-role-form>
          </div>

          <div class="footer">
            <button mat-raised-button (click)="save()"><mat-icon>save</mat-icon>저장</button>
            <button mat-raised-button (click)="delete()"><mat-icon>delete</mat-icon>삭제</button>
            <button mat-raised-button (click)="close()"><mat-icon>close</mat-icon>닫기</button>
          </div>
        </mat-drawer-content>
      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: `
    @use "@angular/material" as mat;
    @include mat.core();

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
      text-align: right;
    }

    .mat-mdc-raised-button.color-button {
      background-color: green;
      color: purple;
      border: 1px solid orange;
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

  formLoadId = input('');

  drawerClosed = output<boolean>();

  constructor() {
    effect(() => {
      if (this.visible()) {
        this.open();
        this.form().get(this.formLoadId());
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

  save() {
    this.form().save();
  }

  delete() {
    this.form().remove();
  }

  formChanged() {
    this.drawerClosed.emit(true);
    this.close();
  }

}

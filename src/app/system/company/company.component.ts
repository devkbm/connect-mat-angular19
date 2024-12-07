import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { DrawerContentComponent } from "./drawer-content.component";
import { MatDrawerCustomComponent } from "./mat-drawer-custom.component";

@Component({
  selector: 'app-company',
  imports: [
    CommonModule,
    DrawerContentComponent,
    MatDrawerCustomComponent
],
  template: `

  <app-mat-drawer-custom title="asf" [nzFooter]="footerTpl">
    <app-drawer-content></app-drawer-content>

    <ng-container drawer>
      <h1>
        Body Template
      </h1>
      asfasf
    </ng-container>
    <!--<app-drawer-content ></app-drawer-content>    -->
  </app-mat-drawer-custom>

  <ng-template #footerTpl>
    Footer Template
  </ng-template>



  <!--
    <mat-drawer-container
      [class.drawer-opened]="drawer.opened"
      hasBackdrop="true"
      class="example-container">

      <mat-drawer #drawer mode="over">
        <mat-toolbar class="header">
          <div>Logo</div>
          <mat-icon class="close" (click)="drawer.close()">close</mat-icon>
        </mat-toolbar>

        <div class="contents">
          Drawer
          <app-drawer-content></app-drawer-content>
        </div>
      </mat-drawer>

      <mat-toolbar class="main header">
        <mat-icon
          *ngIf="!drawer.opened"
          (click)="drawer.toggle()">
          menu
        </mat-icon>
        <div>Header</div>
      </mat-toolbar>

      <div class="main contents">
        drawer opened: {{drawer.opened}}
        <div>Contents xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxx xxxxxxx xxxxxx xxxxxx</div>
        <div style="height: 1000px">&nbsp;</div>
      </div>


    </mat-drawer-container>
-->
  `,
  styles: `
/*
.drawer {
  position: fixed;
  height: 100vh;
  min-width: 25%;
  border-right: 1px solid #ccc;
}

.drawer .header {
  position: absolute;
  right: 0;
  justify-content: space-between;
}
.drawer .contents {
  padding: 16px;
}

.main {
  background-color: #fff;
}

.main.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  border-bottom: 1px solid #ccc;
}

.main.contents {
  min-height: 100vh;
  margin-top: 64px;
  padding: 16px;
}
*/
.main.footer {
  position: fixed;
  border-top: 1px solid #ccc;
  bottom: 0;
  width: 100%;
}


  `
})
export class CompanyComponent {

}

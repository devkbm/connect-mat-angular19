import { Component, viewChild } from '@angular/core';
import { RoleFormDrawerComponent } from './role-form-drawer.component';
import { RoleGridComponent } from "./role-grid.component";
import { Role } from './role.model';
import { ShapeComponent } from "../../core/app/shape.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-role',
  imports: [
    MatIcon,
    MatButtonModule,
    RoleFormDrawerComponent,
    RoleGridComponent,
    ShapeComponent
],
  template: `
    <!--{{drawer.role.initLoadId}}-->
    <ng-template #header>
      Title + {{drawer.role.initLoadId}}
    </ng-template>

    <ng-template #search>
      <button mat-raised-button (click)="newItem()"><mat-icon>save</mat-icon>신규</button>
    </ng-template>

    <app-role-form-drawer [(visible)]="drawer.role.visible" [formLoadId]="drawer.role.initLoadId" (drawerClosed)="loadGrid()">
      <app-shape [header]="{template: header, height: '40px'}" [search]="{template: search, height: '40px'}">
        <div class="container">
          <div style="height:20px">
            목록
          </div>
          <div style="flex: 1">
            <app-role-grid
              (editButtonClicked)="drawer.role.visible = true"
              (rowDoubleClicked)="drawer.role.visible = true"
              (rowClicked)="selectedItem($event)"
            />
          </div>
        </div>
      </app-shape>
    </app-role-form-drawer>
  `,
  styles: `
   .container {
      display: flex;
      flex-direction: column;
      height: 100%;
   }
  `
})
export class RoleComponent {

  drawer: {
    role: { visible: boolean, initLoadId: any }
  } = {
    role: { visible: false, initLoadId: '' }
  }

  grid = viewChild.required(RoleGridComponent);

  selectedItem(data: Role) {
    if (data) {
      this.drawer.role.initLoadId = data.roleCode;
    } else {
      this.drawer.role.initLoadId = null;
    }
  }

  loadGrid() {
    this.grid().getList();
  }

  newItem() {
    this.drawer.role.initLoadId = null;
    this.drawer.role.visible = true;
  }
}

import { Component } from '@angular/core';
import { RoleFormDrawerComponent } from './role-form-drawer.component';
import { RoleGridComponent } from "./role-grid.component";
import { Role } from './role.model';

@Component({
  selector: 'app-role',
  imports: [
    RoleFormDrawerComponent,
    RoleGridComponent
  ],
  template: `
    {{drawer.role.initLoadId}}
    <app-role-form-drawer [(visible)]="drawer.role.visible" [initLoadId]="drawer.role.initLoadId" >

      <div style="height: 500px">
        <app-role-grid
          (editButtonClicked)="drawer.role.visible = true"
          (rowDoubleClicked)="drawer.role.visible = true"
          (rowClicked)="selectedItem($event)"
        />
      </div>

    </app-role-form-drawer>
  `,
  styles: `
  `
})
export class RoleComponent {

  drawer: {
    role: { visible: boolean, initLoadId: any }
  } = {
    role: { visible: false, initLoadId: '' }
  }

  selectedItem(data: Role) {
    if (data) {
      this.drawer.role.initLoadId = data.roleCode;
    } else {
      this.drawer.role.initLoadId = null;
    }
  }

}

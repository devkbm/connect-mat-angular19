import { Component } from '@angular/core';
import { RoleFormDrawerComponent } from './role-form-drawer.component';
import { RoleGridComponent } from "./role-grid.component";
import { Role } from './role.model';
import { ShapeComponent } from "../../core/app/shape.component";

@Component({
  selector: 'app-role',
  imports: [
    RoleFormDrawerComponent,
    RoleGridComponent,
    ShapeComponent
],
  template: `
    {{drawer.role.initLoadId}}

    <ng-template #header>
      Title
    </ng-template>

    <app-shape [header]="header">
      <app-role-form-drawer [(visible)]="drawer.role.visible" [initLoadId]="drawer.role.initLoadId">
        asffassf
        <app-role-grid
          (editButtonClicked)="drawer.role.visible = true"
          (rowDoubleClicked)="drawer.role.visible = true"
          (rowClicked)="selectedItem($event)"
        />
      </app-role-form-drawer>
    </app-shape>
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

import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { RoleFormDrawerComponent } from './role-form-drawer.component';
import { RoleFormComponent } from "./role-form.component";
import { RoleGridComponent } from "./role-grid.component";

@Component({
  selector: 'app-role',
  imports: [
    RoleFormDrawerComponent,
    RoleFormComponent,
    RoleGridComponent
],
  template: `
    <app-role-form-drawer #drawer title="Title" [nzFooter]="footerTpl">
      <button (click)="drawer.open()">open</button>

      <div style="height: 500px">
        <app-role-grid
          (editButtonClicked)="drawer.open()"
        >
        </app-role-grid>
      </div>

      <app-role-form drawerContent [initLoadId]="drawerProp.role.initLoadId"></app-role-form>
    </app-role-form-drawer>

    <ng-template #footerTpl>
      Footer Template
    </ng-template>

  `,
  styles: `
  `
})
export class RoleComponent {

  drawerProp: {
    role: { visible: boolean, initLoadId: any }
  } = {
    role: { visible: false, initLoadId: '' }
  }

}

import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';


@Component({
  selector: 'app-button-renderer',
  standalone: true,
  imports: [
    MatIcon
   ],
  template: `
    <button (click)="onClick($event)">
      <mat-icon [fontSet]="'material-icons-outlined'">edit_note</mat-icon>
      {{label}}
    </button>
  `,
  styles: [`
    button {
      height: 100%;
      align-content: center;
    }
    .icon {
      //font-size: 16px; color: #08c;
    }
  `]
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  params: any;
  label: string = '';
  iconType: string= '';

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.label = this.params.label || null;
    this.iconType = this.params.iconType || null;
  }

  refresh(params: any): boolean {
    return true;
  }

  onClick($event: any): void {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
      };

      this.params.onClick(params);
    }
  }


}

import { Component, computed, effect, input, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MenuHierarchy } from '../app-layout.model';

@Component({
  selector: 'app-main-sidenav-menu-item',
  imports: [
    RouterModule,
    MatListModule,
    MatIcon,
  ],
  animations: [
    trigger('expandContractMenu',[
      transition(':enter', [
        style({ opacity:0, height: '0px'}),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px'}))
      ])
    ])
  ],
  template: `
    <a mat-list-item
      class="menu-item"
      [routerLink]="item().url"
      (click)="toggleNested()"
      routerLinkActive="selected-menu-item"
      #rla="routerLinkActive"
      [activated]="rla.isActive"
      [style.--mat-list-list-item-leading-icon-start-space]="indentation()"
    >
      <mat-icon [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'" matListItemIcon>{{item().icon}}</mat-icon>
      @if (!collapsed()) {
        <span matListItemTitle>{{item().title}}</span>
      }

      @if (item().children) {
        <span matListItemMeta>
          @if (nestedMenuOpen()) {
            <mat-icon>expand_less</mat-icon>
          } @else {
            <mat-icon>expand_more</mat-icon>
          }
        </span>
      }
    </a>

    @if (item().children && nestedMenuOpen()) {
      <div @expandContractMenu>
        @for (subItem of item().children; track subItem) {
          <app-main-sidenav-menu-item [item]="subItem" [collapsed]="collapsed()" />
        }
      </div>
    }

  `,
  styles: `
    :host * {
      transition: all 500ms ease-in-out;
    }

    .menu-item {
      //border-left: 5px solid;
      border-left-color: rgba(0, 0, 0, 0);
    }

    .selected-menu-item {
      border-left-color: var(--primary-color);
      //border-left-color: rgba(0, 0, 0, 0.05);
    }
  `
})
export class MainSidenavMenuItemComponent {

  item = input.required<MenuHierarchy>();

  collapsed = input.required<boolean>();

  level = computed(() => this.item().level);
  indentation = computed(() => this.collapsed() ? '16px' : `${(16 + (this.level() * 16))}px`);

  nestedMenuOpen = signal(false);

  logRoutes = effect(() => {

  });


  toggleNested() {
    if (!this.item().children) {
      return;
    }

    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }

}

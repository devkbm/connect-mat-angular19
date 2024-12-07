import { Component, computed, effect, inject, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { SessionManager } from 'src/app/core/session-manager';
import { ResponseList } from 'src/app/core/model/response-list';
import { AppLayoutService } from '../app-layout.service';
import { MenuHierarchy } from '../app-layout.model';

import { MainSidenavMenuItemComponent } from './main-sidenav-menu-item';

@Component({
  selector: 'app-main-sidenav',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MainSidenavMenuItemComponent
],
  template: `
    <div class="sidenav-header">
      <img
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Your channel </h2>
        <p>name</p>
      </div>
    </div>

    <mat-nav-list>
      @for(item of menuItems(); track item) {
        <app-main-sidenav-menu-item [item]="item" [collapsed]="sideNavCollapsed()" />
      }
    </mat-nav-list>
  `,
  styles: `
    .sidenav-header {
      padding-top: 24px;
      text-align: center;

      > img {
        border-radius: 100%;
        object-fit: cover;
        margin-bottom: 10px;
      }

      .header-text {
        height: 3rem;

        > h2 {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5rem;
        }

        > p {
          margin: 0;
          font-size: 0.8rem;
        }
      }
    }

    .hide-header-text {
      opacity: 0;
      height: 0px !important;
    }
  `
})
export class MainSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  private service = inject(AppLayoutService);
  menuItems = signal<MenuHierarchy[]>([]);

  menuGroupCode = input('');
  menuUrl = input('');

  constructor() {
    effect(() => {
      if (this.menuGroupCode() !== '') {
        this.getMenuList(this.menuGroupCode());
      }
      /*
      if (this.menuUrl() !== '') {
        this.moveToUrl(this.menuUrl());
      }
        */
    })
  }

  getMenuList(menuGroupCode: string): void {

    this.service
        .getUserMenuHierarchy(SessionManager.getUserId() as string, menuGroupCode)
        .subscribe(
          (model: ResponseList<MenuHierarchy>) => {
            this.menuItems.set(model.data);
            sessionStorage.setItem('menuList', JSON.stringify(model.data));
          }
        );
  }

}

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./sample/custom-sidenav.component";
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MainSidenavComponent } from './main-sidenav/main-sidenav.component';


@Component({
  selector: 'app-app-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
   // CustomSidenavComponent,
    MainSidenavComponent
  ],
  template: `

    <mat-toolbar class="mat-elevation-z3">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
      Connect App
      <mat-select style="width: 150px" [value]="menuGroupInfo.selectedId" (selectionChange)="changeMenuGroup($event.value)">
        @for (menuGroup of menuGroupInfo.list; track menuGroup) {
          <mat-option [value]="menuGroup.menuGroupCode">{{ menuGroup.menuGroupName }}</mat-option>
        }
      </mat-select>

    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened [style.width]="sidenavWidth()">
        <app-main-sidenav [collapsed]="collapsed()" [menuGroupCode]="this.menuGroupInfo.selectedId"></app-main-sidenav>
      </mat-sidenav>

      <mat-sidenav-content [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styles: `
    mat-toolbar {
      position: relative;
      z-index: 5;
      //position:fixed;
      //box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      box-shadow: var(--mat-sys-level2);
    }

    mat-sidenav-container {
      height: calc(100vh - var(--main-header-height));
    }

    mat-sidenav, mat-sidenav-content {
      transition: all 500ms ease-in-out;
    }

  `
})
export class AppLayoutComponent implements OnInit {

  private router = inject(Router);

  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  menuGroupInfo: {list: {menuGroupCode: string, menuGroupName: string, menuGroupUrl: string}[], selectedId: string} = {
    list: [],
    selectedId: ''
  }

  ngOnInit(): void {
    this.setInitMenuGroup();
  }

  setInitMenuGroup(): void {
    const stringMenuGroupList = sessionStorage.getItem('menuGroupList') as string;
    this.menuGroupInfo.list = JSON.parse(stringMenuGroupList);

    const sessionMenuGroup = sessionStorage.getItem('selectedMenuGroup') as string;
    if (sessionMenuGroup) {
      this.changeMenuGroup(sessionMenuGroup);
    }
  }

  changeMenuGroup(val: string) {
    this.menuGroupInfo.selectedId = val;
    sessionStorage.setItem('selectedMenuGroup', val);

    if (val) {
      const url = this.getSelectedMenuGroupUrl(val);
      this.moveToUrl(url);
    }
  }

  private getSelectedMenuGroupUrl(menuGroupCode: string) {
    return '/' + this.menuGroupInfo.list.find((e) => e.menuGroupCode === menuGroupCode)?.menuGroupUrl;
  }

  private moveToUrl(url: string) {
      if (this.router.url !== url) {
        this.router.navigate([url]);
      }
  }
}

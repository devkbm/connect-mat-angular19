import { Component, computed, effect, inject, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "./menu-item.component";

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MenuItemComponent
],
  template: `
    <div class="sidenav-header">
      <img
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        src=""
      />
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Your channel </h2>
        <p>sdsdf</p>
      </div>
    </div>

    <mat-nav-list>
      @for(item of menuItems(); track item) {
        <app-menu-item [item]="item" [collapsed]="sideNavCollapsed()" />
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
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'video_library',
      label: 'Content',
      route: 'content',
      children: [
        {
          icon: 'play_circle',
          label: 'Videos',
          route: 'videos',
          children: [
            {
              icon: 'movie',
              label: 'Shorts',
              route: 'shorts'
            },
            {
              icon: 'tv',
              label: 'Long Form',
              route: 'long-form'
            }
          ]
        },
        {
          icon: 'playlist_play',
          label: 'Playlists',
          route: 'playlists'
        },
      ]
    },
    {
      icon: 'analytics',
      label: 'Analyitcs',
      route: 'analytics'
    },
    {
      icon: 'comments',
      label: 'Comments',
      route: 'comments',
    }
  ])

}

import { Component, OnInit, AfterViewInit, inject, Renderer2, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { ResponseList } from 'src/app/core/model/response-list';

import { Role } from './role.model';
import { existingRoleValidator } from './role-duplication-validator.directive';
import { RoleService } from './role.service';

import { MenuService } from '../menu/menu.service';
import { MenuGroup } from '../menu/menu-group.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    {{fg.getRawValue() | json}} - {{fg.valid}}

    <form [formGroup]="fg">
      <div class="card-1">
        <mat-form-field>
          <mat-label for="roleCode" required>롤 코드</mat-label>
          <input matInput id="roleCode" formControlName="roleCode" required>
        </mat-form-field>

        <mat-form-field>
          <mat-label for="roleName" required>롤 명</mat-label>
          <input matInput id="roleName" formControlName="roleName" required>
        </mat-form-field>

        <!--
        <nz-form-item-custom for="menuGroupCode" label="메뉴그룹" required>
          <nz-form-control nzHasFeedback [nzErrorTip]="errorTpl">
            <nz-input-select required
              formControlName="menuGroupCode" itemId="menuGroupCode"
              [options]="menuGroupList" [opt_value]="'menuGroupCode'" [opt_label]="'menuGroupName'"
              placeholder="Please select"
            ></nz-input-select>
          </nz-form-control>
        </nz-form-item-custom>

        <nz-form-item-custom for="description" label="설명">
          <nz-form-control>
            <textarea nz-input id="description" formControlName="description"
            placeholder="권한에 대한 설명을 입력해주세요." [rows]="10">
            </textarea>
          </nz-form-control>
        </nz-form-item-custom>
      -->
      </div>
    </form>
  `,
  styles: [`
    .box {
        box-shadow:  0 6px 4px -4px rgba(0,0,0,0.7);
    }

    .box2 {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .card {
      border-radius: 2px;
      display: inline-block;
      height: 300px;
      margin: 1rem;
      position: relative;
      width: 300px;
    }

    .card-1 {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .card-1:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .card-2 {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .card-3 {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    .card-4 {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .card-5 {
      box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }

    /* Shadows */
    .shadow-top {
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-right {
        box-shadow: 10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-bottom {
        box-shadow: 0 10px 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-left {
        box-shadow: -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-all {
        box-shadow: 0 0 20px rgba(115,115,115,0.75);
    }
    .shadow-top-right{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-bottom{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    0 10px 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-left{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-bottom-right{
        box-shadow: 0 10px 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-left-right{
        box-shadow: -10px 0 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-bottom-left{
        box-shadow: 0 10px 20px -5px rgba(115,115,115,0.75),
                    -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-bottom-right{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    0 10px 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-bottom-left{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    0 10px 20px -5px rgba(115,115,115,0.75),
                    -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-inset {
        box-shadow: inset 0 0 20px rgba(115,115,115,0.75);
    }

  `]
})
export class RoleFormComponent extends FormBase implements OnInit, AfterViewInit {

  //roleCode = viewChild.required<NzInputTextComponent>('roleCode');

  private service = inject(RoleService);
  private appAlarmService = inject(AppAlarmService);
  private renderer = inject(Renderer2);

  private menuService = inject(MenuService);
  menuGroupList: any;

  override fg = inject(FormBuilder).group({
    roleCode : new FormControl<string | null>('', {
                                                    validators: Validators.required,
                                                    asyncValidators: [existingRoleValidator(this.service)],
                                                    updateOn: 'blur'
                                                  }),
    roleName      : new FormControl<string | null>(null),
    description   : new FormControl<string | null>(null),
    menuGroupCode : new FormControl<string | null>(null)
  });

  override initLoadId = input<string>();

  constructor() {
    super();

    effect(() => {
      if (this.initLoadId()) {
        this.get(this.initLoadId()!);
      }
    })
  }

  ngOnInit() {
    this.getMenuGroupList();
  }

  ngAfterViewInit(): void {
    //this.roleCode().focus();
  }

  focusInput() {
    this.renderer.selectRootElement('#roleCode').focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.controls.roleCode.setAsyncValidators(existingRoleValidator(this.service));

    this.fg.controls.roleCode.enable();

    this.focusInput();
  }

  modifyForm(formData: Role): void {
    this.formType = FormType.MODIFY;

    this.fg.controls.roleCode.setAsyncValidators(null);
    this.fg.controls.roleCode.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string): void {
    this.service
        .getRole(id)
        .subscribe(
          (model: ResponseObject<Role>) => {
            model.data ? this.modifyForm(model.data) : this.newForm()
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .registerRole(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Role>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.service
        .deleteRole(this.fg.controls.roleCode.value!)
        .subscribe(
          (model: ResponseObject<Role>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getMenuGroupList(): void {
    this.menuService
        .getMenuGroupList()
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
            this.menuGroupList = model.data;
          }
        );
  }

}

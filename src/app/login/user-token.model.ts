import { MenuGroup } from 'src/app/system/menu/menu-group.model';
import { Role } from 'src/app/system/role/role.model';

export interface UserToken {
  sessionId: string;
  userId: string;
  userName: string;
  companyCode: string;
  staffNo: string;
  email: string;
  imageUrl: string;
  ipAddress: string;
  roleList: Role[];
  menuGroupList: MenuGroup[];
}

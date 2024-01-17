import { IFormOption } from '../../@core/interfaces/app-form.interface';
import { UserRole } from '../../authentication/enums/user-role.enum';

export const USER_ROLE_OPTIONS: IFormOption[] = [
  { label: 'Admin', value: UserRole.admin },
  { label: 'Membro', value: UserRole.member },
];

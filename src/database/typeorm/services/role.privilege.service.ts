import * as fs from 'fs';
import path from 'path';
import { Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { RolePrivilegeDto } from '../../../domain.types/role.privilege/role.privilege.dto';
import { Helper } from '../../../common/helper';
import { NeedleService } from '../../../common/needle.service';
import { DefaultRoles } from '../../../domain.types/miscellaneous/role.types';
import { RolePermission } from '../models/role.permission.entity';
import { Source } from '../typeorm.database.connector';
import { ErrorHandler } from '../../../common/error.handling/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class RolePrivilegeService {
    
    _rolePermissionRepository: Repository<RolePermission> = Source.getRepository(RolePermission);

    create = async (object: any): Promise<RolePrivilegeDto> => {
        try {
            const entity = {
                RoleId    : object.RoleId,
                RoleName  : object.RoleName,
                Privilege : object.Privilege,
                Scope     : object.Scope,
                Enabled   : object.Enabled,
            };
            const rp = await this._rolePermissionRepository.save(entity);
            const dto: RolePrivilegeDto = {
                id        : rp.id,
                RoleId    : rp.RoleId,
                RoleName  : rp.RoleName,
                Privilege : rp.Privilege,
                Scope     : rp.Scope,
                Enabled   : rp.Enabled,
            };
            return dto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('Unable to create role privilege!', error);
        }
    };

    hasPrivilegeForRole = async (roleId: number, privilege: string): Promise<boolean> => {
        try {
            const rolePrivileges = await this._rolePermissionRepository.find({
                where: {
                    RoleId    : roleId,
                    Privilege : Like(`%${privilege}%`),
                },
            });
            return rolePrivileges.length > 0;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to validate role and privilege!', error);
        }
    };

    getRolePrivilege = async (roleId: number, privilege: string): Promise<RolePrivilegeDto | null> => {
        try {
            const rp = await this._rolePermissionRepository.findOne({
                where: {
                    RoleId    : roleId,
                    Privilege : Like(`%${privilege}%`),
                },
            });
            if (rp == null) {
                return null;
            }
            const dto: RolePrivilegeDto = {
                id        : rp.id,
                RoleId    : rp.RoleId,
                RoleName  : rp.RoleName,
                Privilege : rp.Privilege,
                Scope     : rp.Scope,
                Enabled   : rp.Enabled,
            };
            return dto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('Unable to retrieve role privilege!', error);
        }
    };

    enable = async (id: string, enable: boolean): Promise<RolePrivilegeDto> => {
        try {
            const rp = await this._rolePermissionRepository.findOne({ where: { id } });
            rp.Enabled = enable;
            await this._rolePermissionRepository.save(rp);
            const dto: RolePrivilegeDto = {
                id        : rp.id,
                RoleId    : rp.RoleId,
                RoleName  : rp.RoleName,
                Privilege : rp.Privilege,
                Scope     : rp.Scope,
                Enabled   : rp.Enabled,
            };
            return dto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('Unable to enable/disable role privilege!', error);
        }
    };

    seedRolePrivileges = async () => {
        try {
            const roles = await this.getAllRoles();
            for await (const r of roles) {
                const seederFile = r.SeederFile;
                if (seederFile == null) {
                    continue;
                }
                var filepath = path.join(process.cwd(), 'seed.data', 'role.privileges', seederFile);
                var fileBuffer = fs.readFileSync(filepath, 'utf8');
                const privilegeMap = JSON.parse(fileBuffer);
                const privileges = Helper.convertPrivilegeMapToPrivilegeList(privilegeMap);

                for (const p of privileges) {
                    var keys = Object.keys(p);
                    var privilege = keys[0];
                    var enabled = p[privilege];

                    const rp = await this.getRolePrivilege(r.id, privilege);
                    if (rp == null) {
                        await this.create({
                            RoleId    : r.id,
                            RoleName  : r.RoleName,
                            Privilege : privilege,
                            Scope     : r.Scope,
                            Enabled   : enabled,
                        });
                    } else {
                        if (rp.Enabled !== enabled) {
                            await this.enable(rp.id, enabled);
                        }
                    }
                }
            }
        } catch (error) {
            ErrorHandler.throwDbAccessError('Error occurred while seeding role-privileges!', error);
        }
          
    };

      getAllRoles = async () => {
          const apiURL = '/types/person-roles';

          try {
              const result = await NeedleService.needleRequestForREAN("get", apiURL);
              const roles = result.Data?.PersonRoleTypes || [];

              const roleMap = new Map<string, any>();

              for (const role of roles) {
                  roleMap.set(role.RoleName, { ...role });
              }

              for (const defaultRole of DefaultRoles) {
                  const existing = roleMap.get(defaultRole.Role);
                  roleMap.set(defaultRole.Role, {
                      ...existing,
                      ...defaultRole
                  });
              }

              return Array.from(roleMap.values());
          } catch (error) {
              ErrorHandler.throwDbAccessError('Failed to fetch person roles!', error);
              return DefaultRoles;
          }
      };

}

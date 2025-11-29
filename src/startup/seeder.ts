import { FileUtils } from '../common/utilities/file.utils';
import { logger } from '../logger/logger';
import { RolePrivilegeService } from '../database/typeorm/services/role.privilege.service';

//////////////////////////////////////////////////////////////////////////////

export class Seeder {

    _rolePrivilegeService: RolePrivilegeService = new RolePrivilegeService();

    public seed = async (): Promise<void> => {
        try {
            await this.createTempFolders();
            await this._rolePrivilegeService.seedRolePrivileges();
        } catch (error) {
            logger.error(error.message);
        }
    };

    private createTempFolders = async () => {
        await FileUtils.createTempDownloadFolder();
        await FileUtils.createTempUploadFolder();
    };

}

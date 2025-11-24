import fs from 'fs';
import path from 'path';
import { FileUtils } from '../common/utilities/file.utils';
import { logger } from '../logger/logger';
// import { RolePrivilegeService } from '../database/repository.services/role.privilege.service';
// import { RoleService } from '../database/repository.services/role.service';
// import { UserRoleService } from '../database/repository.services/user/user.role.service';
// import { UserService } from '../database/repository.services/user/user.service';
// import { ApiClientService } from '../database/repository.services/api.client.service';

//////////////////////////////////////////////////////////////////////////////

export class Seeder {
    // _apiClientService: ApiClientService = new ApiClientService();
    // _userService: UserService = new UserService();
    // _roleService: RoleService = new RoleService();
    // _rolePrivilegeService: RolePrivilegeService = new RolePrivilegeService();
    // _userRoleService: UserRoleService = new UserRoleService();

    public seed = async (): Promise<void> => {
        try {
            await this.createTempFolders();
            // await this.seedDefaultRoles();
            // await this._rolePrivilegeService.seedRolePrivileges();
            // await this.seedInternalClients();
            // await this.seedDefaultUsers();
            logger.info('Seeder initialized successfully!');
        } catch (error) {
            logger.error(error.message);
        }
    };

    private createTempFolders = async () => {
        await FileUtils.createTempDownloadFolder();
        await FileUtils.createTempUploadFolder();
    };

    private seedDefaultUsers = async () => {
        const defaultUsers = this.loadJSONSeedFile('default.users.seed.json');

        // TODO: Implement user seeding when UserService is available
        // for await (var u of defaultUsers) {
        //     const role = await this._roleService.getByName(u.Role);
        //     const existingUser = await this._userService.getUser(null, null, null, u.UserName);
        //     if (existingUser) {
        //         continue;
        //     }
        //     // ... create user logic
        // }

        logger.info('Seeded default users successfully!');
    };

    private loadJSONSeedFile(file: string): any {
        var filepath = path.join(process.cwd(), 'seed.data', file);
        var fileBuffer = fs.readFileSync(filepath, 'utf8');
        const obj = JSON.parse(fileBuffer);
        return obj;
    }

    // private seedInternalClients = async () => {
    //     Logger.instance().log('Seeding internal clients...');
    //     const arr = this.loadJSONSeedFile('internal.clients.seed.json');
    //     // TODO: Implement client seeding when ApiClientService is available
    // };

    // private seedDefaultRoles = async () => {
    //     // TODO: Implement role seeding when RoleService is available
    // };
}

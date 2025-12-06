import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';

//Import your repositories here... -->
import { RolePrivilegeService } from './services/role.privilege.service';
// <-- Import your repositories here...

////////////////////////////////////////////////////////////////////////////////

export class RepositoryInjector {

    static registerInjections(container: DependencyContainer) {
        //Register your repositories here... -->
        container.register(RolePrivilegeService, { useClass: RolePrivilegeService });
        // <-- Register your repositories here...
    }

}

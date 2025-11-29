import 'reflect-metadata';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'role_permissions' })
export class RolePermission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int', nullable: false })
    RoleId: number;

    @Column({ type: 'varchar', length: 32, nullable: true })
    RoleName: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    Privilege: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    Scope: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    Enabled: boolean;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}



import 'reflect-metadata';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Max, Min } from 'class-validator';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    @Max(64)
    @Min(0)
    UserName: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    FirstName: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    LastName: string;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    @Max(1000)
    @Min(0)
    ProfileImageUrl: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}

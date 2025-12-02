// import { IsUrl } from "class-validator";
import 'reflect-metadata';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Max, Min } from 'class-validator';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    TenantId: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    Name: string;

    @Column({ type: 'varchar', length: 2000, nullable: true })
    @Max(2000)
    @Min(0)
    Description: string;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    @Max(1000)
    @Min(0)
    ImageUrl: string;

    @Column({ type: 'int', nullable: true })
    @Max(64)
    @Min(0)
    DurationInDays: number;

    @Column({ type: 'int', nullable: true })
    @Max(64)
    @Min(0)
    Sequence: number;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}

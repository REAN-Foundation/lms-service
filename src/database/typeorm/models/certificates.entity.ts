// import { IsUrl } from "class-validator";
import 'reflect-metadata';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    ManyToOne,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinTable,
} from 'typeorm';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { IsEmail, Max, Min, IsUrl } from 'class-validator';
import { Course } from './course.entity';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'certificates' })
export class Certificates {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    UserId: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    CertificateNumber: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    CertificateName: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    CertificateType: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    IssuedDate: string;

    @Column({ type: 'timestamp', nullable: true })
    ExpiryDate: Date;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    @Max(1000)
    @Min(0)
    CertificateUrl: string;

    @Column({ type: 'float', nullable: true })
    @Max(64)
    @Min(0)
    FinalGrade: number;

    @Column({ type: 'int', nullable: true })
    @Max(64)
    @Min(0)
    CreditHours: number;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    @Max(1000)
    @Min(0)
    Skills: string;

    @Column({ type: 'boolean', nullable: true })
    IsVerified: boolean;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    @Max(1000)
    @Min(0)
    VerificationUrl: string;

    @Column({ type: 'uuid', nullable: true })
    IssuedBy: string;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'CourseId', referencedColumnName: 'id' })
    Course: Course;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}

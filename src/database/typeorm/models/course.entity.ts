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
import { CourseModule } from './course.module.entity';
import { LearningPathCourses } from './learning.path.courses.entity';
import { CourseContent } from './course.content.entity';
import { UserLearning } from './user.learning.entity';
import { Certificates } from './certificates.entity';

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

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}

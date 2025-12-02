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
import { CourseContent } from './course.content.entity';
import { UserLearning } from './user.learning.entity';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'course_modules' })
export class CourseModule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
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
    DurationInMins: number;

    @Column({ type: 'int', nullable: true })
    @Max(64)
    @Min(0)
    Sequence: number;

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

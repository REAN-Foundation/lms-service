import 'reflect-metadata';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Max, Min } from 'class-validator';
import { CourseContentType } from '../../../domain.types/enums/course.content.type.enum';
import { Course } from './course.entity';
import { CourseModule } from './course.module.entity';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'course_contents' })
export class CourseContent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    @Max(64)
    @Min(0)
    Title: string;

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

    @Column({ type: 'enum', enum: CourseContentType, nullable: true })
    ContentType: CourseContentType;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    @Max(1000)
    @Min(0)
    ResourceLink: string;

    @Column({ type: 'uuid', nullable: true })
    ActionTemplateId: string;

    @Column({ type: 'int', nullable: true })
    @Max(64)
    @Min(0)
    Sequence: number;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'CourseId', referencedColumnName: 'id' })
    Course: Course;

    @ManyToOne(() => CourseModule)
    @JoinColumn({ name: 'CourseModuleId', referencedColumnName: 'id' })
    CourseModule: CourseModule;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}

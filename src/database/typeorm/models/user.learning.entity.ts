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
import { ProgressStatus } from '../../../domain.types/enums/progress.status.enum';
import { Course } from './course.entity';
import { LearningPath } from './learning.path.entity';
import { CourseModule } from './course.module.entity';
import { CourseContent } from './course.content.entity';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'user_learnings' })
export class UserLearning {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    UserId: string;

    @Column({ type: 'enum', enum: ProgressStatus, nullable: true })
    ProgressStatus: ProgressStatus;

    @Column({ type: 'int', nullable: true })
    @Max(64)
    @Min(0)
    PercentageCompletion: number;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'CourseId', referencedColumnName: 'id' })
    Course: Course;

    @ManyToOne(() => LearningPath)
    @JoinColumn({ name: 'LearningPathId', referencedColumnName: 'id' })
    LearningPath: LearningPath;

    @ManyToOne(() => CourseModule)
    @JoinColumn({ name: 'CourseModuleId', referencedColumnName: 'id' })
    CourseModule: CourseModule;

    @ManyToOne(() => CourseContent)
    @JoinColumn({ name: 'CourseContentId', referencedColumnName: 'id' })
    CourseContent: CourseContent;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}

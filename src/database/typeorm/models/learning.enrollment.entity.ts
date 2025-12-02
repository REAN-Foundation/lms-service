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
import { ProgressStatus } from '../../../domain.types/enums/progress.status.enum';
import { Course } from './course.entity';
import { LearningPath } from './learning.path.entity';

@Entity({ name: 'learning_enrollments' })
export class LearningEnrollment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    UserId: string;

    @Column({ type: 'uuid', nullable: true })
    TenantId: string;

    @ManyToOne(() => Course, { nullable: true })
    @JoinColumn({ name: 'CourseId', referencedColumnName: 'id' })
    Course: Course;

    @ManyToOne(() => LearningPath, { nullable: true })
    @JoinColumn({ name: 'LearningPathId', referencedColumnName: 'id' })
    LearningPath: LearningPath;

    @Column({ type: 'enum', enum: ProgressStatus, default: ProgressStatus.Pending })
    ProgressStatus: ProgressStatus;

    @Column({ type: 'boolean', default: true })
    IsActive: boolean;

    @Column({ type: 'timestamp', nullable: true })
    StartDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    EndDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    CompletedAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    EnrolledAt: Date;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}


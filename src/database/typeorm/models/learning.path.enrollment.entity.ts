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
import { LearningPath } from './learning.path.entity';

@Entity({ name: 'learning_path_enrollments' })
export class LearningPathEnrollment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    UserId: string;

    @Column({ type: 'uuid', nullable: true })
    TenantId: string;

    @ManyToOne(() => LearningPath, { nullable: false })
    @JoinColumn({ name: 'LearningPathId', referencedColumnName: 'id' })
    LearningPath: LearningPath;

    @Column({ type: 'boolean', default: true })
    IsActive: boolean;

    @Column({ type: 'timestamp', nullable: true })
    StartDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    ExpectedEndDate: Date;

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


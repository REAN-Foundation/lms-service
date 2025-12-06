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
import { Course } from './course.entity';

@Entity({ name: 'course_enrollments' })
export class CourseEnrollment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    UserId: string;

    @Column({ type: 'uuid', nullable: true })
    TenantId: string;

    @ManyToOne(() => Course, { nullable: false })
    @JoinColumn({ name: 'CourseId', referencedColumnName: 'id' })
    Course: Course;

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


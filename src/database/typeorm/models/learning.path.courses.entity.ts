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
import { LearningPath } from './learning.path.entity';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'learning_path_courses' })
export class LearningPathCourses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'CourseId', referencedColumnName: 'id' })
    Course: Course;

    @ManyToOne(() => LearningPath)
    @JoinColumn({ name: 'LearningPathId', referencedColumnName: 'id' })
    LearningPath: LearningPath;

    @Column({ type: 'integer', nullable: true })
    Sequence: number;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}

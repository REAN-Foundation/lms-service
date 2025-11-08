// import { IsUrl } from "class-validator";
import "reflect-metadata";
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
import { uuid } from "../../../domain.types/miscellaneous/system.types";
import { IsEmail, Max, Min , IsUrl } from "class-validator";
import { Course } from './course.entity';
import { LearningPath } from './learning.path.entity';


////////////////////////////////////////////////////////////////////////

@Entity({ name: 'learning_path_courses' })
export class LearningPathCourses {
    
        @PrimaryGeneratedColumn('uuid')
        id : string;

    
    @ManyToOne(() => Course)
@JoinColumn({ name: 'CourseId', referencedColumnName: 'id' })
Course: Course;

@ManyToOne(() => LearningPath)
@JoinColumn({ name: 'LearningPathId', referencedColumnName: 'id' })
LearningPath: LearningPath;


    
    @CreateDateColumn()
    CreatedAt : Date;

    @UpdateDateColumn()
    UpdatedAt : Date;

    @DeleteDateColumn()
    DeletedAt : Date;
    
}

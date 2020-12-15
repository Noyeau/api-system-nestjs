import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";




@Entity()
export class App {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    label: string;

    @Column({
        unique: true
    })
    code: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    open: boolean;

    @Column({ nullable: true })
    activated: boolean;

    @Column({ nullable: true })
    url: string;

    @Column({
        type: "simple-json",
        nullable: true,
        select: false
    })
    data: any;

    @Column({
        type: "simple-json",
        nullable: true,
    })
    role: string[];

    @Column({ nullable: true })
    repository: string;

    constructor(options: {} = null) {
        if (options) {
            Object.assign(this, options);
        }
    }

}
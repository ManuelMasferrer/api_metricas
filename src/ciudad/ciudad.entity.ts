import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CiudadEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    // @ManyToOne(() => CiudadEntity, ciudad => ciudad.restaurante)      
    //     ciudades: CiudadEntity;
   
    
}

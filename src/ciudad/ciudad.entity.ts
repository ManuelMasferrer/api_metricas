<<<<<<< HEAD
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RestauranteEntity } from '../restaurante/restaurante.entity';
=======
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CiudadEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @ManyToOne(() => CiudadEntity, ciudad => ciudad.restaurante)      
        ciudades: CiudadEntity;
   
    
}
>>>>>>> ee351af (Entities ciudad, categoria)

@Entity()
export class CiudadEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @OneToMany(() => RestauranteEntity, restaurante => restaurante.ciudad)      
    restaurantes: RestauranteEntity[];
   
    
}

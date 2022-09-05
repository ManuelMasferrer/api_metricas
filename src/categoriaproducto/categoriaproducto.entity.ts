

import { ProductoEntity } from '../producto/producto.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoriaproductoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
   
    @ManyToOne(() => ProductoEntity, producto => producto.categoria )
    producto: ProductoEntity;
}

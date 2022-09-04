<<<<<<< HEAD
import { ProductoEntity } from '../producto/producto.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

=======
// import { Producto } from '../producto/producto.entity';

<<<<<<< HEAD
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> ee351af (Entities ciudad, categoria)
=======
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
>>>>>>> 375460a (actuliza entidad)

@Entity()
export class CategoriaproductoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
   
<<<<<<< HEAD
<<<<<<< HEAD
    @OneToMany(() => ProductoEntity, producto => producto.categoria )
    productos: ProductoEntity[];

}
=======
    // @ManyToOne(() => CategoriaproductoEntity, Producto => Producto.categoria )
    // categoriaproducto: catetoriaproducto.Entity;
=======
    @ManyToOne(() => CategoriaproductoEntity, Producto => Producto.categoria )
    categoriaproducto: catetoriaproducto.Entity;
    
>>>>>>> 375460a (actuliza entidad)
}
    
>>>>>>> ee351af (Entities ciudad, categoria)

import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity'
/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
@Entity()
export class ProductoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 descripcion: string;
 
 @ManyToOne(() => CategoriaproductoEntity, categoria => categoria.productos )
 categoria: CategoriaproductoEntity;

 @ManyToOne(() => CulturaGastronomicaEntity, culturaGastronomica => culturaGastronomica.productos )
 culturaGastronomica: CulturaGastronomicaEntity;

 @ManyToOne(() => CategoriaproductoEntity, categoria => categoria.productos )
 categoriaProducto: CategoriaproductoEntity;
 

}


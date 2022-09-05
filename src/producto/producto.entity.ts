import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity'
/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
@Entity()
export class ProductoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 descripcion: string;
 
 @OneToMany(() => CategoriaproductoEntity, categoria => categoria.id )
 categoria: CategoriaproductoEntity[];

 @OneToMany(() => CulturaGastronomicaEntity, culturaGastronomica => culturaGastronomica.id )
 culturaGastronomica: CulturaGastronomicaEntity[];

}


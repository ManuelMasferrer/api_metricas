import { RecetaEntity } from '../receta/receta.entity';
/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ProductoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 descripcion: string;
 
 @Column()
  categoria: CATEGORIA;

 @ManyToMany(() => RecetaEntity, receta => receta.id)
 @JoinTable()
   recetas: RecetaEntity[];

}

export enum CATEGORIA {
    Condimentos = 0,
    Colorantes = 1,
    Proteinas = 2,
    Verduras = 3,
    Frutas = 4,
    Legumbres = 5
}

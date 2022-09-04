import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
export class RestauranteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    nombre: string;
    
    @Column()
    michelin: string;
    
    @Column()
    fechaMichelin: string;
   
   /*@ManyToOne(() => PaisEntity, pais => pais.id)
    pais: PaisEntity;
    @ManyToOne(() => CiudadEntity, ciudad => ciudad.id)
    ciudad: CiudadEntity;

  */

}


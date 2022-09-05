import { Column, Entity,ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

export class RestauranteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    nombre: string;
    
    @Column()
    michelin: string;
    
    @Column()
    fechaMichelin: string;
   
    @ManyToOne(() => CiudadEntity, ciudad => ciudad.restaurantes)
    ciudad: CiudadEntity;

  

}


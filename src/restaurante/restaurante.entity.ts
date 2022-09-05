
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { Column, Entity,ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Entity()
export class RestauranteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    nombre: string;
    
    @Column()
    michelin: string;
    
    @Column()
    fechaMichelin: string;


    @OneToMany(() => CiudadEntity, ciudad => ciudad.id)
    ciudad: CiudadEntity;

    @OneToMany(() => CulturaGastronomicaEntity, culturaGastronomica => culturaGastronomica.id)
    culturaGastronomica: CulturaGastronomicaEntity[];

}


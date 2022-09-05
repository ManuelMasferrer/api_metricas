import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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


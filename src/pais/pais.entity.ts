import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';

@Entity()
export class PaisEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @ManyToMany(() => CulturaGastronomicaEntity, 
    (culturagastronomica) => culturagastronomica.paises)
    culturasgastronomicas?: CulturaGastronomicaEntity[];

}

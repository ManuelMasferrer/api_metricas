import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @OneToOne(
    () => CulturaGastronomicaEntity,
    (culturagastronomica) => culturagastronomica.region
  )
  @JoinColumn()
  culturagastronomica: Relation<CulturaGastronomicaEntity>;
}

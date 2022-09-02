import { CulturaGastronomicaEntity } from 'src/culturagastronomica/culturagastronomica.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nombre: string;

  @OneToOne(
    () => CulturaGastronomicaEntity,
    (culturagastronomica) => culturagastronomica.region,
  )
  culturagastronomica: CulturaGastronomicaEntity;
}

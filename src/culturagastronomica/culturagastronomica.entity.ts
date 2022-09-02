import { RegionEntity } from 'src/region/region.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CulturaGastronomicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToOne(() => RegionEntity, (region) => region.culturagastronomica)
  @JoinColumn()
  region: RegionEntity;
}

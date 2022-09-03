import { RegionEntity } from '../region/region.entity';
/*import { RecetaEntity } from '../receta/receta.entity';
import { PaisEntity } from '../pais/pais.entity';*/
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class CulturaGastronomicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToOne(() => RegionEntity, (region) => region.culturagastronomica, {
    cascade: true,
  })
  region: Relation<RegionEntity>;

  /*@OneToMany(() => RecetaEntity, (receta) => receta.culturagastronomica)
  recetas: RecetaEntity[];

  @ManyToMany( () => PaisEntity, (pais) => pais.culturasgastronomicas)
  @JoinTable()
  paises: PaisEntity[];*/

}
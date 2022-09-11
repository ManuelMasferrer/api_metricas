import { RegionEntity } from '../region/region.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { PaisEntity } from '../pais/pais.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';


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

  @OneToMany(() => RecetaEntity, (receta) => receta.culturagastronomica)
  recetas: RecetaEntity[];

  @OneToMany(()=> RestauranteEntity, (restaurante) => restaurante.culturagastronomica)
  restaurantes: RestauranteEntity[];

  @ManyToMany( () => PaisEntity, (pais) => pais.culturasgastronomicas)
  @JoinTable()
  paises: PaisEntity[];

  @OneToMany(() => ProductoEntity, (producto) => producto.culturaGastronomica)
  productos: ProductoEntity[];


}
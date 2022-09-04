import { RegionEntity } from '../region/region.entity';
import { RecetaEntity } from '../receta/receta.entity';
<<<<<<< HEAD
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

=======

import {  Column,  Entity,  JoinColumn,  JoinTable,  ManyToMany,  OneToMany,  OneToOne,  PrimaryGeneratedColumn,} from 'typeorm';
>>>>>>> 375460a (actuliza entidad)

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

<<<<<<< HEAD
  @OneToMany(()=> RestauranteEntity, (restaurante) => restaurante.culturagastronomica)
  restaurantes: RestauranteEntity[];

  @ManyToMany( () => PaisEntity, (pais) => pais.culturasgastronomicas)
  @JoinTable()
  paises: PaisEntity[];

  @OneToMany(() => ProductoEntity, (producto) => producto.culturaGastronomica)
  productos: ProductoEntity[];


=======
  /*
  @ManyToMany( () => PaisEntity, (pais) => pais.culturasgastronomicas  )
  @JoinTable()
  paises: PaisEntity[];
  */
  
>>>>>>> 375460a (actuliza entidad)
}

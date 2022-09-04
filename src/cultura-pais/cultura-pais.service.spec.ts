import { Test, TestingModule } from '@nestjs/testing';
import { CulturaPaisService } from './cultura-pais.service';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';
import { PaisEntity } from '../pais/pais.entity';

describe('CulturaPaisService', () => {
  let service: CulturaPaisService;
  let culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>;
  let paisRepository: Repository<PaisEntity>;
  let culturasList: CulturaGastronomicaEntity[];
  let recetasList: RecetaEntity[];
  let paisesList: PaisEntity[];
  let region: RegionEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CulturaPaisService],
    }).compile();

    service = module.get<CulturaPaisService>(CulturaPaisService);
    culturaGastronomicaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
    paisRepository = module.get<Repository<PaisEntity>>(getRepositoryToken(PaisEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    paisRepository.clear();
    culturaGastronomicaRepository.clear();

    culturasList = [];
    const region = new RegionEntity();
    region.nombre = faker.commerce.productName();

    for(let i = 0; i < 5; i++){
      const cultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
          nombre: faker.company.name(),
          descripcion: faker.commerce.productDescription(),
          region: region,
          recetas: [],
          paises: [],
      })
      culturasList.push(cultura);
      
  }

    // paisesList = [];
    // for(let i =0; i< 5; i++) {
    //   const pais: PaisEntity = await paisRepository.save({
    //     nombre: faker.address.country(),
    //   })
    //   paisesList.push(pais);
    // }

    // const region = new RegionEntity();
    // region.nombre = faker.commerce.productName();  
    // paisesList:  paisesList = [];
    // culturagastronomica = await culturaGastronomicaRepository.save({
    //   nombre: faker.company.name(),
    //   descripcion: faker.commerce.productDescription(),
    //   region: region,
    //   recetas: recetasList,
    //   paises: paisesList,
    // })
  }

  it('el servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('addCulturaGastronomicaPais debe agregar una cultura gastronomica a un pais', async () => {
    const newCultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: [],
      paises: [],
    });

    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country(),
      culturasgastronomicas: []
    })

    const resultado: CulturaGastronomicaEntity = await service.addCulturaGastronomicaPais(newCultura.id, newPais.id);

    expect(resultado.paises.length).toBe(1);
    expect(resultado.paises[0]).not.toBeNull();
    expect(resultado.paises[0].nombre).toBe(newPais.nombre);

  });

});
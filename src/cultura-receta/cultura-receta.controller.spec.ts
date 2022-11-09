import { Test, TestingModule } from '@nestjs/testing';
import { CulturaRecetaService } from './cultura-receta.service';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';
import { CulturaRecetaController } from './cultura-receta.controller';


describe('CulturaRecetaService', () => {
  let service: CulturaRecetaService;
  let controller: CulturaRecetaController
  let culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>;
  let recetaRepository: Repository<RecetaEntity>;
  let culturagastronomica: CulturaGastronomicaEntity;
  let receta: RecetaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CulturaRecetaService, CulturaRecetaController],
    }).compile();

    service = module.get<CulturaRecetaService>(CulturaRecetaService);
    controller = module.get<CulturaRecetaController>(CulturaRecetaController);
    culturaGastronomicaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
    recetaRepository = module.get<Repository<RecetaEntity>>(getRepositoryToken(RecetaEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    recetaRepository.clear();
    culturaGastronomicaRepository.clear();
    receta = await recetaRepository.save({
      nombre: faker.lorem.words(), 
      descripcion: faker.lorem.sentence(),
      foto: faker.image.imageUrl(),
      preparacion: faker.lorem.paragraph(),
      video: faker.image.imageUrl()
    });
    const region = new RegionEntity();
    region.nombre = faker.commerce.productName();  
    culturagastronomica = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: [receta],
      paises: []
    })
  }

  describe('findAll', () => {
    it('debe retornar un arreglo de recetas asociadas a una cultura', async() => {
        const result = culturagastronomica.recetas;
        jest.spyOn(service, 'findRecetasFromCultura').mockResolvedValue(result);
        expect(await controller.findRecetasFromCultura('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
    });
});

describe('findRecetaFromCultura', () => {
    it('debe retornar una receta asociada a una cultura', async() => {
        const result = receta;
        jest.spyOn(service, 'findRecetaFromCultura').mockResolvedValue(result);
        expect(await controller.findRecetaFromCultura('d3645100-59ab-11ed-9f7e-c578b8de1b93','d3645100-59ab-11ed-9f7e-c578b8de1b90')).toBe(result);
    });        
});


});
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteService } from './restaurante.service';
import { faker } from '@faker-js/faker';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RestauranteController } from './restaurante.controller';

describe('RestauranteService', () => {
  let service: RestauranteService;
  let controller: RestauranteController;
  let restauranteRepository: Repository<RestauranteEntity>;
  let restaurantesList = [];
  let ciudadData = new CiudadEntity();
  let culturaGastronomicaData = new CulturaGastronomicaEntity();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestauranteService, RestauranteController],
    }).compile();

    service = module.get<RestauranteService>(RestauranteService);
    controller = module.get<RestauranteController>(RestauranteController);
    restauranteRepository = module.get<Repository<RestauranteEntity>>(getRepositoryToken(RestauranteEntity));
    await seedDatabase();
  
  });

  
  const seedDatabase = async () => {
    restauranteRepository.clear();
    restaurantesList = [];
    const fec: string =  new Date("2018-03-16").toISOString()
    for(let i =0; i< 5; i++) {
      const restaurante: RestauranteEntity = await restauranteRepository.save({
        nombre: faker.lorem.words(), 
        michelin: 2, 
        fechaMichelin: fec
      })
      restaurantesList.push(restaurante);
    }
  }


  describe('findAll', () => {
    it('debe retornar un arreglo de restaurantes', async() => {
        const result = restaurantesList;
        jest.spyOn(service, 'findAll').mockResolvedValue(result);
        expect(await controller.findAll()).toBe(result);
    });
});

    describe('findOne', () => {
        it('debe retornar un restaurante', async() => {
            const result = restaurantesList[0];
            jest.spyOn(service, 'findOne').mockResolvedValue(result);
            expect(await controller.findOne('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });        
});


});
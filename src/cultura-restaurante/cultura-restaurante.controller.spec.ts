import { Test, TestingModule } from '@nestjs/testing';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { CulturaRestauranteService } from './cultura-restaurante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { PaisEntity } from '../pais/pais.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { CulturagastronomicaController } from '../culturagastronomica/culturagastronomica.controller';
import { CulturaRestauranteController } from './cultura-restaurante.controller';

describe('CulturaRestauranteService', () => {
  let service: CulturaRestauranteService;
  let controller: CulturaRestauranteController;
  let culturaRepository: Repository<CulturaGastronomicaEntity>;
  let restauranteRepository: Repository<RestauranteEntity>;
  let culturaList: CulturaGastronomicaEntity[];
  let restaurantesList: RestauranteEntity[];
  let culturagastronomica: CulturaGastronomicaEntity;
  let paisesList: PaisEntity[];
  let recetasList: RecetaEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CulturaRestauranteService, CulturaRestauranteController],
    }).compile();
    service = module.get<CulturaRestauranteService>(CulturaRestauranteService);
    controller = module.get<CulturaRestauranteController>(CulturaRestauranteController);
    culturaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
    restauranteRepository = module.get<Repository<RestauranteEntity>>(getRepositoryToken(RestauranteEntity));
    await seeDatabase();
  
  });


  const seeDatabase = async () => {
    culturaRepository.clear();
    restauranteRepository.clear();

    restaurantesList = [];
    const ciudad = new CiudadEntity();
    ciudad.nombre= faker.address.city()

    const fec: string =  new Date("2018-03-16").toISOString()
    for(let i =0; i< 5; i++) {
      const restaurante: RestauranteEntity = await restauranteRepository.save({
        nombre: faker.lorem.words(), 
        michelin: 2, 
        fechaMichelin: fec
      })
      restaurantesList.push(restaurante);
      
    }


    const region = new RegionEntity();
    region.nombre = faker.commerce.productName();
    paisesList:  paisesList = []; 
    recetasList: recetasList= [];
    culturagastronomica = await culturaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: recetasList,
      restaurantes: restaurantesList,
      paises: paisesList,
    })
  }

  describe('findRestauranteFromCultura', () => {
    it('findRestauranteByCulturaIdRestauranteId debe retornar un restaurante de una cultura gastronomica', async() => {
        const result = restaurantesList[0];
        jest.spyOn(service, 'findRestauranteByCulturaIdRestauranteId').mockResolvedValue(result);
        expect(await controller.findRestauranteByCulturaIdAProductoId('d3645100-59ab-11ed-9f7e-c578b8de1b93','d3645100-59ab-11ed-9f7e-c578b8de1b90')).toBe(result);
    });        
    });


    describe('findRestaurantesFromCultura', () => {
        it('findRestauranteByCulturaId debe retornar un restaurante de una cultura gastronomica', async() => {
            const result = restaurantesList;
            jest.spyOn(service, 'findRestaurantesByCulturaId').mockResolvedValue(result);
            expect(await controller.findRestaurantesFromCultura('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });        
        });


 








});

import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { faker } from '@faker-js/faker';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RegionEntity } from '../region/region.entity';
import { ProductoController } from './producto.controller';

describe('ProductoService', () => {
  let service: ProductoService;
  let controller: ProductoController
  let repository: Repository<ProductoEntity>;
  let productosList: ProductoEntity[]
  let culturaGastronomicaData = new CulturaGastronomicaEntity();
  let regionData = new RegionEntity();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoService, ProductoController],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    controller = module.get<ProductoController>(ProductoController);
    repository = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity));
    await seedDatabase();  
  });

  const seedDatabase = async () => {
      repository.clear();
      productosList = [];
     
      for(let i = 0; i < 5; i++){
            const producto: ProductoEntity = await repository.save({
                    nombre: faker.company.name(),
                    descripcion: faker.commerce.productDescription(),
                     })
                    productosList.push(producto);
         }

         culturaGastronomicaData.nombre = faker.company.name();
         culturaGastronomicaData.descripcion = faker.commerce.productDescription();
         culturaGastronomicaData.region= regionData;
         culturaGastronomicaData.recetas= [];
         culturaGastronomicaData.paises= [];
         culturaGastronomicaData.productos = productosList;
   }

   describe('findAll', () => {
        it('debe retornar un arreglo de productos', async() => {
            const result = productosList;
            jest.spyOn(service, 'findAll').mockResolvedValue(result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('debe retornar una receta', async() => {
            const result = productosList[0];
            jest.spyOn(service, 'findOne').mockResolvedValue(result);
            expect(await controller.findOne('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });        
    });


});

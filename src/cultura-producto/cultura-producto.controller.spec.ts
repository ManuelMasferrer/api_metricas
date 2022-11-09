import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CulturaProductoService } from './cultura-producto.service';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { PaisEntity } from '../pais/pais.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { RegionEntity } from '../region/region.entity';
import { CulturaProductoController } from './cultura-producto.controller';

describe('CulturaProductoController', () => {
  let service: CulturaProductoService;
  let controller: CulturaProductoController;
  let culturaRepository: Repository<CulturaGastronomicaEntity>;
  let productoRepository: Repository<ProductoEntity>;
  let productosList = [];
  let restaurantesList: RestauranteEntity[];
  let culturagastronomica: CulturaGastronomicaEntity;
  let paisesList: PaisEntity[];
  let recetasList: RecetaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CulturaProductoService, CulturaProductoController],
    }).compile();
    service = module.get<CulturaProductoService>(CulturaProductoService);
    controller = module.get<CulturaProductoController>(CulturaProductoController);
    culturaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
    productoRepository = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity));
    await seedDatabase();
  
  });

  const seedDatabase = async () => {
    culturaRepository.clear();
    productoRepository.clear();

    productosList = [];
    const categoria= new CategoriaproductoEntity();
    categoria.nombre = faker.commerce.productAdjective();


    for(let i =0; i< 5; i++) {
      const producto: ProductoEntity = await productoRepository.save({
        nombre: faker.lorem.words(), 
        descripcion: faker.lorem.words()
      })
      productosList.push(producto);
      
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
        productos: productosList
      })
    }
  }

  describe('findAll', () => {
    it('debe retornar un arreglo de productos asociadas a una cultura', async() => {
        const result = culturagastronomica.productos;
        jest.spyOn(service, 'findProductosByCulturaId').mockResolvedValue(result);
        expect(await controller.findProductosFromCultura('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });
    });

    describe('findProductoFromCultura', () => {
        it('debe retornar un producto asociado a una cultura', async() => {
            const result = productosList[0];
            jest.spyOn(service, 'findProductoByCulturaIdProductoId').mockResolvedValue(result);
            expect(await controller.findProductoByCulturaIdAProductoId('d3645100-59ab-11ed-9f7e-c578b8de1b93','d3645100-59ab-11ed-9f7e-c578b8de1b90')).toBe(result);
        });        
    });


});

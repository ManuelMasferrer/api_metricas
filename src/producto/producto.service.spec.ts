import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { faker } from '@faker-js/faker';
import { CulturaGastronomicaEntity } from 'src/culturagastronomica/culturagastronomica.entity';
import { CategoriaproductoEntity } from 'src/categoriaproducto/categoriaproducto.entity';

describe('ProductoService', () => {
  let service: ProductoService;
  let repository: Repository<ProductoEntity>;
  let productosList: ProductoEntity[]


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    repository = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity));
    await seedDatabase();  
  });

  const seedDatabase = async () => {
    repository.clear();
    productosList = [];
    const categoria = new CategoriaproductoEntity();
    categoria.nombre = faker.commerce.productName();
    const culturaGastronomica = new CulturaGastronomicaEntity();
    culturaGastronomica.nombre = faker.commerce.department();
    for(let i = 0; i < 5; i++){
        /*const producto: ProductoEntity = await repository.save({
          nombre: faker.company.name(),
          descripcion: faker.commerce.productDescription(),
          categoria: categoria,
          culturaGastronomica: culturaGastronomica })
      productosList.push(producto);
        */    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

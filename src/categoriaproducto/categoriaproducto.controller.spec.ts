import { faker } from "@faker-js/faker";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaproductoService } from './categoriaproducto.service';
import { CategoriaproductoEntity } from './categoriaproducto.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { Repository } from "typeorm/repository/Repository";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { CategoriaproductoController } from './categoriaproducto.controller';


describe('CategoriaproductoService', () => {
  let service: CategoriaproductoService;
  let repository: Repository<CategoriaproductoEntity>;
  let controller: CategoriaproductoController;
  let CategoriaproductoList: CategoriaproductoEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CategoriaproductoService, CategoriaproductoController],
    }).compile();

    service = module.get<CategoriaproductoService>(CategoriaproductoService);
    controller = module.get<CategoriaproductoController>(CategoriaproductoController);
    repository = module.get<Repository<CategoriaproductoEntity>>(getRepositoryToken(CategoriaproductoEntity));
    await seedDatabase();

  });


  const seedDatabase = async () =>{
    repository.clear();
    CategoriaproductoList = [];
    const producto = new ProductoEntity();
    
    for(let i = 0; i < 5; i++){
      const Categoriaproducto: CategoriaproductoEntity = await repository.save({
            nombre: faker.address.country()            
        })
        CategoriaproductoList.push(Categoriaproducto);
    }
    producto.nombre = faker.commerce.productName();
    producto.descripcion = faker.commerce.productDescription();
        
}
describe('findAll', () => {
    it('debe retornar un arreglo de paises', async() => {
        const result = CategoriaproductoList;
        jest.spyOn(service, 'findAll').mockResolvedValue(result);
        expect(await controller.findAll()).toBe(result);
    });
});

describe('findOne', () => {
    it('debe retornar una receta', async() => {
        const result = CategoriaproductoList[0];
        jest.spyOn(service, 'findOne').mockResolvedValue(result);
        expect(await controller.findOne('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
    });        
});


});


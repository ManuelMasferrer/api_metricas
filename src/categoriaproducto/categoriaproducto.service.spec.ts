import { faker } from "@faker-js/faker";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaproductoService } from '../categoriaproducto/categoriaproducto.service';
import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity';
import { ProductoService } from '../producto/producto.service';
import { ProductoEntity } from '../producto/producto.entity';

import { Repository } from "typeorm/repository/Repository";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";


describe('CategoriaproductoService', () => {
  let service: CategoriaproductoService;
  let repository: Repository<CategoriaproductoEntity>;
  let CategoriaproductoList: CategoriaproductoEntity[];


  beforeEach(async () => {
    repository.clear();
    
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CategoriaproductoService],
    }).compile();

    service = module.get<CategoriaproductoService>(CategoriaproductoService);
    repository = module.get<Repository<CategoriaproductoEntity>>(getRepositoryToken(CategoriaproductoEntity));
    await seeDatabase();

  });


  const seeDatabase = async () =>{
    repository.clear();
    CategoriaproductoList = [];
    const producto = new ProductoEntity();
    producto.nombre = faker.commerce.productName();
    
    for(let i = 0; i < 5; i++){

      const Categoriaproducto: CategoriaproductoEntity = await repository.save({
            nombre: faker.address.country()
        })
        CategoriaproductoEntity.push(Categoriaproducto);
        
    }
    producto.nombre = faker.company.name();
    producto.descripcion = faker.commerce.productDescription();
        
}

    it('debe ser definido', () =>{
    expect(service).toBeDefined();
    });

    it('findAll debe retornar todas las categorias', async () =>{
        const categorias: CategoriaproductoEntity[] = await service.findAll();
        expect(categorias).not.toBeNull();
        expect(categorias).toHaveLength(CategoriaproductoList.length);
    });

    it('findOne debe retornar una categorias por id', async () => {
        const storedCulturaGastronomica: CulturaGastronomicaEntity = CategoriaproductoList[0];
        const categorias: CategoriaproductoEntity = await service.findOne(storedCulturaGastronomica.categorias.id);
        expect(categorias).not.toBeNull;
        expect(categorias.nombre).toEqual(storedCulturaGastronomica.nombre)
    });

    it('findOne lanzar excepcion para una categorias invalida', async () => {
        await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "La categorias con el id no a sido encontrada")
    });

 
    it('update actualizacion invalida dado a una categorias invalida', async () => {
        let categorias: CategoriaproductoEntity = CategoriaproductoList[0].categorias;
        categorias = {
          ...categorias, nombre: "New name"
        }
        await expect(() => service.update("0", categorias)).rejects.toHaveProperty("message", "La categorias con el id no a sido encontrada")
      });

    it('delete fallido por una categorias invalida', async () => {
        const categorias: CategoriaproductoEntity = CategoriaproductoList[0].categorias;
        await service.delete(categorias.id);
        await expect(() => service.delete("0")).rejects.toHaveProperty("message", "La categorias con el id no a sido encontrada")
    });
});

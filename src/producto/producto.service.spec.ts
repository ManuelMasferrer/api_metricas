import { Test, TestingModule } from '@nestjs/testing';
import { QueryFailedError, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { faker } from '@faker-js/faker';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity';

describe('ProductoService', () => {
  let service: ProductoService;
  let repository: Repository<ProductoEntity>;
  let productosList: ProductoEntity[]
  let productoData = new ProductoEntity();
  let categoriaData = new CategoriaproductoEntity();
  let culturaGastronomicaData = new CulturaGastronomicaEntity();


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    repository = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity));
    // await seedDatabase();  
  });

  // const seedDatabase = async () => {
  // repository.clear();
  //   productosList = [];
     
  //   const culturaGastronomica = new CulturaGastronomicaEntity();
  //   const categoria = new CategoriaproductoEntity();
  //   categoria.nombre = faker.commerce.productAdjective();
  //   culturaGastronomica.nombre = faker.commerce.department();
  //   culturaGastronomica.descripcion = faker.commerce.productDescription();
  //   for(let i = 0; i < 5; i++){
  //       const producto: ProductoEntity = await repository.save({
  //         nombre: faker.company.name(),
  //         descripcion: faker.commerce.productDescription(),
  //         categoria: categoria,
  //         culturaGastronomica: culturaGastronomica,
  //         categoriaProducto: categoria })
  //         productosList.push(producto);
  //       }
  // }

//   const loadData = async () =>{

//     categoriaData.nombre = faker.commerce.productName();
//     culturaGastronomicaData.nombre = faker.company.name();
//     culturaGastronomicaData.descripcion = faker.commerce.productDescription();
// }

  it('el servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  // it('findAll deberia retornar todos los productos', async () => {
  //   const productos: ProductoEntity[] = await service.findAll();
  //   expect(productos).not.toBeNull();
  //   expect(productos).toHaveLength(productosList.length);
  // });

  // it('findOne deberia retornar un producto por id', async () => {
  //   const storedProducto: ProductoEntity = productosList[0];
  //   const producto: ProductoEntity = await service.findOne(storedProducto.id);
  //   expect(producto).not.toBeNull();
  //   expect(producto.nombre).toEqual(storedProducto.nombre)
  //   expect(producto.descripcion).toEqual(storedProducto.descripcion)
  //   expect(producto.culturaGastronomica).toEqual(storedProducto.culturaGastronomica)
  //   expect(producto.categoria).toEqual(storedProducto.categoria)
  // });

  // it('findOne should throw an exception for an invalid producto', async () => {
  //   await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "El producto con el id dado no fue encontrado")
  // });

  // it('Crear un producto nuevo', async () => {
  //     await loadData();
  //     const newProducto: ProductoEntity = await service.create(productoData);
  //     expect(newProducto).not.toBeNull();

  //     const producto:ProductoEntity = await service.findOne(newProducto.id);
  //     expect(producto).not.toBeNull;
  //     expect(producto.nombre).toEqual(newProducto.nombre)
  //     expect(producto.descripcion).toEqual(newProducto.descripcion)
  // });

  // it('Actualizar o modificar un producto', async ()=> {
  //   const producto: ProductoEntity = productosList[0];
  //   producto.nombre = "Nuevo nombre";
  //   producto.descripcion = "Nueva descripcion";
  //   const updatedProducto: ProductoEntity = await service.update(producto.id, producto);
  //   expect(updatedProducto).not.toBeNull();
  //   const storedProducto: ProductoEntity = await repository.findOne({ where: { id: producto.id } })
  //   expect(storedProducto).not.toBeNull();
  //   expect(storedProducto.nombre).toEqual(storedProducto.nombre)
  //   expect(storedProducto.descripcion).toEqual(storedProducto.descripcion)
  // });

  // it('update actualizacion invalida dado a un producto invalido', async () => {
  //   let producto: ProductoEntity = productosList[0];
  //   producto = {
  //     ...producto, nombre: "New name", descripcion: "New address"
  //   }
  //   await expect(() => service.update("0", producto)).rejects.toHaveProperty("message", "El producto con el id no ha sido encontrado")
  // });

  // it('delete eliminar un producto', async () => {
  // const producto: ProductoEntity = productosList[0];
  // await service.delete(producto.id);
  // const deletedProducto: ProductoEntity = await repository.findOne({ where: { id: producto.id } })
  // expect(deletedProducto).toBeNull();
  // });

  // it('delete fallido por un producto invalid', async () => {
  //   const producto: ProductoEntity = productosList[0];
  //   await service.delete(producto.id);
  //   await expect(() => service.delete("0")).rejects.toHaveProperty("message", "El producto con el id no ha sido encontrado")
  // });
  

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});

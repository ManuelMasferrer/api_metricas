import { Test, TestingModule } from '@nestjs/testing';
import { CulturaRecetaService } from './cultura-receta.service';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';
import { PaisEntity } from '../pais/pais.entity';

describe('CulturaRecetaService', () => {
  let service: CulturaRecetaService;
  let culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>;
  let recetaRepository: Repository<RecetaEntity>;
  let culturagastronomica: CulturaGastronomicaEntity;
  let recetasList: RecetaEntity[];
  let paisesList: PaisEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CulturaRecetaService],
    }).compile();

    service = module.get<CulturaRecetaService>(CulturaRecetaService);
    culturaGastronomicaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
    recetaRepository = module.get<Repository<RecetaEntity>>(getRepositoryToken(RecetaEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    recetaRepository.clear();
    culturaGastronomicaRepository.clear();

    recetasList = [];
    for(let i =0; i< 5; i++) {
      const receta: RecetaEntity = await recetaRepository.save({
        nombre: faker.lorem.words(), 
        descripcion: faker.lorem.sentence(), 
        foto: faker.image.imageUrl(),
        preparacion: faker.lorem.sentence(), 
        video: faker.internet.url()
      })
      recetasList.push(receta);
      
    }

    const region = new RegionEntity();
    region.nombre = faker.commerce.productName();  
    paisesList:  paisesList = [];
    culturagastronomica = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: recetasList,
      paises: paisesList,
    })
  }

  it('el servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('addRecetaCultura debe agregar una receta a una cultura', async () => {
    const newReceta: RecetaEntity = await recetaRepository.save({
      nombre: faker.lorem.words(), 
      descripcion: faker.lorem.sentence(),
      foto: faker.image.imageUrl(),
      preparacion: faker.lorem.paragraph(),
      video: faker.image.imageUrl()
    });

    const newCulturaGastronomica: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
    })

    const resultado: CulturaGastronomicaEntity = await service.addRecetaCultura(newCulturaGastronomica.id, newReceta.id);

    expect(resultado.recetas.length).toBe(1);
    expect(resultado.recetas[0]).not.toBeNull();
    expect(resultado.recetas[0].nombre).toBe(newReceta.nombre);
    expect(resultado.recetas[0].descripcion).toBe(newReceta.descripcion);
    expect(resultado.recetas[0].foto).toBe(newReceta.foto);
    expect(resultado.recetas[0].preparacion).toBe(newReceta.preparacion);
    expect(resultado.recetas[0].video).toBe(newReceta.video);

  });



  it('addRecetaCultura debe producir una excepcion para una receta invalida', async () => {
    const newCulturaGastronomica: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
    })
  
    await expect(() => service.addRecetaCultura(newCulturaGastronomica.id, "0")).rejects.toHaveProperty("message", "La receta con el id proporcionado no ha sido encontrada");
  });

  it('addRecetaCultura debe producir una excepcion para una cultura gastronomica invalida', async () => {
    const newReceta: RecetaEntity = await recetaRepository.save({
      nombre: faker.lorem.words(), 
      descripcion: faker.lorem.sentence(),
      foto: faker.image.imageUrl(),
      preparacion: faker.lorem.paragraph(),
      video: faker.image.imageUrl()
    });

    await expect (() => service.addRecetaCultura("0", newReceta.id)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada");
  });

  it('findRecetaByCulturaIdRecetaId debe retornar una receta de una cultura gastronomica', async () => {
    const receta: RecetaEntity = recetasList[0];
    const storedReceta: RecetaEntity = await service.findRecetaByCulturaIdRecetaId(culturagastronomica.id, receta.id, )
    expect(storedReceta).not.toBeNull();
    expect(storedReceta.nombre).toBe(receta.nombre);
    expect(storedReceta.descripcion).toBe(receta.descripcion);
    expect(storedReceta.foto).toBe(receta.foto);
    expect(storedReceta.preparacion).toBe(receta.preparacion);
    expect(storedReceta.video).toBe(receta.video);
  });

  it('findRecetaByCulturaIdRecetaId debe arrojar una excepcion para una receta invalida', async () => {
    await expect(()=> service.findRecetaByCulturaIdRecetaId(culturagastronomica.id, "0")).rejects.toHaveProperty("message", "La receta con el id proporcionado no ha sido encontrada"); 
  });

  it('findRecetaByCulturaIdRecetaIdshould debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    const receta: RecetaEntity = recetasList[0];
    await expect(()=> service.findRecetaByCulturaIdRecetaId("0", receta.id)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('findRecetaByCulturaIdRecetaId should debe arrojar una excepcion para una receta no asociada a una cultura gastronomica', async () => {
    const newReceta: RecetaEntity = await recetaRepository.save({
      nombre: faker.lorem.words(), 
      descripcion: faker.lorem.sentence(),
      foto: faker.image.imageUrl(),
      preparacion: faker.lorem.paragraph(),
      video: faker.image.imageUrl()
    });

    await expect(()=> service.findRecetaByCulturaIdRecetaId(culturagastronomica.id, newReceta.id)).rejects.toHaveProperty("message", "La receta con el id proporcionado no esta asociada a la cultura gastronomica"); 
  });

  it('findRecetasByCulturaId debe retornar las recetas de una cultura gastronomica', async ()=>{
    const recetas: RecetaEntity[] = await service.findRecetasByCulturaId(culturagastronomica.id);
    expect(recetas.length).toBe(5)
  });

  it('findRecetasByCulturaId debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    await expect(()=> service.findRecetasByCulturaId("0")).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('associateRecetaCultura debe actualizar la lista de recetas de una cultura gastronomica', async () => {
    const newReceta: RecetaEntity = await recetaRepository.save({
      nombre: faker.lorem.words(), 
      descripcion: faker.lorem.sentence(),
      foto: faker.image.imageUrl(),
      preparacion: faker.lorem.paragraph(),
      video: faker.image.imageUrl()
    });

    const updatedCulturaGastronomica: CulturaGastronomicaEntity = await service.associateRecetaCultura(culturagastronomica.id, [newReceta]);
    expect(updatedCulturaGastronomica.recetas.length).toBe(1);

    expect(updatedCulturaGastronomica.recetas[0].nombre).toBe(newReceta.nombre);
    expect(updatedCulturaGastronomica.recetas[0].descripcion).toBe(newReceta.descripcion);
    expect(updatedCulturaGastronomica.recetas[0].foto).toBe(newReceta.foto);
    expect(updatedCulturaGastronomica.recetas[0].preparacion).toBe(newReceta.preparacion);
    expect(updatedCulturaGastronomica.recetas[0].video).toBe(newReceta.video);
  });

  it('associateRecetaCultura debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    const newReceta: RecetaEntity = await recetaRepository.save({
      nombre: faker.lorem.words(), 
      descripcion: faker.lorem.sentence(),
      foto: faker.image.imageUrl(),
      preparacion: faker.lorem.paragraph(),
      video: faker.image.imageUrl()
    });

    await expect(()=> service.associateRecetaCultura("0", [newReceta])).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('associateArtworksMuseum should throw an exception for an invalid artwork', async () => {
    const newReceta: RecetaEntity = recetasList[0];
    newReceta.id = "0";

    await expect(()=> service.associateRecetaCultura(culturagastronomica.id, [newReceta])).rejects.toHaveProperty("message", "La receta con el id proporcionado no ha sido encontrada"); 
  });

  it('deleteRecetaToCultura debe eliminar una receta de una cultura gastronomica', async () => {
    const receta: RecetaEntity = recetasList[0];
    
    await service.deleteRecetaToCultura(culturagastronomica.id, receta.id);

    const storedCulturaGastronomica: CulturaGastronomicaEntity = await culturaGastronomicaRepository.findOne({where: {id: culturagastronomica.id}, relations: ["recetas"]});
    const deletedReceta: RecetaEntity = storedCulturaGastronomica.recetas.find(a => a.id === receta.id);

    expect(deletedReceta).toBeUndefined();

  });

  it('deleteRecetaToCultura debe arrojar una excepcion para una receta invalida', async () => {
    await expect(()=> service.deleteRecetaToCultura(culturagastronomica.id, "0")).rejects.toHaveProperty("message", "La receta con el id proporcionado no ha sido encontrada"); 
  });

  it('deleteRecetaToCultura debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    const receta: RecetaEntity = recetasList[0];
    await expect(()=> service.deleteRecetaToCultura("0", receta.id)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('deleteRecetaToCultura debe arrojar una excepcion para una receta no asociada a una cultura gastronomica', async () => {
    const newReceta: RecetaEntity = await recetaRepository.save({
      nombre: faker.lorem.words(), 
      descripcion: faker.lorem.sentence(),
      foto: faker.image.imageUrl(),
      preparacion: faker.lorem.paragraph(),
      video: faker.image.imageUrl()
    });

    await expect(()=> service.deleteRecetaToCultura(culturagastronomica.id, newReceta.id)).rejects.toHaveProperty("message", "La receta con el id proporcionado no esta asociada a la cultura gastronomica"); 
  }); 

});
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';
import { PaisEntity } from '../pais/pais.entity';
import { PaisCulturaService } from './pais-cultura.service';

describe('PaisCulturaService', () => {
  let service: PaisCulturaService;
  let culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>;
  let paisRepository: Repository<PaisEntity>;
  let culturasList: CulturaGastronomicaEntity[];
  let recetasList: RecetaEntity[];
  let paisesList: PaisEntity[];
  let pais: PaisEntity;
  let region: RegionEntity;
  let culturagastronomica: CulturaGastronomicaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PaisCulturaService],
    }).compile();

    service = module.get<PaisCulturaService>(PaisCulturaService);
    culturaGastronomicaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
    paisRepository = module.get<Repository<PaisEntity>>(getRepositoryToken(PaisEntity));
  
    await seedDatabase();
  });


  const seedDatabase = async () => {
    paisRepository.clear();
    culturaGastronomicaRepository.clear();

    culturasList = [];
    const region = new RegionEntity();
    region.nombre = faker.commerce.productName();

    for(let i = 0; i < 5; i++){
      const cultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
          nombre: faker.company.name(),
          descripcion: faker.commerce.productDescription(),
          region: region,
          recetas: [],
          paises: [],
      })
      culturasList.push(cultura);
    }  
    
    paisesList = [];
    for(let i =0; i< 5; i++) {
      const pais: PaisEntity = await paisRepository.save({
        nombre: faker.address.country(),
        culturasgastronomicas: culturasList,
      })
      paisesList.push(pais);
    }

  pais = await paisRepository.save({
    nombre: faker.address.country(),
    culturasgastronomicas: culturasList,
  })

}

  it('el servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  
  it('addCulturaToPais debe agregar una cultura gastronomica a un pais', async () => {
    const newCultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: [],
      paises: [],
    });

    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country(),
      culturasgastronomicas: [],
    })

    const resultado: PaisEntity = await service.addCulturaToPais(newPais.id, newCultura.id);

    expect(resultado.culturasgastronomicas.length).toBe(1);
    expect(resultado.culturasgastronomicas[0]).not.toBeNull();
    expect(resultado.culturasgastronomicas[0].nombre).toBe(newCultura.nombre);

  });


  it('addCulturaToPais debe producir una excepcion para un pais invalido', async () => {
    const newCulturaGastronomica: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
    })
  
    await expect(() => service.addCulturaToPais("0", newCulturaGastronomica.id)).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado");
  });

  it('addCulturaToPais debe producir una excepcion para una cultura gastronomica invalida', async () => {
    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country(),
      culturasgastronomicas: [],
    });

    await expect (() => service.addCulturaToPais(newPais.id, "0")).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada");
  });

  it('findCulturaByPais debe retornar una cultura gastronomica de un pais', async () => {
    const culturagastronomica: CulturaGastronomicaEntity = culturasList[0];
    const storedCultura: CulturaGastronomicaEntity = await service.findCulturaByPais(culturagastronomica.id, pais.id )
    expect(storedCultura).not.toBeNull();
    expect(storedCultura.nombre).toBe(culturagastronomica.nombre);
    expect(storedCultura.descripcion).toBe(culturagastronomica.descripcion);
  });

  it('findCulturaByPais debe arrojar una excepcion para una cultura invalida', async () => {
    await expect(()=> service.findCulturaByPais("0", pais.id)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('findCulturaByPais debe arrojar una excepcion para un pais invalido', async () => {
    const culturagastronomica: CulturaGastronomicaEntity = culturasList[0];
    await expect(()=> service.findCulturaByPais(culturagastronomica.id, "0")).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado"); 
  });

  it('findCulturaByPais debe arrojar una excepcion para una cultura gastronomica no asociada a un pais', async () => {
    const newCultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: [],
      paises: [],
    });

    await expect(()=> service.findCulturaByPais(newCultura.id, pais.id)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no esta asociada al pais"); 
  });

  it('findCulturasByPais debe retornar las culturas gastronomicas de un pais', async ()=>{
    const culturas: CulturaGastronomicaEntity[] = await service.findCulturasByPais(pais.id);
    expect(culturas.length).toBe(5)
  });

  it('findCulturasByPaisdebe arrojar una excepcion para un pais invalido', async () => {
    await expect(()=> service.findCulturasByPais("0")).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado"); 
  });

  it('updateCulturasFromPais debe actualizar la lista de culturas gastronomicas de un pais', async () => {
    const newCultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: [],
      paises: [],
    });

    const updatedPais: PaisEntity = await service.updateCulturasFromPais(pais.id, [newCultura]);
    expect(updatedPais.culturasgastronomicas.length).toBe(1);

    expect(updatedPais.culturasgastronomicas[0].nombre).toBe(newCultura.nombre);
    expect(updatedPais.culturasgastronomicas[0].descripcion).toBe(newCultura.descripcion);

  });

  it('updateCulturasFromPais debe arrojar una excepcion para un pais invalido', async () => {
    const newCultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
      region: region,
      recetas: [],
      paises: [],
    });

    await expect(()=> service.updateCulturasFromPais("0", [newCultura])).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado"); 
  });

  it('updateCulturasFromPais debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    const newCultura: CulturaGastronomicaEntity = culturasList[0];
    newCultura.id = "0";

    await expect(()=> service.updateCulturasFromPais(pais.id, [newCultura])).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('deleteCulturaFromPais debe eliminar una cultura gastronomica de un pais', async () => {
    const culturagastronomica: CulturaGastronomicaEntity = culturasList[0];
    
    await service.deleteCulturaFromPais(culturagastronomica.id, pais.id);

    const storedPais: PaisEntity = await paisRepository.findOne({where: {id: pais.id}, relations: ["culturasgastronomicas"]});
    const deletedCultura: CulturaGastronomicaEntity = storedPais.culturasgastronomicas.find(a => a.id === culturagastronomica.id);

    expect(deletedCultura).toBeUndefined();

  });

  it('deleteCulturaFromPais debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    await expect(()=> service.deleteCulturaFromPais("0", pais.id)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('deleteCulturaFromPais debe arrojar una excepcion para un pais invalido', async () => {
    const culturagastronomica: CulturaGastronomicaEntity = culturasList[0];
    await expect(()=> service.deleteCulturaFromPais(culturagastronomica.id, "0")).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado"); 
  });


});
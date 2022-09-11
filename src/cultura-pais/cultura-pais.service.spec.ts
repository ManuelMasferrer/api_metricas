import { Test, TestingModule } from '@nestjs/testing';
import { CulturaPaisService } from './cultura-pais.service';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';
import { PaisEntity } from '../pais/pais.entity';

describe('CulturaPaisService', () => {
  let service: CulturaPaisService;
  let culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>;
  let paisRepository: Repository<PaisEntity>;
  let culturasList: CulturaGastronomicaEntity[];
  let recetasList: RecetaEntity[];
  let paisesList: PaisEntity[];
  let region: RegionEntity;
  let culturagastronomica: CulturaGastronomicaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CulturaPaisService],
    }).compile();

    service = module.get<CulturaPaisService>(CulturaPaisService);
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
      })
      paisesList.push(pais);
    }  

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

  it('addCulturaGastronomicaPais debe agregar una cultura gastronomica a un pais', async () => {
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

    const resultado: CulturaGastronomicaEntity = await service.addCulturaGastronomicaPais(newCultura.id, newPais.id);

    expect(resultado.paises.length).toBe(1);
    expect(resultado.paises[0]).not.toBeNull();
    expect(resultado.paises[0].nombre).toBe(newPais.nombre);

  });

  it('addCulturaGastronomicaPais debe producir una excepcion para un pais invalido', async () => {
    const newCulturaGastronomica: CulturaGastronomicaEntity = await culturaGastronomicaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.commerce.productDescription(),
    })
  
    await expect(() => service.addCulturaGastronomicaPais(newCulturaGastronomica.id, "0")).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado");
  });

  it('addCulturaGastronomicaPais debe producir una excepcion para una cultura gastronomica invalida', async () => {
    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country(),
      culturasgastronomicas: [],
    });

    await expect (() => service.addCulturaGastronomicaPais("0", newPais.id,)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada");
  });
  
  it('findPaisbyCulturaId debe retornar un pais de una cultura gastronomica', async () => {
    const pais: PaisEntity = paisesList[0];
    const storedPais: PaisEntity = await service.findPaisbyCulturaId(pais.id, culturagastronomica.id,  )
    expect(storedPais).not.toBeNull();
    expect(storedPais.nombre).toBe(pais.nombre);
  });

  it('findPaisbyCulturaId debe arrojar una excepcion para una cultura invalida', async () => {
    const pais: PaisEntity = paisesList[0];
    await expect(()=> service.findPaisbyCulturaId(pais.id, "0")).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('findPaisbyCulturaId debe arrojar una excepcion para un pais invalido', async () => {

    await expect(()=> service.findPaisbyCulturaId("0", culturagastronomica.id)).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado"); 
  });

  it('findPaisbyCulturaId debe arrojar una excepcion para un pais no asociado a una cultura gastronomica', async () => {
    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country(),
      culturasgastronomicas: [],
    });

    await expect(()=> service.findPaisbyCulturaId(newPais.id, culturagastronomica.id)).rejects.toHaveProperty("message", "El pais con el id proporcionado no esta asociado a la cultura gastronomica"); 
  });

  it('findPaisesByCulturaId debe retornar los paises de una cultura gastronomicas', async ()=>{
    const paises: PaisEntity[] = await service.findPaisesByCulturaId(culturagastronomica.id);
    expect(paises.length).toBe(5)
  });

  it('findPaisesByCulturaId debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    await expect(()=> service.findPaisesByCulturaId("0")).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });


  it('associateCulturaPais debe actualizar la lista de paises de una cultura gastronomica', async () => {
    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country(),
      culturasgastronomicas: [],
    });

    const updatedCultura: CulturaGastronomicaEntity = await service.associateCulturaPais(culturagastronomica.id, newPais);
    expect(updatedCultura.paises.length).toBe(6);

    expect(updatedCultura.paises[5].nombre).toBe(newPais.nombre);

  });

  it('associateCulturaPais debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country(),
      culturasgastronomicas: [],
    });

    await expect(()=> service.associateCulturaPais("0", newPais)).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });

  it('updateCulturasFromPais debe arrojar una excepcion para un pais invalido', async () => {
    const newPais: PaisEntity = await paisRepository.save({
      nombre: faker.address.country()
    });
    newPais.id = "0";

    await expect(()=> service.associateCulturaPais(culturagastronomica.id, newPais)).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado"); 
  });  

  it('deletePaisToCultura debe eliminar un pais de una cultura gastronomica', async () => {
    const pais: PaisEntity = paisesList[0];
    
    await service.deletePaisToCultura(pais.id, culturagastronomica.id);

    const storedCultura: CulturaGastronomicaEntity = await culturaGastronomicaRepository.findOne({where: {id: culturagastronomica.id}, relations: ["paises"]});
    const deletedPais: PaisEntity = storedCultura.paises.find(a => a.id === pais.id);

    expect(deletedPais).toBeUndefined();

  });

  it('deletePaisToCultura  debe arrojar una excepcion para un pais invalido', async () => {
    await expect(()=> service.deletePaisToCultura("0", culturagastronomica.id)).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado"); 
  });

  it('deletePaisToCultura  debe arrojar una excepcion para una cultura gastronomica invalida', async () => {
    const pais: PaisEntity = paisesList[0];
    await expect(()=> service.deletePaisToCultura(pais.id, "0")).rejects.toHaveProperty("message", "La cultura gastronomica con el id proporcionado no ha sido encontrada"); 
  });


});
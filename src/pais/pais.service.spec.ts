import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CulturaGastronomicaEntity } from "../culturagastronomica/culturagastronomica.entity";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { Repository } from "typeorm/repository/Repository";
import { RegionEntity } from "../region/region.entity";
import { RegionService } from "../region/region.service";
import { RecetaEntity } from '../receta/receta.entity';
import { PaisEntity } from './pais.entity';
import { PaisService } from "./pais.service";

describe('PaisService', () => {
    let service: PaisService;
    let repository: Repository<PaisEntity>;
    let paisesList: PaisEntity[];
    let culturaList: CulturaGastronomicaEntity[];
    let recetasList: RecetaEntity[];
    let regionData = new RegionEntity();
    let culturaGastronomicaData = new CulturaGastronomicaEntity();
    let recetaData =new RecetaEntity();


    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [PaisService],
        }).compile();

        service = module.get<PaisService>(PaisService);
        repository = module.get<Repository<PaisEntity>>(getRepositoryToken(PaisEntity));
        await seeDatabase();
    });

    const seeDatabase = async () =>{
        repository.clear();
        paisesList = [];
        culturaList = [];
        recetasList = [];
        const region = new RegionEntity();
        region.nombre = faker.commerce.productName();
        
        for(let i = 0; i < 5; i++){
            // const cultura: CulturaGastronomicaEntity = await repository.save({
            //     nombre: faker.company.name(),
            //     descripcion: faker.commerce.productDescription(),
            //     region: region,
            //     recetas: [],
            //     paises: []
            // })
            const pais: PaisEntity = await repository.save({
                nombre: faker.address.country()
            })
            paisesList.push(pais);
            
        }
        culturaGastronomicaData.nombre = faker.company.name();
        culturaGastronomicaData.descripcion = faker.commerce.productDescription();
        culturaGastronomicaData.region= regionData;
        culturaGastronomicaData.recetas= [];
        culturaGastronomicaData.paises= [];
    }

    
    it('el servicio debe estar definido', () =>{
        expect(service).toBeDefined();
    });

    it('findAll debe retornar todos los paises', async () =>{
        const paises: PaisEntity[] = await service.findAll();
        expect(paises).not.toBeNull();
        expect(paises).toHaveLength(paisesList.length);
    });

    it('findOne debe retornar un pais por id', async () => {
        const storedPais: PaisEntity = paisesList[0];
        const pais: PaisEntity = await service.finOne(storedPais.id);
        expect(pais).not.toBeNull;
        expect(pais.nombre).toEqual(storedPais.nombre)
    });

    it('findOne lanzar excepcion para un pais invalido', async () => {
        await expect(() => service.finOne("0")).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado")
    });

    it('Actualizar o modificar un pais', async ()=> {
        const pais: PaisEntity = paisesList[0];
        pais.nombre = "Nuevo nombre";
        const updatedPais: PaisEntity = await service.update(pais.id, pais);
        expect(updatedPais).not.toBeNull();
        const storedPais: PaisEntity = await repository.findOne({ where: { id: pais.id } })
        expect(storedPais).not.toBeNull();
        expect(storedPais.nombre).toEqual(pais.nombre)
        
    });
    
    it('update arroja una excepcion para un pais invalido', async () => {
        let pais: PaisEntity = paisesList[0];
        pais = {
          ...pais, nombre: "New name"
        }
        await expect(() => service.update("0", pais)).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado")
      });
    
    it('delete debe eliminar un pais', async () => {
        const pais: PaisEntity = paisesList[0];
        await service.delete(pais.id);
      
        const deletedPais: PaisEntity = await repository.findOne({ where: { id: pais.id } })
        expect(deletedPais).toBeNull();
      });
    

    it('delete arroja una excepcion para un pais invalido', async () => {
         const pais: PaisEntity = paisesList[0];
         await service.delete(pais.id);
         await expect(() => service.delete("0")).rejects.toHaveProperty("message", "El pais con el id proporcionado no ha sido encontrado")
     });
});
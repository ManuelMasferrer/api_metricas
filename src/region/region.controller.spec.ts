import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CulturaGastronomicaEntity } from "../culturagastronomica/culturagastronomica.entity";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { Repository } from "typeorm/repository/Repository";
import { RegionEntity } from "./region.entity";
import { RegionService } from "./region.service";
import { RegionController } from './region.controller';

describe('RegionService', () => {
    let service: RegionService;
    let controller: RegionController;
    let repository: Repository<RegionEntity>;
    let culturaList: CulturaGastronomicaEntity[];
    let regionData = new RegionEntity();
    let culturaGastronomicaData = new CulturaGastronomicaEntity();

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [RegionService, RegionController],
        }).compile();

        service = module.get<RegionService>(RegionService);
        controller = module.get<RegionController>(RegionController);
        repository = module.get<Repository<RegionEntity>>(getRepositoryToken(RegionEntity));
        await seeDatabase();
    });

    const seeDatabase = async () =>{
        repository.clear();
        culturaList = [];
        const region = new RegionEntity();
        region.nombre = faker.commerce.productName();
        
        for(let i = 0; i < 5; i++){
            const cultura: CulturaGastronomicaEntity = await repository.save({
                nombre: faker.company.name(),
                descripcion: faker.commerce.productDescription(),
                region: region,
                recetas: [],
                paises: [],
                productos: [],
                restaurantes: []
            })
            culturaList.push(cultura);
            
        }
    }

    const loadData = async () =>{

        regionData.nombre = faker.commerce.productName();
        culturaGastronomicaData.nombre = faker.company.name();
        culturaGastronomicaData.descripcion = faker.commerce.productDescription();
        culturaGastronomicaData.region= regionData;
        regionData.culturagastronomica = culturaGastronomicaData;
    }

    describe('findAll', () => {
        it('debe retornar un arreglo de regiones', async() => {
            const result = [regionData];
            jest.spyOn(service, 'findAll').mockResolvedValue(result);
            expect(await controller.findAll()).toBe(result);
        });
    });
    
        describe('findOne', () => {
            it('debe retornar un restaurante', async() => {
                const result = regionData;
                jest.spyOn(service, 'findOne').mockResolvedValue(result);
                expect(await controller.findOne('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
            });        
    });

});
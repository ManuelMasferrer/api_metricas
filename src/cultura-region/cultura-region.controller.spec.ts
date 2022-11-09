import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { CulturaGastronomicaEntity } from "../culturagastronomica/culturagastronomica.entity";
import { RegionEntity } from "../region/region.entity";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { Repository } from "typeorm";
import { CulturaRegionService } from "./cultura-region.service";
import { CulturaRegionController } from './cultura-region.controller';

describe('CulturaRegionController', () => {
    let service: CulturaRegionService;
    let controller: CulturaRegionController
    let culturaRepository: Repository<CulturaGastronomicaEntity>;
    let regionRepository: Repository<RegionEntity>;
    let region: RegionEntity;
    let culturagastronomica: CulturaGastronomicaEntity;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [CulturaRegionService, CulturaRegionController]
        }).compile();
        service = module.get<CulturaRegionService>(CulturaRegionService);
        controller = module.get<CulturaRegionController>(CulturaRegionController);
        culturaRepository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
        regionRepository = module.get<Repository<RegionEntity>>(getRepositoryToken(RegionEntity));
        await seedDatabase();
    });

    const seedDatabase = async () => {
        culturaRepository.clear();
        regionRepository.clear();
        region = await regionRepository.save({
            nombre: faker.address.country()
        })
        culturagastronomica = await culturaRepository.save({
            nombre: faker.company.name(),
            descripcion: faker.commerce.productDescription(),
            region: region,
            recetas: [],
            paises: []
          })
    }
    
    describe('findRegionPorCultura', () => {
        it('debe retornar una region asociadas a una cultura', async() => {
            const result = region;
            jest.spyOn(service, 'findRegionPorCulturaId').mockResolvedValue(region);
            expect(await controller.findRegionPorCulturaId('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });
    });
    
    describe('findCulturaPorRegion', () => {
        it('debe retornar una cultura asociada a una region', async() => {
            const result = culturagastronomica;
            jest.spyOn(service, 'findCulturaPorRegionId').mockResolvedValue(result);
            expect(await controller.findCulturaPorRegionId('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });        
    });


});
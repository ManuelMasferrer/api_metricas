import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from './culturagastronomica.entity';
import { CulturagastronomicaService } from './culturagastronomica.service';
import { CulturagastronomicaController } from './culturagastronomica.controller';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';




describe('RecetaController', () =>{
    let controller: CulturagastronomicaController;
    let service: CulturagastronomicaService;
    let culturasList: CulturaGastronomicaEntity[];
    let repository: Repository<CulturaGastronomicaEntity>;

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [CulturagastronomicaService, CulturagastronomicaController],
          }).compile();

        service = module.get<CulturagastronomicaService>(CulturagastronomicaService);
        controller = module.get<CulturagastronomicaController>(CulturagastronomicaController);
        repository = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));
        await seedDatabase();


    });

    const seedDatabase = async () =>{
        repository.clear();
        culturasList = [];
        const region = new RegionEntity();
        region.nombre = faker.commerce.productName();
        
        for(let i = 0; i < 5; i++){
            const culturaGastronomicaData: CulturaGastronomicaEntity = await repository.save({
                nombre: faker.company.name(),
                descripcion: faker.commerce.productDescription(),
                region: region,
                recetas: [],
                paises: []
            })
            culturasList.push(culturaGastronomicaData);
            
        }

    }

    describe('findAll', () => {
        it('debe retornar un arreglo de culturas', async() => {
            const result = culturasList;
            jest.spyOn(service, 'findAll').mockResolvedValue(result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('debe retornar una receta', async() => {
            const result = culturasList[0];
            jest.spyOn(service, 'finOne').mockResolvedValue(result);
            expect(await controller.findOne('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });        
    });


});
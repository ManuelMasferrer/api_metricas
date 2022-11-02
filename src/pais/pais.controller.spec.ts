import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { Repository } from "typeorm";
import { PaisController } from './pais.controller';
import { PaisEntity } from "./pais.entity";
import { PaisService } from './pais.service';


describe('PaisController', () =>{
    let controller: PaisController;
    let service: PaisService;
    let paisesList: PaisEntity[];
    let repository: Repository<PaisEntity>;

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [PaisService, PaisController],
          }).compile();

        service = module.get<PaisService>(PaisService);
        controller = module.get<PaisController>(PaisController);
        repository = module.get<Repository<PaisEntity>>(getRepositoryToken(PaisEntity));
        await seedDatabase();


    });

    const seedDatabase = async () =>{
        repository.clear();
        paisesList = [];
        
        for(let i = 0; i < 5; i++){
            const pais: PaisEntity = await repository.save({
                nombre: faker.address.country()
            })
            paisesList.push(pais);
            
        }
    }

    describe('findAll', () => {
        it('debe retornar un arreglo de paises', async() => {
            const result = paisesList;
            jest.spyOn(service, 'findAll').mockResolvedValue(result);
            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('debe retornar un pais', async() => {
            const result = paisesList[0];
            jest.spyOn(service, 'findOne').mockResolvedValue(result);
            expect(await controller.findOne('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });        
    });

    

});
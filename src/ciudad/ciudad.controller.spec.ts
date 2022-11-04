import { faker } from "@faker-js/faker";
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from "@nestjs/typeorm";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { CiudadService } from '../ciudad/ciudad.service';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CiudadController } from '../ciudad/ciudad.controller';
import { Repository } from "typeorm/repository/Repository";
import { RestauranteEntity } from "../restaurante/restaurante.entity";


describe('CiudadController', () =>{
    let controller: CiudadController;
    let service: CiudadService;
    let ciudadesList: CiudadEntity[];
    let restaurantesList: RestauranteEntity[];
    let repository: Repository<CiudadEntity>;

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [CiudadService, CiudadController],
          }).compile();

        service = module.get<CiudadService>(CiudadService);
        controller = module.get<CiudadController>(CiudadController);
        repository = module.get<Repository<CiudadEntity>>(getRepositoryToken(CiudadEntity));
        await seedDatabase();


    });

    const seedDatabase = async () =>{
        repository.clear();
        ciudadesList = [];
        restaurantesList = []

        
        for(let i = 0; i < 5; i++){
  
          const Ciudad: CiudadEntity = await repository.save({
                nombre: faker.address.cityName(),
                restaurantes: restaurantesList,
            })
            ciudadesList.push(Ciudad);
        }
    };

    // describe('findAll', () => {
    //     it('debe retornar un arreglo de ciudades', async() => {
    //         const result = ciudadesList;
    //         jest.spyOn(service, 'findAll').mockResolvedValue(result);
    //         expect(await controller.findAll()).toBe(result);
    //     });
    // });

    describe('findOne', () => {
        it('debe retornar una ciudad', async() => {
            const result = ciudadesList[0];
            jest.spyOn(service, 'findOne').mockResolvedValue(result);
            expect(await controller.findOne('d3645100-59ab-11ed-9f7e-c578b8de1b93')).toBe(result);
        });        
    });

    

});
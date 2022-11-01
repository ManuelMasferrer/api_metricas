import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { Repository } from "typeorm";
import { RecetaController } from './receta.controller';
import { RecetaEntity } from "./receta.entity";
import { RecetaService } from './receta.service';


describe('RecetaController', () =>{
    let recetaController: RecetaController;
    let recetaService: RecetaService;
    let recetasList: RecetaEntity[];
    let repository: Repository<RecetaEntity>;

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [RecetaService, RecetaController],
          }).compile();

        recetaService = module.get<RecetaService>(RecetaService);
        recetaController = module.get<RecetaController>(RecetaController);
        repository = module.get<Repository<RecetaEntity>>(getRepositoryToken(RecetaEntity));
        await seedDatabase();


    });

    const seedDatabase = async () => {
        repository.clear();
        recetasList = [];
        for(let i = 0; i < 5; i++){
            const receta: RecetaEntity = await repository.save({
            nombre: faker.lorem.words(), 
            descripcion: faker.lorem.sentence(), 
            foto: faker.image.imageUrl(),
            preparacion: faker.lorem.sentence(), 
            video: faker.internet.url()})
            recetasList.push(receta);
        }
    }

    describe('findAll', () => {
        it('debe retornar un arreglo de recetas', async() => {
            const result = recetasList;
            jest.spyOn(recetaService, 'findAll').mockResolvedValue(result);
            expect(await recetaController.findAll()).toBe(result);
        });
    });

});
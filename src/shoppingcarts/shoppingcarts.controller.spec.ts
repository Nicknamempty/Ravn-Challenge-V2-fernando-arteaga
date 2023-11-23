import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingcartsController } from './shoppingcarts.controller';
import { ShoppingcartsService } from './shoppingcarts.service';

describe('ShoppingcartsController', () => {
  let controller: ShoppingcartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingcartsController],
      providers: [ShoppingcartsService],
    }).compile();

    controller = module.get<ShoppingcartsController>(ShoppingcartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

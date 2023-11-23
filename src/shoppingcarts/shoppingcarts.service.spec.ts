import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingcartsService } from './shoppingcarts.service';

describe('ShoppingcartsService', () => {
  let service: ShoppingcartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingcartsService],
    }).compile();

    service = module.get<ShoppingcartsService>(ShoppingcartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Product } from '../../models/product';
import { ProductType } from '../../types/types';

const product = new Product();

describe('Model Product functions tests', () => {
  it('Test createProduct Method in different ways', async () => {
    const result: ProductType = await product.createProduct({
      name: 'OPPO',
      category: 'Mobile',
      price: 5000,
    });
    expect(result).toBeInstanceOf(Object);
  });

  it('Test showProduct Method in different', async () => {
    const result: ProductType = await product.showProduct(1);
    expect(result.name).toEqual('OPPO');
    expect(result.name).not.toEqual('IPHONE');
    expect(result.category).toEqual('Mobile');
    expect(result.category).not.toEqual('Car');
    expect(result.price).toEqual(5000);
    expect(result.price).not.toEqual(6000);
    expect(result).toBeInstanceOf(Object);
  });

  it('Test showProductsInCategory Method in different', async () => {
    const result: ProductType[] = await product.showProductsInCategory(
      'Mobile'
    );
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([
      {
        id: 1,
        name: 'OPPO',
        category: 'Mobile',
        price: 5000,
      },
    ]);
  });

  it('Test index Method return', async () => {
    const result: ProductType[] = await product.index();
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([
      {
        id: 1,
        name: 'OPPO',
        category: 'Mobile',
        price: 5000,
      },
    ]);
  });

  it('Test showProduct Method in different', async () => {
    const result: ProductType = await product.showProduct(10000);
    expect(result).toBeUndefined();
  });

  it('Test updateProduct Method in different ways', async () => {
    const result: ProductType = await product.updateProduct(1, {
      name: 'Samsung',
      category: 'Mobile',
      price: 5000,
    });
    expect(result.name).toEqual('Samsung');
    expect(result.name).not.toEqual('OPPO');
    expect(result).toBeInstanceOf(Object);
  });

  it('Method createProduct should be defined and create user correctly', () => {
    expect(product.createProduct).toBeDefined();
  });
  it('Method updateProduct should be defined and update user correctly', () => {
    expect(product.updateProduct).toBeDefined();
  });
  it('Method index should be defined and retrieve all products', () => {
    expect(product.index).toBeDefined();
  });
  it('Method showProduct should be defined and retrieve all products', () => {
    expect(product.showProduct).toBeDefined();
  });
});

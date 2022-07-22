import { Product } from '../models/product';
import { ProductType, ProductUpdatedType } from '../types/types';
import { Application, Request, Response } from 'express';
import { verifyToken } from './userHandler';

const productInstance = new Product();

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: ProductType = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
      category: req.body.category as unknown as string,
    };
    if (!productData.name || !productData.category || !productData.price) {
      res.status(400);
      res.send('Product Name, Category and Price are required');
      return;
    }
    const newProduct: ProductType = await productInstance.createProduct(
      productData
    );
    res.json({ product: newProduct });
  } catch (err) {
    res.status(400);
    res.json({ message: err });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const productData: ProductUpdatedType = {
      name: req.body.name as unknown as string,
      category: req.body.category as unknown as string,
      price: req.body.price as unknown as number,
    };
    if (!productData.name || !productData.category || !productData.price) {
      res.status(400);
      res.send('Product Name, Category and Price are required');
      return;
    }
    const updatedProduct: ProductUpdatedType =
      await productInstance.updateProduct(id, productData);
    res.json({ product: updatedProduct });
  } catch (err) {
    res.status(400);
    res.json({ message: err });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const products: ProductType[] = await productInstance.index();
    res.json(products);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const showProductsInCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category as unknown as string;
    const products: ProductType[] =
      await productInstance.showProductsInCategory(category);
    res.json({ products: products });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const showProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const product: ProductType = await productInstance.showProduct(id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    await productInstance.deleteProduct(id);
    res.send('Product has been deleted');
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const productRouter = (app: Application) => {
  app.post('/products/create', verifyToken, createProduct);
  app.put('/products/update/:id', verifyToken, updateProduct);
  app.get('/products', index);
  app.get('/products/category/:category', showProductsInCategory);
  app.get('/products/:id', showProduct);
  app.delete('/products/:id', verifyToken, deleteProduct);
};

export default productRouter;

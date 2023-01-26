import Product from '../models/product.model';

interface IProduct {
  in_stock: boolean;
  quantity: number;
  price: number;
  discount: number;
  tags: string[];
  type: 'product' | 'service';
  category: string;
  description: string;
  short_description: string;
  images: string[];
  quantity_sold: number;
  quantity_viewed: number;
  quantity_in_cart: number;
  quantity_in_wishlist: number;
  quantity_in_compare: number;
  brand: string;
  rating: number;
}

interface IProductService {
  create(resource: IProduct): Promise<any>;
  update(id: string, resource: IProduct): Promise<any>;
  delete(id: string): Promise<any>;
  get(id: string): Promise<any>;
  getAll(): Promise<any>;
  getProductsByCategory(category: string): Promise<any>;
  getProductsByCharacteristics(
    characteristics: 'brand' | 'price' | 'discount' | 'rating' | 'category',
    value: string
    ): Promise<any>;
}

class ProductService implements IProductService {
  async create(resource: IProduct) {
    try {
      return await Product.create(resource);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(id: string, resource: IProduct) {
    try {
      return await Product.findByIdAndUpdate(id, resource, { new: true })
        .orFail(new Error('Product not found'))
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string) {
    try {
      return await Product.findByIdAndDelete(id).orFail(new Error('Product not found'));
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async get(id: string) {
    try {
      return await Product.findById(id).orFail(new Error('Product not found'));
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      return await Product.find();
    } catch (error: any) {
      throw new Error(error);
    }
  } 

  async getProductsByCategory(category: string) {
    try {
     return await Product.find({ $where: `this.category == ${category}` }).orFail(new Error('No products found for this category'));
    } catch (error: any) {
      throw new Error(error);
    }
      
  }

  async getProductsByCharacteristics(characteristics: 'brand' | 'price' | 'discount' | 'rating' | 'category', value: string) {

    try {
      return await Product.find({ $where: `this.${characteristics} == ${value}` }).orFail(new Error('No products found for this category'));
    }
    catch (error: any) {
      throw new Error(error);
    }
  }
}
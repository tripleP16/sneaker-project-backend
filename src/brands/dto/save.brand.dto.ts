import { Category } from '../common/categories.enum';

export default interface SaveBrandDto {
  name: string;
  category: Category;
  _id: string;
}

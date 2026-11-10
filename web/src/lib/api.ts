import { blogPosts } from "@/data/blog-posts";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { schoolLists, schools } from "@/data/schools";
import type {
  BlogPost,
  Category,
  Curriculum,
  Product,
  Review,
  School,
  SchoolList,
  StockStatus,
} from "@/types";

export interface ProductQuery {
  categoryId?: string;
  curriculum?: Curriculum;
  grade?: string;
  subject?: string;
  stockStatus?: StockStatus;
  search?: string;
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  const search = query.search?.trim().toLocaleLowerCase();

  return products.filter((product) => {
    if (query.categoryId && product.categoryId !== query.categoryId) return false;
    if (query.curriculum && product.curriculum !== query.curriculum) return false;
    if (query.grade && product.grade !== query.grade) return false;
    if (query.subject && product.subject !== query.subject) return false;
    if (query.stockStatus && product.stockStatus !== query.stockStatus) return false;
    if (
      search &&
      !`${product.name} ${product.publisher} ${product.grade} ${product.subject}`
        .toLocaleLowerCase()
        .includes(search)
    ) {
      return false;
    }

    return true;
  });
}

export async function getProduct(idOrSlug: string): Promise<Product | undefined> {
  return products.find(
    (product) => product.id === idOrSlug || product.slug === idOrSlug,
  );
}

export async function getCategories(): Promise<Category[]> {
  return [...categories];
}

export async function getSchools(): Promise<School[]> {
  return [...schools];
}

export async function getSchool(id: string): Promise<School | undefined> {
  return schools.find((school) => school.id === id);
}

export async function getSchoolLists(schoolId?: string): Promise<SchoolList[]> {
  return schoolLists.filter(
    (schoolList) => !schoolId || schoolList.schoolId === schoolId,
  );
}

export async function getSchoolList(id: string): Promise<SchoolList | undefined> {
  return schoolLists.find((schoolList) => schoolList.id === id);
}

export async function getReviews(productId?: string): Promise<Review[]> {
  return reviews.filter((review) => !productId || review.productId === productId);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return [...blogPosts];
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find((post) => post.slug === slug);
}

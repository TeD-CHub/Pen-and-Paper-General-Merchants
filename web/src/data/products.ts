import type { Curriculum, Product, StockStatus } from "@/types";

const image = "/images/sample-product-placeholder.svg";
const publisher = "[SAMPLE PUBLISHER]";

const cbeSubjects = [
  ["English", "English Learner's Book"],
  ["Mathematics", "Mathematics Learner's Book"],
  ["Integrated Science", "Integrated Science Learner's Book"],
];

const cbeProducts: Product[] = Array.from({ length: 27 }, (_, index) => {
  const gradeNumber = Math.floor(index / cbeSubjects.length) + 1;
  const [subject, title] = cbeSubjects[index % cbeSubjects.length];
  const grade = `Grade ${gradeNumber}`;

  return {
    id: `cbe-${gradeNumber}-${subject.toLowerCase().replaceAll(" ", "-")}`,
    slug: `sample-${grade.toLowerCase().replace(" ", "-")}-${subject.toLowerCase().replaceAll(" ", "-")}`,
    name: `${title} - ${grade}`,
    description: `Sample ${subject.toLowerCase()} textbook listing for ${grade}. Confirm title, edition, and availability with the shop.`,
    categoryId: "textbooks",
    curriculum: "CBE",
    publisher,
    grade,
    subject,
    priceKsh: 650 + gradeNumber * 35 + (index % 3) * 20,
    stockStatus:
      index === 26
        ? "out-of-stock"
        : index % 8 === 0
          ? "low-stock"
          : "in-stock",
    image,
    isSample: true,
  };
});

const additionalTitles: Array<{
  curriculum: Exclude<Curriculum, "CBE" | "General">;
  grade: string;
  subject: string;
  title: string;
}> = [
  { curriculum: "Cambridge", grade: "Primary 1", subject: "English", title: "English Learner's Book" },
  { curriculum: "Cambridge", grade: "Primary 2", subject: "Mathematics", title: "Mathematics Coursebook" },
  { curriculum: "Cambridge", grade: "Primary 3", subject: "Science", title: "Science Learner's Book" },
  { curriculum: "Cambridge", grade: "Primary 4", subject: "English", title: "English Coursebook" },
  { curriculum: "Cambridge", grade: "Secondary 1", subject: "Mathematics", title: "Mathematics Student Book" },
  { curriculum: "Cambridge", grade: "Secondary 2", subject: "Science", title: "Science Student Book" },
  { curriculum: "Literature", grade: "Secondary", subject: "Literature", title: "Short Stories for Schools" },
  { curriculum: "Literature", grade: "Secondary", subject: "Literature", title: "Poetry Anthology for Schools" },
  { curriculum: "Literature", grade: "Secondary", subject: "Literature", title: "Drama Reader for Schools" },
  { curriculum: "Literature", grade: "Secondary", subject: "Literature", title: "Novel Study Guide" },
  { curriculum: "Literature", grade: "Secondary", subject: "Literature", title: "East African Stories Reader" },
  { curriculum: "Literature", grade: "Secondary", subject: "Literature", title: "Creative Writing Workbook" },
  { curriculum: "Literature", grade: "Secondary", subject: "Literature", title: "Reading and Comprehension Reader" },
];

const additionalProducts: Product[] = additionalTitles.map(
  ({ curriculum, grade, subject, title }, index) => ({
    id: `${curriculum.toLowerCase()}-${index + 1}`,
    slug: `sample-${curriculum.toLowerCase()}-${index + 1}`,
    name: `${title} - ${grade}`,
    description: `Sample ${curriculum} ${subject.toLowerCase()} listing for ${grade}. Confirm title, edition, and availability with the shop.`,
    categoryId: "textbooks",
    curriculum,
    publisher,
    grade,
    subject,
    priceKsh: 850 + index * 45,
    stockStatus: index % 5 === 0 ? "low-stock" : "in-stock",
    image,
    isSample: true,
  }),
);

export const products: Product[] = [...cbeProducts, ...additionalProducts];

export const stockStatuses: StockStatus[] = [
  "in-stock",
  "low-stock",
  "out-of-stock",
];

import type { School, SchoolList } from "@/types";

export const schools: School[] = [
  { id: "sample-school-1", name: "Sample School 1", location: "Nairobi", isSample: true },
  { id: "sample-school-2", name: "Sample School 2", location: "Nairobi", isSample: true },
  { id: "sample-school-3", name: "Sample School 3", location: "Kiambu", isSample: true },
  { id: "sample-school-4", name: "Sample School 4", location: "Mombasa", isSample: true },
  { id: "sample-school-5", name: "Sample School 5", location: "Nakuru", isSample: true },
  { id: "sample-school-6", name: "Sample School 6", location: "Kisumu", isSample: true },
];

export const schoolLists: SchoolList[] = schools.map((school, index) => ({
  id: `sample-list-${index + 1}`,
  schoolId: school.id,
  name: `${school.name} - Grade ${index + 1} sample list`,
  grade: `Grade ${index + 1}`,
  academicYear: "2026 (sample)",
  items: [
    { productId: `cbe-${index + 1}-english`, quantity: 1 },
    { productId: `cbe-${index + 1}-mathematics`, quantity: 1 },
    { productId: `cbe-${index + 1}-integrated-science`, quantity: 1 },
  ],
  isSample: true,
}));

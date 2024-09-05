//dummy data
export const notes = [
  {
    id: "0",
    title: "Html",
    body: "HyperText MarkUp Language",
    category: "Lavoro",
    date_edit: new Date(2024, 7, 13, 13, 4),
    date_create: new Date(2024, 7, 8, 17, 20)
  },
  {
    id: "1",
    title: "CSS",
    body: "StyleSheet",
    category: "Studio",
    date_edit: new Date(2024, 8, 2, 15, 47),
    date_create: new Date(2024, 4, 21, 22, 17)
  },
  {
    id: "2",
    title: "JavaScript",
    body: "Scripting language for web",
    category: "Lavoro",
    date_edit: new Date(2024, 1, 15, 14, 58),
    date_create: new Date(2024, 1, 15, 14, 58)
  },
  {
    id: "3",
    title: "React",
    body: "JavaScript framework",
    category: "Studio",
    date_edit: new Date(2024, 6, 25, 21, 35),
    date_create: new Date(2023, 10, 27, 9, 45)
  },
  {
    id: "4",
    title: "Titolo lungo più di 25 caratteri",
    body: "Nota con un titolo molto lungo, più di 25 caratteri, quindi viene tagliato nell'anteprima. Nota con un titolo molto lungo, più di 25 caratteri, quindi viene tagliato nell'anteprima. Nota con un titolo molto lungo, più di 25 caratteri, quindi viene tagliato nell'anteprima. Nota con un titolo molto lungo, più di 25 caratteri, quindi viene tagliato nell'anteprima. Nota con un titolo molto lungo, più di 25 caratteri, quindi viene tagliato nell'anteprima.",
    category: "Altro",
    date_edit: new Date(2024, 8, 5, 16, 29),
    date_create: new Date(2024, 7, 27, 9, 45)
  },
  {
    id: "5",
    title: "Bellissima nota",
    body: "Lorem ipsum non me lo ricordo, quindi ciao",
    category: "Hobby",
    date_edit: new Date(2024, 2, 16, 9, 52),
    date_create: new Date(2022, 11, 20, 16, 3)
  },
  {
    id: "6",
    title: "Ancora un'altra nota",
    body: "Scrivo scrivo, ma cosa scrivo, ciao. Neve neve neve, addio.",
    category: "Hobby",
    date_edit: new Date(2023, 11, 3, 14, 18),
    date_create: new Date(2023, 9, 5, 23, 15)
  }
];

export const categories = [
  {
    name: "Lavoro"
  },
  {
    name: "Studio"
  },
  {
    name: "Hobby"
  },
  {
    name: "Altro"
  }
]
import { ICharacters } from "@/interfaces/characters";

export const charactersMock: ICharacters = {
  data: {
    results: [
      {
        id: 1011334,
        name: "3-D Man",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
          extension: "jpg",
        },
        description: "lorem ipsum dolor sit amet, consectetur adip"
      },
      {
        id: 1011335,
        name: "Hulk",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
          extension: "jpg",
        },
        description: "lorem ipsum dolor sit amet, consectetur adip 2"
      },
    ],
  },
  pagination: 3,
  setPagination: jest.fn(),
};

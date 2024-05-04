export class User {
    id: string;
    title: string;
    author: string;
    genre: string[] = [];
    completeChapter: boolean = false;
    ratings: number;
    
    constructor(id: string = '', title: string = '', author: string = '', ratings: number = 0, isCompleted: boolean = false, genres: string[] = []) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genres;
        this.completeChapter = isCompleted;
        this.ratings = ratings;
    }
  }
  export interface iUser {
      id: string;
      title: string;
      author: string;
      genre: string[]
      completeChapter: boolean;
      ratings: number;
  }
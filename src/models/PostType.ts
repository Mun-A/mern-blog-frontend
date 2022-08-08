import { UserType } from "./UserType";

export type PostType = {
    _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserType;
  imageUrl: string;
};

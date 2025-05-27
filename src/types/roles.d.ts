export enum EROLES {
  TEACHER = 2,
  STUDENT = 1,
}

export type IRoles = {
  [key in EROLES]: number;
};

import { DataSource } from "typeorm";
import { Course } from "./models/Course";
import { Lesson } from "./models/Lesson";
import { User } from "./models/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra: { ssl: false, rejectUnauthorized: false },
  synchronize: true,
  logging: true,
  entities: [User, Course, Lesson],
});

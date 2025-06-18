"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const port = 3000;
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get("/movies", async (_, res) => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      genres: true,
      languages: true
    }
  });
  res.json(movies);
});
app.post("/movies", async (req, res) => {
  const { title, genre_id, language_id, oscar_count, release_date } = req.body;
  try {
    await prisma.movie.create({
      data: {
        title,
        genre_id,
        language_id,
        oscar_count,
        release_date: new Date(release_date)
      }
    });
  }
  catch (erro) {
    console.error("Erro desconhecido ao cadastrar filme:", erro);
    return res.status(500).send({ message: "Falha ao cadastrar um filme" });
  }
  res.status(201).send();
});
app.listen(port, () => {
  console.log(`Servidor em execução na porta http://localhost:${port}`);
});

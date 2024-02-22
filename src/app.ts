import express from "express";
import services from "./services/services";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("/provincias", async (_req, res) => {
  const provincias = await services.getProvincias();
  res.status(200).json(provincias);
});

app.get("/provincias/:name", async (req, res) => {
  const { name } = req.params;
  const provincia = await services.getProvinciaByName(name);
  res.status(200).json(provincia);
});

app.get("/departamentos", async (_req, res) => {
  const departamentos = await services.getDepartaments();
  res.status(200).json(departamentos);
});

app.get("/departamentos/:provincia", async (req, res) => {
  const { provincia } = req.params;
  const departamentos = await services.getDepartamentByPronvince(provincia);
  res.status(200).json(departamentos);
});

export default app;

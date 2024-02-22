import { describe, test } from "node:test";
import asserts from "node:assert";
import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("getting provincies", () => {
  test("getting all", async () => {
    const response = await request.get("/provincias");
    asserts.equal(response.status, 200);
    asserts.ok(response.header["content-type"].includes("json"));
    asserts.ok("total" in response.body);
    asserts.ok(response.body.total > 0);
  });

  test("getting one province", async () => {
    const response = await request.get("/provincias/cordoba");
    asserts.equal(response.status, 200);
    asserts.ok(response.headers["content-type"].includes("json"));
    asserts.ok("total" in response.body);
    asserts.ok(response.body.total > 0);
  });
});

describe("errors in request provincies", () => {
  test("with invalid param", async () => {
    const response = await request.get("/provincias/noexiste");
    asserts.equal(response.statusCode, 200);
    asserts.ok(response.body.total === 0);
  });
});

describe("getting departments", () => {
  test("get all departments", async () => {
    const response = await request.get("/departamentos");
    asserts.equal(response.statusCode, 200);
    asserts.ok(response.body.total > 0);
  });

  test("get departaments by province", async () => {
    const response = await request.get("/departamentos/cordoba");
    asserts.equal(response.statusCode, 200);
    asserts.ok(response.body.total > 0);
  });

  test("get all departaments founded", async () => {
    const response = await request.get("/departamentos/cordoba");
    asserts.equal(response.status, 200);
    asserts.ok(response.body.total === response.body.cantidad);
  });
});

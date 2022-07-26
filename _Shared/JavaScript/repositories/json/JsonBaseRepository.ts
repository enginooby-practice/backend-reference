import fs from "fs";
import { IModel } from "../../models/base/IModel";
import { CrudRepository } from "../base/CrudRepository";

export class JsonBaseRepository<T extends IModel> extends CrudRepository<T> {
  protected readonly entities: Array<T> = [];

  constructor(jsonPath: string) {
    super();

    const dataJson = fs.readFileSync(jsonPath, 'utf-8');
    const data: Array<any> = JSON.parse(dataJson);
    data.forEach(entityObj => this.entities.push(entityObj));
  }

  async create(entity: T): Promise<T> {
    this.entities.push(entity);
    return await Promise.resolve(entity);
  }

  async getById(id: string): Promise<T> {
    return await Promise.resolve(this.entities.find(e => e.id == id) as T);
  }

  async getAll(): Promise<T[]> {
    return await Promise.resolve(this.entities);
  }

  async update(id: string, entity: T): Promise<boolean> {
    const oldEntity = await this.getById(id);

    if (oldEntity) {
      // keep keys that new entity missing from the old entity
      const properties = Object.keys(oldEntity);
      // @ts-ignore
      properties.forEach(prop => entity[prop] ??= oldEntity[prop])

      const index = this.entities.indexOf(oldEntity);
      this.entities[index] = entity;

      return Promise.resolve(true);
    }

    return Promise.reject(new Error("Entity not found."));
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i] === entity) {
        this.entities.splice(i, 1);
        return Promise.resolve(true);
      }
    }

    return Promise.reject(new Error("Entity not found."));
  }

  async deleteAll(): Promise<boolean> {
    this.entities.length = 0;

    return await Promise.resolve(true);
  }
}
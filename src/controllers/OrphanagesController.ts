import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanages";

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return res.json(orphanages);
  },

  async show(req: Request, res: Response) {
    console.log(req.params);
    const { id } = req.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.findOneOrFail(id);

    return res.json(orphanages);
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;

    console.log(req.body);
    try {
      const orphanagesRepository = getRepository(Orphanage);

      const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
      });

      await orphanagesRepository.save(orphanage);
      return res.status(201).send(orphanage);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }
};

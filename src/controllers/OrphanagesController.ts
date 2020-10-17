import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanagesView from "../views/orphanages_view";

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"]
    });

    return res.json(orphanagesView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    console.log(req.params);
    const { id } = req.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"]
    });

    return res.json(orphanagesView.render(orphanage));
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

      const reqImages = req.files as Express.Multer.File[];
      const images = reqImages.map(img => {
        return { path: img.filename };
      });

      const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images
      });

      await orphanagesRepository.save(orphanage);
      return res.status(201).send(orphanage);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }
};

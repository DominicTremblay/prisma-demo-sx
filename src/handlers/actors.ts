import prisma from '../../db';

export const getAllActors = async (req, res) => {
  const actors = await prisma.actor.findMany();

  res.json({ data: actors });
};

export const getActorById = async (req, res) => {
  const id = Number(req.params.id);

  const actor = await prisma.actor.findUnique({
    where: {
      id,
    },
  });
  res.json({ data: actor });
};

export const updateActor = async (req, res) => {
  const id = Number(req.params.id);

  const actor = await prisma.actor.update({
    where: {
      id,
    },
    data: req.body,
  });

  res.json({ data: actor });
};

export const deleteActor = async (req, res) => {
  const id = Number(req.params.id);

  const actor = await prisma.actor.delete({
    where: {
      id,
    },
  });

  res.json({ data: actor });
};

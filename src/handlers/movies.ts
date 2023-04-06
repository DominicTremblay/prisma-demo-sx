import prisma from '../../db';

export const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      casting: {
        select: {
          actor: true,
        },
      },
    },
  });

  res.json({ data: movies });
};

export const getMovieById = async (req, res) => {
  const id = Number(req.params.id);

  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      casting: true,
    },
  });
  res.json({ data: movie });
};

export const updateMovie = async (req, res) => {
  const id = Number(req.params.id);

  const movie = await prisma.movie.update({
    where: {
      id,
    },
    data: req.body,
  });

  res.json({ data: movie });
};

export const deleteMovie = async (req, res) => {
  const id = Number(req.params.id);

  const movie = await prisma.movie.delete({
    where: {
      id,
    },
  });

  res.json({ data: movie });
};

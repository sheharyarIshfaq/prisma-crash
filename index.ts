import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice123@gmail.com",
    },
  });

  console.log(user);
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
};

const createArticle = async () => {
  const article = await prisma.article.create({
    data: {
      title: "My first article",
      body: "This is the body of my first article",
      author: { connect: { id: 1 } },
    },
  });

  console.log(article);
};

const getAllArticles = async () => {
  const articles = await prisma.article.findMany({
    include: { author: true },
  });

  console.log(articles);
};

const createArticleAndUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob123@gmail.com",
      articles: {
        create: {
          title: "My first article",
          body: "This is the body of my first article",
        },
      },
    },
  });

  console.log(user);
};

const createArticleForUser = async (id: number) => {
  const article = await prisma.article.create({
    data: {
      title: "Another article",
      body: "This is the body of another article",
      author: { connect: { id } },
    },
  });

  console.log(article);
};

const getUsersArticles = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { articles: true },
  });

  console.log(`User: ${user?.name}, Email: ${user?.email}`);
  console.log(`Articles: ${user?.articles.length}`);
  user?.articles.forEach((article) => {
    console.log(`Title: ${article.title}, Body: ${article.body}`);
  });
};

const updateUser = async (id: number, valuesToUpdate: any) => {
  const user = await prisma.user.update({
    where: { id },
    data: valuesToUpdate,
  });

  console.log(user);
};

const removeArticle = async (id: number) => {
  const article = await prisma.article.delete({
    where: { id },
  });

  console.log(article);
};

const main = async () => {
  //   await createUser();
  //   await getAllUsers();
  //   await createArticle();
  //   await getAllArticles();
  //   await createArticleAndUser();
  //   await createArticleForUser(2);
  await getUsersArticles(2);
  //   await updateUser(2, { name: "Robert" });
  //   await removeArticle(2);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
async function fillDb() {
  await prisma.post.upsert({
    where: { postId: 1 },
    update: {},
    create: {
      likedByIds: [] as string[],
      type: 'text',
      status: 'posted',
      tags: ['wow'],
      title: 'TITLE',
      announcement: 'ANNOUNCE',
      text: 'NEWTEXTTTT',
      comments: {
        create: [
          {
            authorId: 'userr',
            text: 'commentepic'
          },
        ]
      },
      commentsQty: 1,
    }
  });
  console.info('Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })

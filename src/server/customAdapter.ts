import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { Award, type PrismaClient } from "@prisma/client"
import { type AdapterUser } from "next-auth/adapters"

const CustomAdapter = (client: PrismaClient) => {
  const adapter = PrismaAdapter(client);
  return {
    ...adapter,
    async createUser(user: Omit<AdapterUser, 'id'>) {
      const created = await client.user.create({
        data: user,
      })

      const count = await client.user.count();

      if (count <= 100) {
        await client.userBadge.create({
          data: {
            award: Award.FIRST_100_USER,
            userId: created.id,
          }
        });
      }

      if (count <= 1000 && count > 100) {
        await client.userBadge.create({
          data: {
            award: Award.FIRST_1000_USER,
            userId: created.id,
          }
        });
      }

      return created as AdapterUser;
    },
    
  }
}

export default CustomAdapter;

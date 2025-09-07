import Fastify from "fastify";
import { z } from "zod";

const server = Fastify();

// Root route
server.get("/", async () => {
  return { msg: "Hello from Fastify + TypeScript + Zod 🚀" };
});

// Sample POST route with Zod validation
server.post("/echo", async (request, reply) => {
  const schema = z.object({
    name: z.string(),
    age: z.number().min(1),
  });

  const result = schema.safeParse(request.body);
  if (!result.success) {
    reply.status(400).send(result.error.format());
    return;
  }

  return { received: result.data };
});

server.listen(
  { port: Number(process.env.PORT) || 3000, host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`✅ Server listening at ${address}`);
  }
);

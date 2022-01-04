//mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:3001/username", (req, res, ctx) => {
    const username = req.body;
    const available = username === "availableuser" ? true : false;
    return res(ctx.json({ available: available }));
  }),
];

import { z } from "zod";

const validate = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parseAsync(req.body);
    req.body = validatedData; // Ensure validated data is passed along
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({ success: false, message: err.errors[0].message });
    }
    next(err); // Pass any other errors
  }
};

export default validate;

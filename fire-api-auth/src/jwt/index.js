import jwt from "jsonwebtoken";

const defaultOptions = {
  expiresIn: "30d",
};

export const generate = async (userId) => {
  try {
    const payload = { id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, defaultOptions);

    return { error: false, token: token };
  } catch (error) {
    return { error };
  }
};

export const verify = async (token) => {
  return await new Promise((resolve) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        resolve({
          id: "",
        });
      resolve(decoded);
    })
  );
};

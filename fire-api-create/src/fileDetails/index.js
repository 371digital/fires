export const envFile = `PORT=4000
DB_URL=""        
`;

export const messagesIndexFile = `export default { };`;

export const modelsIndexFile = `export { };`;

export const indexFile = `import {
  FireApi,
  FireApiValidation,
  FireMongo,
  FireApiResponseMessage,
} from "371fire";

const { connect } = FireMongo(); 
        
class Api {
  async fire() {
    const port = process.env.PORT;
    const api = FireApi();
    api.builder.preRouteRun(FireApiValidation);
    api.builder.postRouteRun(FireApiResponseMessage().apiMiddleware);
    await connect({ connectionUrl: process.env.DB_URL });
    await api.builder.start({ port });
    console.log("API Started successfully http://localhost:" + port);
  }
}
        
export default new Api().fire;`;

export const exampleRouteMessageFile = `export default {
  BLOGS_GETTED: {
    tr: "Bütün bloglar başarı ile getirilmiştir.",
    en: "All blogs have been successfully retrieved.",
  },
  BLOG_GETTED: {
    tr: "Blog başarı ile getirilmiştir.",
    en: "Blog has been successfully retrieved.",
  },
  BLOG_CREATED: {
    tr: "Blog başarı ile oluşturulmuştur.",
    en: "Blog has been successfully created.",
  },
  BLOG_UPDATED: {
    tr: "Blog başarı ile güncellenmiştir.",
    en: "Blog has been successfully updated.",
  },
  BLOG_DELETED: {
    tr: "Blog başarı ile silinmiştir.",
    en: "Blog has been successfully deleted.",
  },
};`;

export const exampleRouteModelFile = `import { FireMongo } from "371fire";

const { Schema, model } = FireMongo();
        
const blogSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);
        
export default model("blogs", blogSchema);`;

export const exampleRouteModelIndexFile = `import Blog from "./blog";

export { Blog };`;

export const exampleRoutePostFile = `import { FireApi, FireValidation, FireApiResponseMessage } from "371fire";
import { Blog } from "models";
import messages from "messages";

const { createRoute } = FireApi();
const { success } = FireApiResponseMessage();
const validation = FireValidation();

const handler = async ({ body }) => {
  const blogData = await Blog(body);
  await blogData.save();
  return success(messages.BLOG_CREATED, { data: blogData });
};

export default createRoute(handler, {
  validation: {
    title: validation.string().minLength(2),
    description: validation.string().minLength(2),
  },
});
`;

export const exampleRouteGetFile = `import { FireApi, FireApiResponseMessage } from "371fire";
import { Blog } from "models";
import messages from "messages";

const { createRoute } = FireApi();
const { success } = FireApiResponseMessage();

const handler = async () => {
  const data = await Blog.find();
  return success(messages.BLOGS_GETTED, { data });
};

export default createRoute(handler, {});
`;

export const exampleRouteGetSingleFile = `import { FireApi, FireApiResponseMessage } from "371fire";
import { Blog } from "models";
import { idValidation } from "validationRules";
import messages from "messages";

const { createRoute } = FireApi();
const { success } = FireApiResponseMessage();

const handler = async ({ params }) => {
  const data = await Blog.findById(params.id);
  return success(messages.BLOG_GETTED, { data });
};

export default createRoute(handler, {
  validation: {
    id: idValidation,
  },
});          
`;

export const exampleRoutePatchFile = `import { FireApi, FireValidation, FireApiResponseMessage } from "371fire";
import { Blog } from "models";
import {
  idValidation,
} from "validationRules";
import messages from "messages";

const { createRoute } = FireApi();
const { success } = FireApiResponseMessage();
const validation = FireValidation();

const handler = async ({ body, params }) => {
  await Blog.findByIdAndUpdate(params.id, body);
  return success(messages.BLOG_UPDATED);
};

export default createRoute(handler, {
  validation: {
    id: idValidation,
    title: validation.string().minLength(2),
    description: validation.string().minLength(2),
  },
});
`;

export const exampleRouteDeleteFile = `import { FireApi, FireApiResponseMessage } from "371fire";
import { Blog } from "models";
import { idValidation } from "validationRules";
import messages from "messages";

const { success } = FireApiResponseMessage();
const { createRoute } = FireApi();

const handler = async ({ params }) => {
  await Blog.findOneAndDelete(params.id);
  return success(messages.BLOG_DELETED);
};

export default createRoute(handler, {
  validation: {
    id: idValidation,
  }
});          
`;

export const exampleRouteValidationRulesFile = `import { FireValidation, FireMongo } from "371fire";

const validation = FireValidation();
const mongoose = FireMongo();

export const idValidation = validation.string().customRule((value) => {
  return mongoose.isValidObjectId(value) || "Id must be a valid";
});`;

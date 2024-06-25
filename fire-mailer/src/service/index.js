import nodemailer from "nodemailer";
import fs from "fs";
import { VM } from "vm2";

class Service {
  constructor() {
    this.mailer = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  convertParams = ({ text, params }) => {
    const vm = new VM({
      timeout: 2000,
      sandbox: { params },
    });

    const evaluateExpression = (expression) => {
      const parts = expression.split("||").map((part) => part.trim());
      for (const part of parts) {
        try {
          const result = vm.run(`${part}`);
          if (result !== undefined) {
            return result;
          }
        } catch (error) {
          console.error("Evaluation error: ", error);
        }
      }
      return "";
    };

    return text.replace(/\{\{([^}]+)\}\}/g, (match, expression) =>
      evaluateExpression(expression)
    );
  };

  getHtmlFile = ({ path, params }) => {
    const convertedParams = {};
    Object.keys(params).forEach((key) => {
      if (typeof params[key] === "string") {
        convertedParams[key] = this.convertParams({
          text: params[key],
          params,
        });
      }
    });

    let fileContent = fs.readFileSync(path, "utf8");
    return this.convertParams({ params: convertedParams, text: fileContent });
  };

  send = async ({
    to,
    subject,
    text,
    htmlPath,
    htmlParams = {},
    fromName,
  } = {}) => {
    return await new Promise((resolve, reject) => {
      const html = this.getHtmlFile({
        path: htmlPath,
        params: htmlParams,
      });

      this.mailer.sendMail(
        {
          from: {
            name: fromName,
            address: process.env.MAIL,
          },
          to,
          subject,
          html,
          text,
        },
        (error, info) => {
          if (error) return reject(error);
          resolve(info);
        }
      );
    });
  };
}

export default Service;

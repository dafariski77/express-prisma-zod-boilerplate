import { inHTMLData } from "xss-filters";

export const clean = (data = "") => {
  let isObject = false;

  if (typeof data === "object") {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = inHTMLData(String(data)).trim();

  if (isObject) {
    data = JSON.parse(data);
  }

  return data;
};

const middleware = () => {
  return (req, res, next) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);
    next();
  };
};

export default middleware;

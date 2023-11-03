import { relations } from "drizzle-orm";
import posts from "./posts";
import terms from "./terms";
import postTerms from "./postTerms";

export default relations(postTerms, ({ many }) => ({
  term_id: many(terms),
  post_id: many(posts),
}));

import { Filter } from "~/models/card.server";

export const toFilter = (sp: URLSearchParams): Filter => {
  return {
    alignment: sp.getAll("alignment"),
    levels: sp.getAll("level"),
    subtypes: sp.getAll("subtype"),
    keywords: sp.getAll("keyword"),
    sort: sp.get("sort") ?? "level",
    costs: sp.getAll("cost"),
  };
};

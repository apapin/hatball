import { data } from "./cardData";
import * as R from "ramda";

type RawCard = {
  Id: string;
  InPool: string;
  Name: string;
  Cost: number;
  Level: number;
  Attack: number;
  Health: number;
  "Game Text": string;
  "Golden or regular": string;
  Type: string;
  Subtypes: string;
  Keywords: string;
};

type Card = {
  Id: string;
  InPool: string;
  Name: string;
  Cost: number;
  Level: number;
  Attack: number;
  Health: number;
  Type: string;
  "Game Text": string;
  "Golden or regular": string;
  Subtypes: string[];
  Keywords: string[];
};

export type Filter = {
  alignment: string[];
  levels: string[];
  subtypes: string[];
  keywords: string[];
  sort: string;
  costs: string[];
};

const sorters: Record<string, (list: Card[]) => Card[]> = {
  attack: R.sortBy((c: Card) => -c.Attack),
  health: R.sortBy((c: Card) => -c.Health),
  level: R.sortBy((c: Card) => c.Level),
  cost: R.sortBy((c: Card) => c.Cost),
  alignment: R.sortBy((c: Card) => {
    if (c.Subtypes.includes("Good")) {
      return -1;
    } else if (c.Subtypes.includes("Evil")) {
      return 1;
    } else {
      return 0;
    }
  }),
  subtype: R.sortBy((c: Card) => {
    return c.Subtypes.filter(
      (sb) => !["Good", "Evil", "Neutral"].includes(sb)
    )[0];
  }),
};

function toCharacters(rcs: RawCard[]): Card[] {
  return rcs.map((rc) => {
    let Subtypes = rc.Subtypes.split("-")
      .map((s) => s.trim())
      .filter((l) => l !== "");
    let Keywords = rc.Keywords.split("-")
      .map((s) => s.trim())
      .filter((l) => l !== "");
    if (!rc.Subtypes.includes("Evil") && !rc.Subtypes.includes("Good")) {
      Subtypes = [...Subtypes, "Neutral"];
    }
    return {
      ...rc,
      Subtypes,
      Keywords,
    };
  });
}

const filterBySubtype = (subtypes: string[]) => (c: Card) => {
  if (subtypes.length === 0) return true;
  return R.intersection(subtypes, c.Subtypes).length > 0;
};
const filterBySubtypeIntersection = (subtypes: string[]) => (c: Card) => {
  if (subtypes.length === 0) return true;
  return R.intersection(subtypes, c.Subtypes).length === subtypes.length;
};

const filterByKeyword = (keywords: string[]) => (c: Card) => {
  if (keywords.length === 0) return true;
  return R.intersection(keywords, c.Keywords).length === keywords.length;
};

const filterByLevels = (levels: string[]) => (c: Card) => {
  if (levels.length === 0) return true;
  return levels.map((level) => parseInt(level)).includes(c.Level);
};
const filterByCosts = (costs: string[]) => (c: Card) => {
  if (costs.length === 0) return true;
  return costs.map((cost) => parseInt(cost)).includes(c.Cost);
};

export async function getCharacters(filter: Filter): Promise<Card[]> {
  return sorters[filter.sort](
    toCharacters(data)
      .filter((c) => c.Type === "Character")
      .filter((c) => c["Golden or regular"] !== "Golden")
      .filter((c) => c.InPool === "TRUE")
      .filter(filterBySubtype(filter.alignment))
      .filter(filterByLevels(filter.levels))
      .filter(filterBySubtypeIntersection(filter.subtypes))
      .filter(filterByKeyword(filter.keywords))
  );
}

export async function getTreasures(filter: Filter): Promise<Card[]> {
  return sorters[filter.sort](
    toCharacters(data)
      .filter((c) => c.Type === "Treasure")
      .filter((c) => c["Golden or regular"] !== "Golden")
      .filter((c) => c.InPool === "TRUE")
      .filter(filterBySubtype(filter.alignment))
      .filter(filterByLevels(filter.levels))
      .filter(filterBySubtypeIntersection(filter.subtypes))
      .filter(filterByKeyword(filter.keywords))
  );
}

export async function getSpells(filter: Filter): Promise<Card[]> {
  return sorters[filter.sort](
    toCharacters(data)
      .filter((c) => c.Type === "Spell")
      .filter((c) => c["Golden or regular"] !== "Golden")
      .filter((c) => c.InPool === "TRUE")
      .filter(filterBySubtype(filter.alignment))
      .filter(filterByLevels(filter.levels))
      .filter(filterBySubtypeIntersection(filter.subtypes))
      .filter(filterByKeyword(filter.keywords))
      .filter(filterByCosts(filter.costs))
  );
}
export async function getHeroes(filter: Filter): Promise<Card[]> {
  return sorters[filter.sort](
    toCharacters(data)
      .filter((c) => c.Type === "Hero")
      .filter((c) => c["Golden or regular"] !== "Golden")
      .filter((c) => c.InPool === "TRUE")
      .filter(filterBySubtype(filter.alignment))
      .filter(filterByLevels(filter.levels))
      .filter(filterBySubtypeIntersection(filter.subtypes))
      .filter(filterByKeyword(filter.keywords))
  );
}

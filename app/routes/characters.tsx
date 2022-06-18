import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import * as R from "ramda";

import { getCharacters } from "~/models/card.server";
import { FilterForm } from "../components/FilterForm";
import { toFilter } from "../util/toFilter";
import { Header } from "../components/Header";
import { cardToImageURL } from "~/util/cardToImageURL";

export type LoaderData = {
  cards: Awaited<ReturnType<typeof getCharacters>>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const cards = await getCharacters(toFilter(url.searchParams));
  return json<LoaderData>({ cards });
};

export default function NotesPage() {
  const data = useLoaderData() as LoaderData;
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  const Subtypes = R.uniq(
    data.cards
      .flatMap((d) => d.Subtypes)
      .filter((d) => !["Good", "Neutral", "Evil"].includes(d))
  ).sort();

  const Keywords = R.uniq(data.cards.flatMap((d) => d.Keywords)).sort();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <main className="flex h-full bg-white">
        <div className="h-full w-60 bg-lightbg">
          <p className="px-4 pt-5 pb-10 text-slate-500">
            Showing {data.cards.length} cards.
          </p>
          {FilterForm(
            "CHARACTERS",
            submit,
            searchParams,
            data,
            Subtypes,
            Keywords
          )}
        </div>

        <div className="flex-1 overflow-auto bg-darkbg">
          <Header active="CHARACTERS" />
          <Outlet />
          <ol
            className="grid px-6 pt-6 pb-40"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))",
            }}
          >
            {data.cards.map((card) => (
              <li key={card.Id}>
                <img
                  className="cursor-pointer transition-transform hover:scale-125"
                  title={card.Name}
                  src={cardToImageURL(card)}
                />
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}

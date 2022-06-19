import { Form, SubmitFunction } from "@remix-run/react";
import { LoaderData } from "../routes/characters";
import { ObjectType } from "../util/utils";

export function FilterForm(
  objectType: ObjectType,
  submit: SubmitFunction,
  searchParams: URLSearchParams,
  data: LoaderData,
  Subtypes: string[],
  Keywords: string[]
) {
  if (objectType === "HEROES") {
    return <></>;
  }

  const possibleLevels =
    objectType === "TREASURES"
      ? ["2", "3", "4", "5", "6", "7"]
      : ["2", "3", "4", "5", "6"];

  return (
    <Form method="get" onChange={(e) => submit(e.currentTarget)}>
      {!["TREASURES"].includes(objectType) && (
        <div className="px-5 pb-4">
          Sort by
          <select
            name="sort"
            id="sort-select"
            className="mx-2 text-black"
            defaultValue={searchParams.get("sort") ?? "level"}
          >
            <option value="level">Level</option>
            {objectType === "SPELLS" && <option value="cost">Cost</option>}
            {objectType === "CHARACTERS" && (
              <option value="attack">Attack</option>
            )}
            {objectType === "CHARACTERS" && (
              <option value="health">Health</option>
            )}
            {objectType === "CHARACTERS" && (
              <option value="alignment">Alignment</option>
            )}
            {<option value="subtype">Subtype</option>}
          </select>
        </div>
      )}
      <div className="px-5">
        <h2 className="pb-2 text-xl">Level</h2>
        {possibleLevels.map((level) => (
          <p className="space flex w-full content-center px-1" key={level}>
            <input
              type="checkbox"
              id={"level-" + level}
              name="level"
              value={level}
              defaultChecked={searchParams.getAll("level").includes(level)}
              className="my-auto hidden cursor-pointer"
            />
            <label htmlFor={"level-" + level} className="cursor-pointer pr-2">
              <div
                className={`flex h-5 w-5 rounded-full ${
                  searchParams.getAll("level").includes(level)
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                }`}
              >
                <span
                  className="mx-auto font-bold"
                  style={{
                    marginTop: "-3px",
                    textShadow:
                      "1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
                  }}
                >
                  {level}
                </span>
              </div>
            </label>
            <label htmlFor={"level-" + level}>
              <span className="cursor-pointer text-slate-500">
                {data.cards.filter((c) => c.Level === parseInt(level)).length}
              </span>
            </label>
          </p>
        ))}
      </div>
      {objectType === "SPELLS" && (
        <div className="px-5 py-5">
          <h2 className="pb-2 text-xl">Cost</h2>
          {["0", "1", "2", "3", "4", "5", "6", "8", "12"].map((cost) => (
            <p className="space flex w-full content-center px-1" key={cost}>
              <input
                type="checkbox"
                id={"cost-" + cost}
                name="cost"
                value={cost}
                defaultChecked={searchParams.getAll("cost").includes(cost)}
                className="my-auto hidden cursor-pointer"
              />
              <label htmlFor={"cost-" + cost} className="cursor-pointer pr-2">
                <div
                  className={`flex h-5 w-5 rounded-full ${
                    searchParams.getAll("cost").includes(cost)
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  <span
                    className="mx-auto font-bold"
                    style={{
                      marginTop: "-3px",
                      textShadow:
                        "1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
                    }}
                  >
                    {cost}
                  </span>
                </div>
              </label>
              <label htmlFor={"cost-" + cost}>
                <span className="cursor-pointer text-slate-500">
                  {data.cards.filter((c) => c.Cost === parseInt(cost)).length}
                </span>
              </label>
            </p>
          ))}
        </div>
      )}
      {objectType === "CHARACTERS" && (
        <div className="px-4 py-5">
          <h2 className="text-xl">Alignment</h2>
          {["Good", "Neutral", "Evil"].map((alignment) => (
            <p className="px-2" key={alignment}>
              <input
                type="checkbox"
                id={alignment}
                name="alignment"
                value={alignment}
                defaultChecked={searchParams
                  .getAll("alignment")
                  .includes(alignment)}
                className="cursor-pointer"
              />
              <label htmlFor={alignment} className="cursor-pointer px-2">
                {alignment}
              </label>
              <label htmlFor={alignment} className="cursor-pointer">
                <span className="m-auto text-slate-500">
                  {
                    data.cards.filter((c) => c.Subtypes.includes(alignment))
                      .length
                  }
                </span>
              </label>
            </p>
          ))}
        </div>
      )}
      {objectType !== "TREASURES" && (
        <div className="px-4 py-5">
          <h2 className="text-xl">Subtype</h2>
          {Subtypes.map((subtype) => (
            <p className="px-2" key={subtype}>
              <input
                type="checkbox"
                id={subtype}
                name="subtype"
                value={subtype}
                defaultChecked={searchParams
                  .getAll("subtype")
                  .includes(subtype)}
                className="cursor-pointer"
              />
              <label htmlFor={subtype} className="cursor-pointer px-2">
                {subtype}
              </label>
              <label htmlFor={subtype} className="cursor-pointer">
                <span className="m-auto text-slate-500">
                  {
                    data.cards.filter((c) => c.Subtypes.includes(subtype))
                      .length
                  }
                </span>
              </label>
            </p>
          ))}
        </div>
      )}
      <div className="px-4 py-5">
        <h2 className="text-xl">Keyword</h2>
        {Keywords.map((keyword) => (
          <p className="px-2" key={keyword}>
            <input
              type="checkbox"
              id={keyword}
              name="keyword"
              value={keyword}
              defaultChecked={searchParams.getAll("keyword").includes(keyword)}
              className="cursor-pointer"
            />
            <label htmlFor={keyword} className="cursor-pointer px-2">
              {keyword}
            </label>
            <label htmlFor={keyword} className="cursor-pointer">
              <span className="m-auto text-slate-500">
                {data.cards.filter((c) => c.Keywords.includes(keyword)).length}
              </span>
            </label>
          </p>
        ))}
      </div>
    </Form>
  );
}

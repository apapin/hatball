import { Link } from "@remix-run/react";
import { ObjectType } from "~/util/utils";

export function Header(props: { active: ObjectType }) {
  return (
    <header className="flex items-center bg-lightbg pt-4 text-white">
      <h1
        className={` py-1 px-2 text-xl ${
          props.active === "CHARACTERS" ? "bg-darkbg font-bold" : ""
        }`}
      >
        <Link to="/characters">Characters</Link>
      </h1>
      <h1
        className={` py-1 px-2 text-xl ${
          props.active === "TREASURES" ? "bg-darkbg font-bold" : ""
        }`}
      >
        <Link to="/treasures">Treasures</Link>
      </h1>
      <h1
        className={` py-1 px-2 text-xl ${
          props.active === "SPELLS" ? "bg-darkbg font-bold" : ""
        }`}
      >
        <Link to="/spells">Spells</Link>
      </h1>
      <h1
        className={` py-1 px-2 text-xl ${
          props.active === "HEROES" ? "bg-darkbg font-bold" : ""
        }`}
      >
        <Link to="/heroes">Heroes</Link>
      </h1>
    </header>
  );
}

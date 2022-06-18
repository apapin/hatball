import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/characters");
};

export default function Index() {
  return <></>;
}

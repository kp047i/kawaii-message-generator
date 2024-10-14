import type { MetaFunction } from "@remix-run/node";
import { Gallery } from "../components/ui/gallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { NavLink, useLoaderData } from "@remix-run/react";
import { Message } from "postcss";

export const meta: MetaFunction = () => {
  return [
    { title: "Image Gallery" },
    {
      name: "description",
      content: "A page displaying saved images as thumbnails.",
    },
  ];
};

export async function clientLoader() {
  const response = await fetch("http://localhost:8080/messages");
  const messages = await response.json();
  return messages as Promise<Message[]>;
}

export default function Messages() {
  const data = useLoaderData<typeof clientLoader>();
  return (
    <div className="w-full flex flex-col items-center justify-center max-w-4xl mx-auto p-6">
      <Card className="w-full max-w-6xl p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Kawaii Library</CardTitle>
          <CardDescription>みんなのメッセージを表示するよ！</CardDescription>
          <div>
            <NavLink to="/messages/create" className="text-blue-500">
              メッセージを作成する
            </NavLink>
          </div>
        </CardHeader>
        <CardContent>
          {/* Gallery コンポーネントを挿入 */}
          <Gallery messages={data} />
        </CardContent>
        <CardFooter>
          <p>Fin</p>
        </CardFooter>
      </Card>
    </div>
  );
}

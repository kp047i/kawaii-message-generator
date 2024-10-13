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

export const meta: MetaFunction = () => {
  return [
    { title: "Image Gallery" },
    { name: "description", content: "A page displaying saved images as thumbnails." },
  ];
};

export default function Messages() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-6xl p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Kawaii Library</CardTitle>
          <CardDescription>みんなのメッセージを表示するよ！</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Gallery コンポーネントを挿入 */}
          <Gallery />
        </CardContent>
        <CardFooter>
          <p>Fin</p>
        </CardFooter>
      </Card>
    </div>
  );
}

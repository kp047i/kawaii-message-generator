import type { MetaFunction } from "@remix-run/node";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateMessage,
  createMessageSchema,
} from "../features/message/createMessage/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import OpenAI from "openai";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const selectedAnimal = "cat";

const prompt =
  `A cute anime-style message card with a 4:3 aspect ratio, where the card is always centered and occupies about 50% of the width and 30% of the height of the image. The card is being held by a ${selectedAnimal}, which has its paws resting on the top corners of the card. The card is placed exactly in the middle of the image with enough blank space for writing a message. The background is filled with pastel colors and cute decorations like stars, hearts, and clouds. The overall theme is 'kawaii' with a soft, playful design. The layout and size of the card should remain consistent in every image.`;

export default function Index() {
  const form = useForm<CreateMessage>({
    resolver: zodResolver(createMessageSchema),
  });

  async function onSubmit(data: CreateMessage) {
    console.log(data);
    // const res = await client.images.generate({
    //   model: "dall-e-3",
    //   size: "1024x1024",
    //   quality: "standard",
    //   n: 1,
    //   style: "vivid",
    //   prompt
    // });
  }

  return (
    <div className="w-96 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>カードの作成</CardTitle>
              <CardDescription>カード生成の説明</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メッセージ</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={form.formState.isSubmitting}>カードを作成</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

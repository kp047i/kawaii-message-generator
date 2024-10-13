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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import OpenAI from "openai";
import { CreateMessage, createMessageSchema } from "../features/message/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { CHARACTERS, THEMES } from "../features/message/constants";
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

function prompt(selected_style: string, selected_animal: string) {
  return `
    Generate a kawaii ${selected_style} image featuring a {selected_animal} holding a blank message card.
    This image is to express gratitude to those who have supported me.

    The card must be centered exactly in the middle of the image, with the animal holding it directly from the sides.
    The card must take up exactly 70% of the width and 30% of the height of the image, and it should be perfectly horizontal with no tilt or rotation.
    The edges of the card should be sharp and clear, and the card itself should remain completely blank, with no text or decorations of any kind. 

    The card is being held by a ${selected_animal}.
    The card is placed exactly in the middle of the image with enough blank space for writing a message.
    The card should be large and prominent, taking up a significant portion of the image, while still leaving enough space for the {selected_animal} to be visible holding it.
    The card should appear larger than the animal, drawing more attention, while the animal remains cute and secondary.

    The background should be soft, using pastel colors, and feature small, simple kawaii elements such as stars, clouds, and hearts.
    These background elements should be positioned only around the edges of the image, so they do not overlap or interfere with the card or the animal.

    Ensure the overall theme is kawaii, with a soft, playful design.
    The card must always be prominent, and the background elements should not distract from the central card and animal figure.`;
}

export default function Index() {
  const form = useForm<CreateMessage>({
    resolver: zodResolver(createMessageSchema),
  });

  async function onSubmit(data: CreateMessage) {
    console.log(data);
    const res = await client.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      quality: "standard",
      n: 1,
      style: "vivid",
      prompt: prompt(data.theme, data.character),
    });
    console.log(res);
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
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>テーマ</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="テーマ" />
                        </SelectTrigger>
                        <SelectContent>
                          {THEMES.map((theme) => (
                            <SelectItem key={theme.value} value={theme.value}>
                              {theme.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="character"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>キャラクター</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="キャラクター" />
                        </SelectTrigger>
                        <SelectContent>
                          {CHARACTERS.map((character) => (
                            <SelectItem
                              key={character.value}
                              value={character.value}
                            >
                              {character.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={form.formState.isSubmitting}>
                カードを作成
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

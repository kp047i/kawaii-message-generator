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
import { CreateMessage, createMessageSchema } from "../features/message/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { CHARACTERS, THEMES } from "../features/message/constants";
import { prompt } from "../features/message/utils";
import { openAIClient } from "../features/message/libs";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const form = useForm<CreateMessage>({
    resolver: zodResolver(createMessageSchema),
  });

  async function onSubmit(data: CreateMessage) {
    console.log(data);
    const res = await openAIClient.images.generate({
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

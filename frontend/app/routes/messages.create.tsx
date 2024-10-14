import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Canvas } from "../features/message/components/Canvas.client";
import { useState } from "react";
import { Slider } from "../components/ui/slider";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Button } from "../components/ui/button";
import {
  CanvasMessage,
  CreateMessage,
  createMessageSchema,
} from "../features/message/schema";
import { CHARACTERS, FONTS, THEMES } from "../features/message/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { openAIClient } from "../features/message/libs";
import { prompt } from "../features/message/utils";
import { Label } from "../components/ui/label";

export default function MessagesCreate() {
  const form = useForm<CreateMessage>({
    resolver: zodResolver(createMessageSchema),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [color, setColor] = useColor("#561ecb");

  // const [imageUrl, setImageUrl] = useState<string | null>(
  //   "https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png"
  // );
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [message, setMessage] = useState<CanvasMessage>({
    text: "ありがとう",
    fontSize: 16,
    positionX: 50,
    positionY: 50,
    fontId: "1",
  });

  async function onSubmit(data: CreateMessage) {
    const res = await openAIClient.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      quality: "standard",
      n: 1,
      style: "vivid",
      prompt: prompt(data.theme, data.character),
      response_format: "b64_json",
    });

    if (res.data && res.data.length > 0 && res.data[0].b64_json) {
      setImageUrl(res.data[0].b64_json);
      setCurrentStep((prev) => prev + 1);
    }
  }

  const STEPS = [
    {
      id: "create-frame",
      title: "フレームの作成",
    },
    {
      id: "set-text",
      title: "テキストの設定",
      content: <CardContent className="flex flex-col gap-4 p-0"></CardContent>,
    },
  ];

  function handleChangeMessage(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage({ ...message, text: event.target.value });
  }

  function handleChangeFontSize(value: number[]) {
    setMessage({
      ...message,
      fontSize: value[0],
    });
  }

  async function handleCreateButtonClick() {
    // 作成ボタンが押された時の処理
    // 画像を生成する
    const canvas = document.getElementsByTagName("canvas")[0];

    const image = canvas.toDataURL("image/jpeg", 0.1);
    // console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
    link.click();

    // 画像を保存する
    const res = await fetch("http://localhost:8080/message", {
      method: "POST",
      body: JSON.stringify({
        image,
      }),
    });

    if (res.ok) {
      console.log("success");
    }

    // await fetch("http://localhost:8080/messages");
  }

  return (
    <div className="flex min-h-screen w-screen">
      <div className="h-screen grid place-content-center w-3/5">
        {imageUrl ? (
          <Canvas message={message} color={color} imageUrl={imageUrl} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>画像を生成中...</p>
          </div>
        )}
      </div>
      <div className="w-2/5">
        <Card className="flex flex-col h-full w-full rounded-none gap-6">
          <CardHeader>
            <h1>kawaii messanger</h1>

            <div className="my-4">
              <Progress
                value={currentStep * (100 / STEPS.length)}
                className="w-full"
              />
            </div>
          </CardHeader>

          <CardContent>
            {STEPS[currentStep].id === "create-frame" && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <div className="p-0">
                    <p>フレーム生成</p>
                    <p>
                      テーマとキャラクターを選んで、あなたにぴったりのメッセージカードを
                      作成することができるよ！！
                    </p>
                  </div>
                  <div>
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
                                  <SelectItem
                                    key={theme.value}
                                    value={theme.value}
                                  >
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
                  </div>
                  <div>
                    <Button
                      variant="special"
                      disabled={form.formState.isSubmitting}
                      className="w-full"
                    >
                      フレーム生成
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {STEPS[currentStep].id === "set-text" && (
              <div>
                <div className="flex flex-col gap-2">
                  <Label>メッセージ</Label>
                  <Textarea
                    placeholder="ありがとう！"
                    onChange={handleChangeMessage}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>フォント</Label>
                  <Select
                    onValueChange={(value) =>
                      setMessage({ ...message, fontId: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="フォント" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONTS.map((font) => (
                        <SelectItem key={font.id} value={font.id}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>文字の大きさ</Label>
                  <Slider
                    value={[message.fontSize]}
                    onValueChange={handleChangeFontSize}
                    min={8}
                    max={64}
                    step={1}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>文字の色</Label>
                  <ColorPicker
                    color={color}
                    onChange={setColor}
                    hideAlpha
                    hideInput
                    height={128}
                  />
                </div>

                <div>
                  <Label>テキストの位置</Label>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="message-position-x">
                          X: {message.positionX}%
                        </Label>
                        <Slider
                          id="message-position-x"
                          min={0}
                          max={100}
                          step={1}
                          value={[message.positionX]}
                          onValueChange={(value) => {
                            setMessage({
                              ...message,
                              positionX: value[0],
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message-position-t">
                          Y: {message.positionY}%
                        </Label>
                        <Slider
                          id="message-position-y"
                          min={0}
                          max={100}
                          step={1}
                          value={[message.positionY]}
                          onValueChange={(value) => {
                            setMessage({
                              ...message,
                              positionY: value[0],
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant="special"
                  onClick={handleCreateButtonClick}
                >
                  作成
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              variant="secondary"
            >
              戻る
            </Button>
            <Button
              disabled={currentStep === STEPS.length - 1}
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              次へ
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

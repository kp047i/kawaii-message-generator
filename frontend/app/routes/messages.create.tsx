import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Canvas } from "../features/message/components/Canvas.client";
import { useState } from "react";
import { Slider } from "../components/ui/slider";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Button } from "../components/ui/button";
import { CanvasMessage } from "../features/message/schema";
import { FONTS } from "../features/message/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function MessagesCreate() {
  const [color, setColor] = useColor("#561ecb");

  const [message, setMessage] = useState<CanvasMessage>({
    text: "ありがとう",
    fontSize: 16,
    positionX: 256,
    positionY: 256,
    fontId: "1",
  });

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
    // await fetch("http://localhost:8080/message", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     image,
    //   }),
    // });
    // await fetch("http://localhost:8080/messages");
  }

  return (
    <div className="flex min-h-screen w-screen">
      <div className="h-screen grid place-content-center w-3/5">
        <Canvas message={message} color={color} />
      </div>
      <div className="w-2/5">
        <Card className="flex flex-col h-full w-full rounded-none p-4 gap-6">
          <h1>Messages Create</h1>

          <CardContent className="flex flex-col gap-4 p-0">
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
              <Label>文字の座標</Label>
              {/* 上下左右に座標を動かせるボタンを置く */}
              <div>
                <Button
                  onClick={() =>
                    setMessage({ ...message, positionY: message.positionY - 5 })
                  }
                >
                  ↑
                </Button>
                <Button
                  onClick={() =>
                    setMessage({ ...message, positionY: message.positionY + 5 })
                  }
                >
                  ↓
                </Button>
                <Button
                  onClick={() =>
                    setMessage({ ...message, positionX: message.positionX - 5 })
                  }
                >
                  ←
                </Button>
                <Button
                  onClick={() =>
                    setMessage({ ...message, positionX: message.positionX + 5 })
                  }
                >
                  →
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              variant="special"
              onClick={handleCreateButtonClick}
            >
              作成
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

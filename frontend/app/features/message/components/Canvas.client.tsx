import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import p5 from "p5";
import { IColor } from "react-color-palette";
import { CanvasMessage } from "../schema";
import { FONTS } from "../constants";

export type CanvasProps = {
  message: CanvasMessage;
  color: IColor;
  imageUrl: string;
};

export function Canvas({ message, color, imageUrl }: CanvasProps) {
  console.log("Canvas", message, color, imageUrl);
  return (
    <div className="">
      <ReactP5Wrapper
        sketch={sketch}
        message={message}
        color={color}
        imageUrl={imageUrl}
      />
    </div>
  );
}

const sketch = (p: P5CanvasInstance<CanvasProps>) => {
  let imageUrl= "https://example.com/image.png";
  let image: p5.Image;
  let textValue: string;
  let fontSize: number;
  let color: string;
  let positionX: number;
  let positionY: number;
  let fontId: string;


  p.updateWithProps = (props) => {
    textValue = props.message.text;
    fontSize = props.message.fontSize;
    color = props.color.hex;
    positionX = props.message.positionX;
    positionY = props.message.positionY;
    fontId = props.message.fontId;

    // 画像が変わっていたら再読み込み
    if (imageUrl !== props.imageUrl) {
      imageUrl = props.imageUrl;
      image = p.loadImage(`data:image/png;base64,${props.imageUrl}`);
    }
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(0);
  };

  p.draw = () => {
    p.background(0);
    p.textFont(FONTS.find((font) => font.id === fontId)?.name ?? "Arial");
    p.image(image, 0, 0, p.width, p.height);
    p.fill(color);
    p.textSize(fontSize);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(
      textValue,
      (p.width * positionX) / 100,
      (p.height * positionY) / 100
    );
  };
};

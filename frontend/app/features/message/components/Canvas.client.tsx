import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import p5 from "p5";
import { IColor } from "react-color-palette";
import { CanvasMessage } from "../schema";
import { FONTS } from "../constants";

export type CanvasProps = {
  message: CanvasMessage;
  color: IColor;
};

export function Canvas({ message, color }: CanvasProps) {
  return (
    <div className="">
      <ReactP5Wrapper sketch={sketch} message={message} color={color} />
    </div>
  );
}

const sketch = (p: P5CanvasInstance<CanvasProps>) => {
  let image: p5.Image;
  let textValue: string;
  let fontSize: number;
  let color: string;
  let positionX: number;
  let positionY: number;
  let fontId: string;

  p.preload = () => {
    image = p.loadImage(
      "https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png"
    );
  };

  p.updateWithProps = (props) => {
    textValue = props.message.text;
    fontSize = props.message.fontSize;
    color = props.color.hex;
    positionX = props.message.positionX;
    positionY = props.message.positionY;
    fontId = props.message.fontId;
  };

  p.setup = () => {
    p.createCanvas(512, 512);
    p.background(0);
  };

  p.draw = () => {
    p.background(0);
    p.textFont(FONTS.find((font) => font.id === fontId)?.name ?? "Arial");
    p.image(image, 0, 0, p.width, p.height);
    p.fill(color);
    p.textSize(fontSize);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(textValue, positionX, positionY);
  };
};
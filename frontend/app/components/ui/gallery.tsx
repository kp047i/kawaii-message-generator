import { Message } from "postcss";
import React from "react";

type GalleryProps = {
  messages: Message[];
};

const Gallery: React.FC<GalleryProps> = ({ messages }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {messages.map((message, index) => (
        <div key={index} className="w-full">
          <img
            src={message.image}
            alt={`Thumbnail ${index}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export { Gallery };

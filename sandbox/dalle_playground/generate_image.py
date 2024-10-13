import os
import requests
from openai import OpenAI

# 環境変数からAPIキーを取得
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# 画像生成と保存の関数を定義
def generate_kawaii_image(selected_animal, selected_style, prompt, file_name):
    response = client.images.generate(
        model="dall-e-3",
        prompt = prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )

    # 画像のURLを取得して保存
    image_url = response.data[0].url
    image_response = requests.get(image_url)

    # 画像をファイルに保存
    with open(file_name, "wb") as f:
        f.write(image_response.content)


selected_animal_list = ["cat", "dog", "rabbit", "hamster", "penguin", "whale", "Little Twin Stars(Sanrio)"]
selected_style_list = ["Chibi-style", "pop-style", "fairty-tale-style", "plushie-style", "whimsical-style"]
#   Chibi-style: アニメ
#   pop-style：ポップ
#   fairty-tale-style：やさしい
#   plushie-style：やわらかい
#    whimsical-style：ファンタジー


base_prompt = """
    Generate a kawaii {selected_style} image featuring a {selected_animal} holding a blank message card.
    This image is to express gratitude to those who have supported me.

    The card must be centered exactly in the middle of the image, with the animal holding it directly from the sides.
    The card must take up exactly 70% of the width and 30% of the height of the image, and it should be perfectly horizontal with no tilt or rotation.
    The edges of the card should be sharp and clear, and the card itself should remain completely blank, with no text or decorations of any kind. 

    The card is being held by a {selected_animal}.
    The card is placed exactly in the middle of the image with enough blank space for writing a message.
    The card should be large and prominent, taking up a significant portion of the image, while still leaving enough space for the {selected_animal} to be visible holding it.
    The card should appear larger than the animal, drawing more attention, while the animal remains cute and secondary.

    The background should be soft, using pastel colors, and feature small, simple kawaii elements such as stars, clouds, and hearts.
    These background elements should be positioned only around the edges of the image, so they do not overlap or interfere with the card or the animal.

    Ensure the overall theme is kawaii, with a soft, playful design.
    The card must always be prominent, and the background elements should not distract from the central card and animal figure.
"""

for selected_animal in selected_animal_list:
    for selected_style in selected_style_list:
        prompt = base_prompt.format(selected_animal=selected_animal, selected_style=selected_style)
        file_name = f"output/kawaii_{selected_animal}_{selected_style}.png"
        generate_kawaii_image(selected_animal, selected_style, prompt, file_name)

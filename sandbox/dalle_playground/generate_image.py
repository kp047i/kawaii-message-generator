import requests
from openai import OpenAI

client = OpenAI()

# 画像生成と保存の関数を定義
def generate_kawaii_image(selected_animal, prompt, file_name):
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


selected_animal = "dog"
base_prompt = """
    Generate a kawaii anime-style image featuring an animal holding a blank message card.

    The card must be centered exactly in the middle of the image, with the animal holding it directly from the sides.
    The card must take up exactly 70% of the width and 30% of the height of the image, and it should be perfectly horizontal with no tilt or rotation.
    The edges of the card should be sharp and clear, and the card itself should remain completely blank, with no text or decorations of any kind. 

    The card is being held by a {selected_animal}.
    The card is placed exactly in the middle of the image with enough blank space for writing a message.

    The background is filled with pastel colors and cute decorations like stars, hearts, and clouds.
    These elements should be faint and positioned around the edges of the image to avoid interfering with the card or the animal.

    The overall design should be soft and playful, with a focus on kawaii aesthetics, ensuring that the card's position, size, and shape are consistent across multiple generations.
"""

for i in range(3):
    # プロンプトに動物の種類を埋め込む
    prompt = base_prompt.format(selected_animal=selected_animal)
    file_name = f"img/kawaii_image_{i + 1}.png"
    generate_kawaii_image(selected_animal, prompt, file_name)

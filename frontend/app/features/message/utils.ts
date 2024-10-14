export function prompt(selected_style: string, selected_animal: string) {
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

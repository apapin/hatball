export function cardToImageURL(card: { Name: string }): string {
  return `https://raw.githubusercontent.com/Apapin/SBB-card-art/main/${card.Name.replace(
    ",",
    ""
  )
    .replace("'", "")
    .replace("!", "")
    .replace("+", "")}.png`;
}

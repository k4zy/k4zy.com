import base64url from "base64url";

export const createOgpImage = (baseImageUrl: string, title: string) => {
  const ogImageUrl = `${baseImageUrl}?w=1200&h=1200&blend64=${base64url(
    `https://assets.imgix.net/~text?txtsize=48&txt-color=454040&w=1120&txt-align=middle&txtfont=Hiragino%20Sans%20W8&txt-track=2&txt64=${base64url(
      title
    )}`
  )}&blend-mode=normal&blend-align=top,left&blend-x=120&blend-y=250`;

  return { ogImageUrl };
};

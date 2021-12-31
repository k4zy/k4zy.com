import base64url from "base64url";

export const createOgpImage = (baseImageUrl: string, title: string) => {
  const blendY = title.length > 16 ? 180 : 210;
  const ogImageUrl = `${baseImageUrl}?w=1000&h=1200&blend64=${base64url(
    `https://assets.imgix.net/~text?txtsize=48&txt-color=454040&w=850&txt-align=middle&txtfont=Hiragino%20Sans%20W8&txt-track=2&txt64=${base64url(
      title
    )}`
  )}&blend-mode=normal&blend-align=top,left&blend-x=100&blend-y=${blendY}`;

  return { ogImageUrl };
};

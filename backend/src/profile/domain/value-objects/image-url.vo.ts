export class ImageUrl {
  constructor(public readonly url: string) {
    if (!url) throw new Error("ImageUrl required");
    if (!/^https?:\/\//.test(url))
      throw new Error("ImageUrl must be an absolute url");
  }
}

export class Avatar {
  public readonly userId: string;
  public readonly image: string;

  constructor({ userId, image }: { userId: string; image: string }) {
    this.userId = userId;
    this.image = image;
  }
}

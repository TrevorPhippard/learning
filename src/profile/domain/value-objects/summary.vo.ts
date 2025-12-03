export class Summary {
  constructor(public readonly text: string) {
    if (text && text.length > 5000) throw new Error("Summary max 5000 chars");
  }
}

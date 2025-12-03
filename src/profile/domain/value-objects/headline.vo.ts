export class Headline {
    constructor(public readonly value: string) {
      if (value && value.length > 200) throw new Error('Headline max 200 chars');
    }
  }
  
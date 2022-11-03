import {Container as InversifyContainer} from 'inversify'

export class Container {
  private static container: InversifyContainer | null = null;

  static getInstance = () => {
    if (this.container === null) {
      this.container = new InversifyContainer({
        defaultScope: "Singleton",
        skipBaseClassChecks: false,
        autoBindInjectable: true
      });
    }
    return this.container
  }
}

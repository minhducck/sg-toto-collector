import "reflect-metadata";
import {interfaces} from "inversify";
import {Container} from "../configuration/container";
import {getFunctionName} from "inversify/lib/utils/serialization";

export function factoryModel<T>(className: any): (...args: any[]) => void | any {
  return () => {
    const serviceIdentifier = typeof className === 'function' ? `Factory<${getFunctionName(className)}>` : `Factory<${className}>`;
    !Container.getInstance().isBound(serviceIdentifier) && Container.getInstance().bind<interfaces.Factory<T>>(serviceIdentifier).toAutoFactory<T>(className);
  }
}

import { original } from "immer";
import { pascalCase } from "change-case";
import { DebouncedStore } from "../store/store";

export interface Extension<T> {
  name: string;
  extension: T;
  [key: string]: any;
}

export class ExtensionRegistry<T> extends DebouncedStore<Extension<T>[]> {
  protected storeState = [];
  protected readonly name: string;

  constructor(name: string) {
    super();
    this.name = pascalCase(name);
  }

  register(extension: Extension<T>, { priority = 0 } = {}) {
    if (
      !extension ||
      Array.isArray(extension) ||
      !(typeof extension === "object")
    ) {
      throw new Error(
        `Registry.${
          this.name
        }.register requires a valid extension object that implements one of the functions defined by ${
          this.name
        }Extension`
      );
    }

    if (!extension.name) {
      throw new Error(
        `Registry.${
          this.name
        }.register requires a \`name\` property defined on the extension object`
      );
    }

    if (this.state.find(entry => entry.name === extension.name)) {
      throw new Error(
        `Registry.${
          this.name
        }.register requires each extension to have a unique name.`
      );
    }

    this.produce(draft => {
      draft.push({ name: extension.name, extension, priority });
      draft.sort((a, b) => (a.priority < b.priority ? -1 : 1) as any);
    });

    return this;
  }

  unregister(extension: Extension<T>) {
    this.produce(draft => {
      return original<any>(draft).filter(
        entry => entry.extension !== extension
      );
    });
  }

  clear() {
    this.produce(draft => []);
  }

  extensions(): T[] {
    return this.state.map(e => e.extension);
  }
}

export default {
  ShippingList: new ExtensionRegistry("ShippingList")
};

import { DebouncedStore } from "../store/store";
import { original } from "immer";

export interface ComponentDescriptor {
  location?: string;
  locations?: string[];
  role?: string;
  roles?: string[];
}

export interface Component {
  locations: any;
  roles: string | string[];
  component: React.ElementType;
}

export class ComponentRegistry extends DebouncedStore<Component[]> {
  protected storeState = [];

  private pluralizeDescriptor(
    descriptor: ComponentDescriptor
  ): {
    roles: string[] | undefined;
    locations: string[] | undefined;
  } {
    let { locations, roles } = descriptor;

    if (descriptor.role) {
      roles = [descriptor.role];
    }

    if (descriptor.location) {
      locations = [descriptor.location];
    }

    return { locations, roles };
  }

  register(
    component: React.ElementType,
    descriptor: ComponentDescriptor,
    { priority = 0 } = {}
  ) {
    if (!descriptor) {
      throw new Error(
        "ComponentRegistry.register() requires `descriptor` that describe the component"
      );
    }

    if (!component) {
      throw new Error(
        "ComponentRegistry.register() requires `component`, a React component"
      );
    }

    const { locations, roles } = this.pluralizeDescriptor(descriptor);

    if (!roles && !locations) {
      throw new Error(
        "ComponentRegistry.register() requires `role` or `location`"
      );
    }

    this.produce(draft => {
      draft.push({ component, locations, roles, priority });
      draft.sort((a: any, b: any) => (a.priority < b.priority ? -1 : 1) as any);
    });

    return this;
  }

  findComponentsMatching(descriptor: ComponentDescriptor) {
    if (!descriptor) {
      throw new Error(
        "ComponentRegistry.findComponentsMatching called without descriptor"
      );
    }

    const { locations, roles } = this.pluralizeDescriptor(descriptor);

    if (!locations && !roles) {
      throw new Error(
        "ComponentRegistry.findComponentsMatching called with an empty descriptor"
      );
    }

    const overlaps = (entry = [], search = []) =>
      entry.filter(x => search.includes(x)).length > 0;

    const entries = [...this.state].filter(entry => {
      if (entry.locations && entry.roles) {
        return (
          overlaps(locations, entry.locations) && overlaps(roles, entry.roles)
        );
      }

      if (locations && !overlaps(locations, entry.locations)) {
        return false;
      }

      if (roles && !overlaps(roles, entry.roles)) {
        return false;
      }

      return true;
    });

    const results = entries.map(entry => entry.component);

    return results;
  }

  unregister(component: React.ComponentType) {
    if (typeof component === "string") {
      throw new Error(
        "ComponentRegistry.unregister() must be called with a component."
      );
    }

    this.produce(draft => {
      return original(draft).filter(
        (entry: any) => entry.component !== component
      );
    });
  }
}

const instance = new ComponentRegistry();
export default instance;

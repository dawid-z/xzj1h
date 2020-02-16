import ComponentRegistry from "./registries/component-registry";

export const registerComponent = ComponentRegistry.register.bind(
  ComponentRegistry
);
export const unregisterComponent = ComponentRegistry.unregister.bind(
  ComponentRegistry
);

import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import componentRegistry, {
  ComponentDescriptor,
  ComponentRegistry
} from "../../registries/component-registry";
import { SlotLabel, SlotBox } from "./slot-label";
import { SlotErrorBoundary } from "./slot-error-boundary";

export interface SlotProps {
  matching: ComponentDescriptor;
  className?: string;
  exposedProps?: object;
  fallback?: (...args: any[]) => any;
  style?: object;
  requiredMethods?: string[];
  onComponentDidChange?: (...args: any[]) => any;
}

type ScopedSlotState = {
  component: any;
  visible: any;
};

function findComponent(
  registry: ComponentRegistry,
  descriptor: ComponentDescriptor,
  fallback?: (...args: any[]) => any
): { components: React.ElementType | React.ElementType[] } {
  const components = registry.findComponentsMatching(descriptor);

  // if (components.length > 1) {
  //   console.warn(
  //     `There are multiple components available for ${JSON.stringify(
  //       descriptor
  //     )}. <Slot> is only rendering the first one.`
  //   );
  // }

  return {
    components: components
  };
}

export function Slot(props: SlotProps) {
  const regionsVisible = useSelector(
    (state: any) => state.config.regions_visible,
    shallowEqual
  );

  const { style = {}, className = "" } = props;
  const [state, setState] = useState<{ components: React.ElementType }>(() => {
    let components = componentRegistry.findComponentsMatching(props.matching);
    if (!components.length && typeof props.fallback === "function") {
      components = Array.isArray(props.fallback)
        ? props.fallback
        : [props.fallback];
    }
    return {
      components
    };
  });

  React.useEffect(() => {
    const updateState = (): any => {
      let components = componentRegistry.findComponentsMatching(props.matching);
      if (!components.length && typeof props.fallback === "function") {
        components = Array.isArray(props.fallback)
          ? props.fallback
          : [props.fallback];
      }
      setState({
        components
      });
    };

    const sub = componentRegistry.subscribe({ next: updateState });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (!state.components) {
    return null;
  }

  let { exposedProps = {} } = props;

  exposedProps = {
    ...exposedProps,
    fallback: props.fallback
  };

  const elements = state.components.map((Component, index) => {
    const name =
      Component.name ||
      Component.displayName ||
      Component.constructor.name ||
      "";
    return (
      <SlotErrorBoundary key={`${name}:${index}`}>
        <Component {...exposedProps} className={className} style={style} />
      </SlotErrorBoundary>
    );
  });

  if (regionsVisible) {
    return (
      <SlotBox>
        {elements}
        <SlotLabel matching={props.matching} {...exposedProps} />
      </SlotBox>
    );
  }

  return elements;
}

/* eslint react/prefer-stateless-function: 0 */
import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";

export const Description = styled.span`
  background-color: rgba(255, 0, 0, 0.1);
  position: absolute;
  color: black;
  font-size: 13px;
  top: 0;
  left: 0;
  white-space: nowrap;
  z-index: 100;
  transform: translate(0%, 0%);
  padding: 0 2px;
`;

export const SlotBox = styled.span`
  display: inline-block;
  position: relative;
  outline: 1px dashed rgba(255, 0, 0, 0.5);
  width: 100%;
  min-height: 1.5em;

  :hover {
    outline: 1px dashed rgba(255, 0, 0, 1);

    > ${Description} {
      background-color: rgba(255, 0, 0, 1);
      color: #fff;
    }
  }
`;

type SlotLabelProps = {
  matching?: any[];
};

export function SlotLabel(props: any) {
  const matchingDescriptions = [];

  for (const key in props.matching) {
    let val = props.matching[key];

    if (key === "locations" && Array.isArray(val)) {
      val = val.join(", ");
    }

    matchingDescriptions.push(`${key}: ${val}`);
  }

  const propDescriptions = [] as any[];

  for (const key in props) {
    const val = props[key];
    if (key === "matching" || key === "fallback") {
      continue;
    }

    const desc = val && val.constructor ? val.constructor.name : typeof val;
    propDescriptions.push(`${key}:<${desc}>`);
  }

  let description = ` ${matchingDescriptions.join(", ")}`;
  if (propDescriptions.length > 0) {
    description += ` (${propDescriptions.join(", ")})`;
  }

  return <Description>{description}</Description>;
}

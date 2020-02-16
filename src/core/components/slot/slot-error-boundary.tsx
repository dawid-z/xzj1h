import React from "react";
import styled from "styled-components";

const ComponentException = styled.div`
  padding: 4px 12px;
  background-color: rgba(255, 0, 0, 0.1);
  color: rgba(160, 50, 50, 1);
`;

const Message = styled.div`
  font-weight: 500;
`;

const StackTrace = styled.div`
  font-size: 0.9em;
  white-space: pre;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: text;
`;

export class SlotErrorBoundary extends React.Component<
  null,
  { error: string; showStackTrace: boolean }
> {
  constructor(props?: any) {
    super(props);
    this.state = { error: null, showStackTrace: false };
  }

  componentDidCatch(error, info) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <ComponentException>
          <Message>{this.state.error.toString()}</Message>
          {this.state.showStackTrace && (
            <StackTrace>{this.state.error.stack}</StackTrace>
          )}
        </ComponentException>
      );
    }

    return this.props.children;
  }
}

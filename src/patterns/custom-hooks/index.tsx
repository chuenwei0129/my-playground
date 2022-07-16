import React, { FunctionComponentElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CounterProvider } from './CounterProvider';
import { Count } from './sub-components/Count';
import { Decrement } from './sub-components/Decrement';
import { Increment } from './sub-components/Increment';
import { Label } from './sub-components/Label';

type CustomHookCounterProps = {
  value: number;
  onChange?: (value: number) => void;
  children: React.ReactNode;
};

const CustomHookCounter = ({ value: count, onChange, children }: CustomHookCounterProps) => {
  const firstMounded = useRef(true);

  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<unknown>;
      if (
        childElement.type.displayName === 'Increment' ||
        childElement.type.displayName === 'Decrement' ||
        childElement.type.displayName === 'Label' ||
        childElement.type.displayName === 'Count'
      ) {
        return childElement;
      } else {
        console.warn(`type: ${childElement.type} 被限制输入，已过滤`);
      }
    });
  };

  return (
    <CounterProvider value={{ count }}>
      <StyledCounter>{renderChildren()}</StyledCounter>
    </CounterProvider>
  );
};

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;

CustomHookCounter.Count = Count;
CustomHookCounter.Label = Label;
CustomHookCounter.Increment = Increment;
CustomHookCounter.Decrement = Decrement;

export { useCounter } from './useCounter';
export { CustomHookCounter };
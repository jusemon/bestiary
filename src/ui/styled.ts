import React, { createElement, ComponentType, CSSProperties } from 'react';

// For React components
export type StyledComponentProps<Props> = Props & {
  className?: string;
  style?: React.CSSProperties;
};

// For HTML elements
type HTMLTagProps<T extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[T];

// Union type for component or HTML tag
type ComponentOrTag<Props> =
  | ComponentType<Props>
  | keyof React.JSX.IntrinsicElements;

export function styled<T extends keyof React.JSX.IntrinsicElements>(
  tag: T,
  styles?: CSSProperties,
  baseClassName?: string
): React.FC<HTMLTagProps<T>>;

export function styled<
  Props extends { className?: string; style?: CSSProperties }
>(
  Component: ComponentType<Props>,
  styles?: CSSProperties,
  baseClassName?: string
): React.FC<Props>;

export function styled<Props>(
  ComponentOrTag: ComponentOrTag<Props>,
  styles?: CSSProperties,
  baseClassName?: string
) {
  const StyledComponent = (props: Props) => {
    const { className, style, ...rest } = props as any;

    const combinedClassName = baseClassName
      ? className
        ? `${baseClassName} ${className}`
        : baseClassName
      : className;

    return createElement(ComponentOrTag as any, {
      ...rest,
      className: combinedClassName,
      style: {
        ...style,
        ...(styles || {}),
      },
    });
  };

  // Set display name
  const componentName =
    typeof ComponentOrTag === 'string'
      ? ComponentOrTag.charAt(0).toUpperCase() + ComponentOrTag.slice(1)
      : (ComponentOrTag as any).displayName ||
        (ComponentOrTag as any).name ||
        'Component';

  StyledComponent.displayName = `Styled${componentName}`;

  return StyledComponent;
}

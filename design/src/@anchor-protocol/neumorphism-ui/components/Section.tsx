import { flat } from '@anchor-protocol/styled-neumorphism';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface SectionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

function SectionBase({ children, className, ...sectionProps }: SectionProps) {
  return (
    <section className={`NeuSection-root ${className}`} {...sectionProps}>
      <div className="NeuSection-content">{children}</div>
    </section>
  );
}

/**
 * Styled `<div/>` tag
 */
export const Section = styled(SectionBase)`
  border-radius: 20px;

  ${({ theme }) =>
    flat({
      color: theme.backgroundColor,
      distance: 6,
      intensity: theme.intensity,
    })};

  .NeuSection-content {
    padding: 50px;
  }
`;
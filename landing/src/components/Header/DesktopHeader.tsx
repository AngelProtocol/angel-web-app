import { WebAppButton } from 'components/Header/WebAppButton';
import { headerHeight, links } from 'env';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export interface DesktopHeaderProps {
  className?: string;
  color: 'dark' | 'light';
}

function DesktopHeaderBase({ className, color }: DesktopHeaderProps) {
  return (
    <header className={className} data-dark={color === 'dark'}>
      <section>
        <Link to="/">ANGEL</Link>
      </section>
      <nav>
        <NavLink to="/dashboard">DASHBOARD</NavLink>
        <a href={links.developers} target="anchor-developers">
          DEVELOPERS
        </a>
        {/*<NavLink to="/contact">CONTACT</NavLink>*/}
      </nav>
      <section>
        <WebAppButton />
      </section>
    </header>
  );
}

export const DesktopHeader = styled(DesktopHeaderBase)`
  // ---------------------------------------------
  // style
  // ---------------------------------------------
  background-color: #ffffff;

  a {
    text-decoration: none;
  }

  // logo
  > :first-child {
    font-size: 16px;
    font-weight: 900;

    a {
      color: #333333;
    }
  }

  nav {
    a {
      font-size: 13px;
      font-weight: 500;
      color: #696969;

      &:hover {
        color: #515151;
      }

      &.active {
        font-weight: 900;
        color: #333333;
      }
    }
  }

  // webapp
  > :last-child {
    .webapp {
      color: #999999;
      background-color: #f6f6f6;

      &:hover {
        color: #7e7e7e;
        background-color: #e9e9e9;
      }
    }
  }

  &[data-dark='true'] {
    background-color: #000000;

    > :first-child {
      a {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    nav {
      a {
        color: rgba(255, 255, 255, 0.35);

        &:hover {
          color: rgba(255, 255, 255, 0.5);
        }

        &.active {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }

    > :last-child {
      .webapp {
        color: rgba(255, 255, 255, 0.54);
        background-color: #161616;

        &:hover {
          color: rgba(255, 255, 255, 0.65);
          background-color: #242424;
        }
      }
    }
  }

  // ---------------------------------------------
  // layout
  // ---------------------------------------------
  height: ${headerHeight}px;
  padding: 0 44px;

  display: flex;
  align-items: center;

  > :first-child {
    flex: 1;
  }

  nav {
    a:not(:last-child) {
      margin-right: 28px;
    }

    margin-right: 34px;
  }
`;

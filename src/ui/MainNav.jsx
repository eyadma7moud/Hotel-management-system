import { HiOutlineCalendar, HiOutlineHome, HiUserGroup } from "react-icons/hi";
import { HiOutlineCog6Tooth, HiOutlineHomeModern } from "react-icons/hi2";
import { RiAdminLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &,
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active svg {
    color: var(--color-brand-500);
  }

  &.disabled {
    color: var(--color-grey-400);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.disabled:hover {
    color: var(--color-grey-400);
    background-color: transparent;
  }

  &.disabled svg {
    color: var(--color-grey-400);
  }
`;

function MainNav() {
  const { user } = useUser();
  const { role } = user.user_metadata;

  return (
    <div>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendar />
            <span>Bookings</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/guests">
            <HiUserGroup />
            <span>Guests</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink
            to="/users"
            className={role !== "admin" ? "disabled" : ""}
            onClick={(e) => {
              if (role !== "admin") e.preventDefault();
            }}
          >
            <RiAdminLine />
            <span>Users</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink
            to="/settings"
            className={role !== "admin" ? "disabled" : ""}
            onClick={(e) => {
              if (role !== "admin") e.preventDefault();
            }}
          >
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </div>
  );
}

export default MainNav;

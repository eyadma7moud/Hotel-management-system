import styled from "styled-components";
import { useUser } from "./useUser";
import { HiMiniKey } from "react-icons/hi2";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const AdminBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  padding: 0.3rem 0.7rem;
  border-radius: 999px;

  font-size: 1.1rem;
  font-weight: 600;

  color: var(--color-brand-700);
  background-color: var(--color-brand-100);
`;

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar, role } = user.user_metadata;
  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={fullName} />
      <span>{fullName}</span>
      {role === "admin" && (
        <AdminBadge>
          <HiMiniKey />
          Admin
        </AdminBadge>
      )}{" "}
    </StyledUserAvatar>
  );
}

export default UserAvatar;

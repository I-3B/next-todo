import { Logo } from "@/components/shared/logo";
import { user } from "@/services/user";
import { Logout } from "./(index)/logout";
export type TopBarProps = {};
export async function TopBar({}: TopBarProps) {
  const profile = await user.profile();

  return (
    <div className="flex flex-row items-center justify-between gap-1 p-3">
      <Logo />
      <div className="flex flex-row items-center gap-1">
        <p>{profile.email}</p>
        <Logout />
      </div>
    </div>
  );
}

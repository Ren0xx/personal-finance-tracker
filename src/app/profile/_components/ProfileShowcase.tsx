import { H1 } from "@/components/ui/typography";
import ProfileAvatar from "./Avatar";

type ProfileShowcaseProps = {
  name: string | null;
  image: string | null;
};
const ProfileShowcase = (props: ProfileShowcaseProps) => {
  const { name, image } = props;
  return (
    <div className="flex items-center justify-center gap-4">
      <ProfileAvatar
        src={image ?? "https://github.com/shadcn.png"}
        fallback={name ?? "Not Found"}
      />
      <H1>Your profile: {name}</H1>
    </div>
  );
};

export default ProfileShowcase;

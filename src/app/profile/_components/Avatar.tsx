import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

type ProfileAvatarProps = {
  src: string;
  fallback: string;
};
const ProfileAvatar = (props: ProfileAvatarProps) => {
  const { src, fallback } = props;
  return (
    <Avatar>
      <AvatarImage asChild src={src} alt="Profile image">
        <Image src={src} alt="Profile image" fill className="rounded-full" />
      </AvatarImage>
      <AvatarFallback>{fallback.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
};
export default ProfileAvatar;

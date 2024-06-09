import SideNav from "@/components/SideNav";
export default function Dashboard() {
  return (
    <div className="min-h-screen min-w-full">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <SideNav />
        </div>
        <div className="col-span-1">right</div>
      </div>
    </div>
  );
}

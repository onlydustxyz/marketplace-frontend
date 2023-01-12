import headerElementBackground from "src/assets/img/header-element-background.png";
import Card from "src/components/Card";
import RiErrorWarningLine from "src/icons/RiErrorWarningLine";

export default function InfoMissingBanner() {
  return (
    <Card
      backgroundImageUrl={headerElementBackground}
      className="bg-opacity-10 border-none backdrop-blur-2xl"
      backgroundImageClassName="bg-no-repeat bg-cover top-500"
    >
      <div className="flex flex-row justify-start items-center font-medium gap-5">
        <RiErrorWarningLine className="p-3 px-4 text-4xl rounded-2xl bg-white/10" />
        <div className="flex flex-col ">
          <div className="text-xl font-medium">Profile information missing</div>
          <div className="text-lg font-normal">
            We won’t be able to issue any payment until your profile is completed
          </div>
        </div>
      </div>
    </Card>
  );
}

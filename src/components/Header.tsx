import BubbliLogo from "./BubbliLogo";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="-mb-28 flex justify-center pb-4 pt-20">
      <BubbliLogo className="z-10 h-20 scale-150 cursor-pointer text-sky-800" />
    </header>
  );
}

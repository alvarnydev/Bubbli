import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

interface ButtonProps {
  buttonLink: LinkField;
  buttonText: string | null;
  className?: string;
}

const Button = ({ buttonLink, buttonText, className }: ButtonProps) => {
  return (
    <PrismicNextLink
      field={buttonLink}
      className={clsx(
        "text-wide rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl",
        className,
      )}
    >
      {buttonText}
    </PrismicNextLink>
  );
};

export default Button;

import logo from "@/assets/logo/srimart.png";

interface Props {
  className?: string;
  variant?: "default" | "white";
}

const Logo = ({ className = "h-12 w-auto", variant = "default" }: Props) => {
  return (
    <img
      src={logo}
      alt="Egmart"
      className={`${className} object-contain ${variant === "white" ? "bg-white rounded-lg p-1.5" : ""}`}
      width={503}
      height={496}
    />
  );
};

export default Logo;

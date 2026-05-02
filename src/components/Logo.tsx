import logo from "@/assets/logo/egmart-logo.jpeg";

interface Props {
  className?: string;
  variant?: "default" | "white";
}

const Logo = ({ className = "h-10 w-auto", variant = "default" }: Props) => {
  return (
    <img
      src={logo}
      alt="Egmart by Yazz"
      className={`${className} object-contain ${variant === "white" ? "bg-white rounded-md p-1" : ""}`}
      width={400}
      height={400}
    />
  );
};

export default Logo;

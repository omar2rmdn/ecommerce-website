import { Link } from "react-router";

type Props = {
  label: string;
  icon: React.ReactNode;
  link: string;
};

export default function HeaderIconItem({ label, icon, link }: Props) {
  return (
    <Link
      to={link}
      className="d-flex align-items-center text-decoration-none text-dark"
      style={{ gap: "8px" }}
    >
      {icon}
      <p className="mb-0">{label}</p>
    </Link>
  );
}

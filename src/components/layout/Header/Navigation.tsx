import NavigationItem from "./NavigationItem";

export default function Navigation() {
  const links = [
    {
      label: "Em Cartazes",
      href: "/movies",
    },
    {
      label: "Lançamentos",
      href: "/releases",
    },
    {
      label: "Bomboniere",
      href: "/snacks",
    },
    {
      label: "Programa de Pontos",
      href: "/rewards",
    },
  ];

  return (
    <nav>
      <ul className="flex items-center gap-8">
        {links.map((link) => (
          <NavigationItem key={link.href} {...link} />
        ))}
      </ul>
    </nav>
  );
}

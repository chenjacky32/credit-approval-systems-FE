import Link from "next/link";

interface NavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    isOpen: boolean;
}

export function NavItem({ href, icon, label, isOpen }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center p-2 rounded-md hover:bg-[var(--color-primary)] transition-colors ${isOpen ? "space-x-3 justify-start" : "justify-center"}`}
            title={!isOpen ? label : undefined}
        >
            <div className="flex-shrink-0">{icon}</div>
            {isOpen && <span className="whitespace-nowrap">{label}</span>}
        </Link>
    );
}
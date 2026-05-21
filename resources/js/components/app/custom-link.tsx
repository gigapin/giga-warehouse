import type { UrlMethodPair } from '@inertiajs/core';
import { Link } from '@inertiajs/react';

interface CustomLinkProps {
    label: string;
    href: string | UrlMethodPair | undefined;
}

export default function CustomLink({ label, href }: CustomLinkProps) {
    return (
        <Link
            className="pointer rounded-2xl bg-gray-300 px-2 py-1 text-black"
            href={href}
        >
            {label}
        </Link>
    );
}

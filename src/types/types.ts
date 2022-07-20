export interface FooterItem {
    label: string;
    href: string;
    hash: boolean;
}
export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href: string;
    hash?: boolean;
}
export interface Topic {
    title: string;
    href: string;
    initialValue: string;
    storageId: string;
    children?: Array<Topic>;
}
export interface Article {
    title: string;
    imageUrl: string;
    text: string;
    author: string;
    url: string;
}

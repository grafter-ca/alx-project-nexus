
import { Home, ShoppingCart, Truck, User } from "lucide-react";
import { ComponentType } from "react";

export interface navLinkProps{
  name:string;
  path:string;
  icon: ComponentType<any>
}

export const navLinks : navLinkProps[] = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Customers", path: "/dashboard/user", icon: User },
  { name: "Products", path: "/dashboard/product", icon: Truck },
  { name: "Orders", path: "/dashboard/order", icon: ShoppingCart },
];

export const headerNavlinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];
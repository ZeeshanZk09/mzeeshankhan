import {
  HandPlatter,
  Home,
  Album,
  BriefcaseBusiness,
  BookCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Album,
  },
  {
    title: "Services",
    url: "/services",
    icon: HandPlatter,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: BriefcaseBusiness,
  },
  {
    title: "Testimonials",
    url: "/testimonials",
    icon: BookCheck,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="space-y-5">
          <SidebarGroupLabel className="font-clashDisplayMedium text-black text-2xl">
            M Zeeshan Khan
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="gap-4">
                    <Link href={item.url} className="">
                      <item.icon className="scale-150" />
                      <span className="font-satoshiBold text-gray-600 text-xl">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/assets/docs/ZK Resume.pdf"
              target="_blank"
              download="ZK_Resume.pdf"
              id="loginBtn"
              className=" w-fit px-2 py-1 text-[1.944rem] font-semibold bg-[#04AF70] border-none rounded-lg text-white font-satoshiRegular cursor-pointer  z-50 overflow-hidden"
            >
              Download CV
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

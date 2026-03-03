import Image from "next/image";
import { Facebook, Github, Instagram, Twitter, Youtube } from "lucide-react";
const Footer = () => {
  const footerNavs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Create", href: "/create" },
  ];
  const socialIcons = [
    { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
    {
      icon: <Instagram size={18} />,
      label: "Instagram",
      href: "#",
    },
    { icon: <Youtube size={18} />, label: "Youtube", href: "#" },
    { icon: <Twitter size={18} />, label: "X", href: "#" },
    { icon: <Github size={18} />, label: "Github", href: "#" },
  ];

  return (
    <footer className="bg-background text-muted-foreground px-4 py-10 border-t border-border mt-15">
      <div className="max-w-275 mx-auto md:px-8">
        <div className="max-w-lg sm:mx-auto sm:text-center">
          <div className="flex items-center gap-2 justify-center mx-auto ">
            <Image
              src="/icons/versus_logo_final_small_2.svg"
              alt="Versus Logo"
              width={80}
              height={80}
              priority
              className="h-auto mt-0.5  dark:invert-100 cursor-pointer"
            />
            <h1 className="text-[3.4rem] font-black uppercase text-foreground">
              versus
            </h1>
          </div>

          <p className="leading-relaxed mt-4 text-[15px]">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type.
          </p>
        </div>

        <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
          {footerNavs.map((item, idx) => (
            <li key={idx} className="hover:text-foreground transition-colors">
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>

        <div className="mt-8 items-center justify-between border-t border-border pt-8 sm:flex">
          <div className="mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} Boulmehad Inc. All rights
            reserved.
          </div>

          <div className="mt-6 sm:mt-0">
            <ul className="flex items-center gap-2">
              {socialIcons.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 bg-muted text-pretty items-center
                     justify-center rounded-full 
                     border border-border text-muted-foreground transition-all
                      duration-200 hover:bg-muted hover:text-primary
                       hover:border-primary/70 active:scale-95"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

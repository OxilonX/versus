"use client";
import { useEffect, useState } from "react";
//local comps imports
//icons imports
import { Plus, Search } from "lucide-react";
//shadcn imports
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ButtonGroup } from "@/components/ui/button-group";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
//next imports

import Link from "next/link";
const CreateChallengeItem = () => {
  const imagesBrands = [
    {
      svg: (
        <svg
          style={{ width: 12 }}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Pixabay</title>
          <path d="M2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm10.193 5.5h2.499l1.967 2.872L18.854 5.5h2.482l-3.579 4.592 3.91 4.813h-2.638l-2.395-3.064-2.15 3.064h-2.579l3.579-4.813zm-5.045.004c1.32.033 2.42.49 3.3 1.371.879.881 1.335 1.986 1.37 3.317-.035 1.331-.491 2.441-1.37 3.328-.88.887-1.98 1.346-3.3 1.38H4.346v3.768H2.5v-8.476c.032-1.33.486-2.436 1.359-3.317.873-.88 1.97-1.338 3.29-1.37Zm0 1.864c-.797.02-1.46.294-1.985.823-.525.53-.797 1.196-.817 2v2.847h2.802c.808-.019 1.476-.294 2.003-.826.528-.532.8-1.206.82-2.02-.02-.805-.292-1.47-.82-2-.527-.53-1.195-.805-2.003-.824Z" />
        </svg>
      ),
      name: "pixabay",
      link: "https://pixabay.com",
      color: "#191B26",
    },
    {
      svg: (
        <svg
          style={{ width: 12 }}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Pexels</title>
          <path d="M1.5 0A1.5 1.5 0 000 1.5v21A1.5 1.5 0 001.5 24h21a1.5 1.5 0 001.5-1.5v-21A1.5 1.5 0 0022.5 0h-21zm6.75 6.75h5.2715a3.843 3.843 0 01.627 7.6348V17.25H8.25V6.75zm1.5 1.5v7.5h2.8984v-2.8145h.873a2.343 2.343 0 100-4.6855H9.75Z" />
        </svg>
      ),
      name: "pexels",
      link: "https://pexels.com",
      color: "#05A081",
    },
    {
      svg: (
        <svg
          style={{ width: 12 }}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Unsplash</title>
          <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
        </svg>
      ),
      name: "unsplash",
      link: "https://unsplash.com",
      color: "#000000",
    },
  ];
  const [items, setItems] = useState([
    {
      id: "clx123001",
      name: "React",
      imageUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
      isPublic: true,
    },
    {
      id: "clx123002",
      name: "Next.js",
      imageUrl:
        "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=200&h=200&fit=crop",
      isPublic: true,
    },
    {
      id: "clx123005",
      name: "TypeScript",
      imageUrl:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=200&fit=crop",
      isPublic: true,
    },
    {
      id: "clx123006",
      name: "Tailwind CSS",
      imageUrl:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=200&h=200&fit=crop",
      isPublic: true,
    },
    {
      id: "clx123007",
      name: "Prisma",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop",
      isPublic: true,
    },
  ]);
  const [fullDate, setFullDate] = useState<string>("");
  useEffect(() => {
    const now = new Date().toISOString();
    setFullDate(now);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    isPublic: true,
  });
  const [searchQuerry, setSearchQuerry] = useState("");
  return (
    <div className="flex flex-col justify-center items-center ">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="w-full py-6">
          <TabsTrigger
            value="search"
            className="py-5 text-lg flex items-center gap-2"
          >
            <Search className="w-6 h-6 shrink-0" /> Search Library
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="py-5 text-lg flex items-center gap-2"
          >
            <Plus className="w-6 h-6 shrink-0" /> Add Item
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <div className="w-full py-4">
            <ButtonGroup className="w-full ">
              <Input
                className="mb-6 py-6 bg-background"
                value={searchQuerry}
                onChange={(e) => setSearchQuerry(e.target.value)}
                placeholder="search item..."
              />
              <Button className="py-6" variant="default" aria-label="Search">
                <SearchIcon />
              </Button>
            </ButtonGroup>

            <ScrollArea className="w-full h-80">
              <ul className="w-full flex flex-col gap-2">
                {items.map((el) => (
                  <li
                    key={el.id}
                    className="bg-background hover:bg-accent p-4 rounded-md"
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-[60px] h-[60px]">
                          <Image
                            src={el.imageUrl}
                            alt={el.name}
                            width={100}
                            height={100}
                            className="w-auto h-auto object-cover"
                          />
                        </div>
                        <p>{el.name}</p>
                      </div>
                      <div>
                        <Button>Pick</Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>{" "}
        </TabsContent>

        <TabsContent value="add">
          <div className="w-full py-4">
            <div className="space-y-2">
              <Label htmlFor="item-name" className="text-foreground">
                Item Name
              </Label>
              <Input
                id="item-name"
                placeholder="e.g. Lionel Messi"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-border focus:border-primary bg-background py-6"
                required
              />
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="item-image" className="text-foreground ">
                Image URL
              </Label>
              <div className="relative flex items-center justify-between">
                <Input
                  id="item-image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="border-border focus:border-primary bg-background py-6"
                />
                <div className="absolute right-4 flex items-center gap-2">
                  {imagesBrands.map(({ name, color, link, svg }) => (
                    <Button
                      asChild
                      key={name}
                      className="text-[12px] font-bold capitalize rounded-full py-2 px-4 h-8"
                      style={{ background: `${color}` }}
                    >
                      <Link
                        href={link}
                        target="_blank"
                        prefetch={true}
                        className={`flex items-center gap-2`}
                        rel="noopener noreferrer"
                      >
                        {name}
                        <div className=" invert-100">{svg}</div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Leave empty for default placeholder.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between gap-8 py-2">
                <Label
                  htmlFor="public-toggle"
                  className="cursor-pointer text-primary font-bold"
                >
                  Make Public ?
                </Label>
                <Switch
                  id="public-toggle"
                  checked={formData.isPublic}
                  onCheckedChange={(checked: boolean) =>
                    setFormData({ ...formData, isPublic: checked })
                  }
                />
                <p className="text-xs font-medium italic text-muted-foreground">
                  {fullDate}
                </p>
              </div>
              <Button className="px-8 font-bold">Add Item</Button>
            </div>
          </div>{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateChallengeItem;

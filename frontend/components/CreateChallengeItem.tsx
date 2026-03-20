"use client";
import { useState, useEffect, useCallback, memo } from "react";
//local comps imports
//icons imports
import { CheckCircle, Plus, Search } from "lucide-react";
//shadcn imports
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ButtonGroup } from "@/components/ui/button-group";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
//next imports
import Link from "next/link";
import { motion } from "motion/react";
import { API } from "@/lib/api";
const DEFAULT_IMAGE = "/images/default_item_v1.jpeg";

const isValidImageSrc = (url: string): boolean => {
  if (!url) return false;

  const invalidPatterns = ["pexels.com/photo/", "unsplash.com/photos/"];
  if (invalidPatterns.some((pattern) => url.includes(pattern))) {
    return false;
  }

  const validExtensions = [
    ".jpg",
    ".jpeg",
    ".webp",
    ".png",
    ".gif",
    ".svg",
    ".avif",
  ];
  const hasValidExtension = validExtensions.some((ext) =>
    url.toLowerCase().endsWith(ext),
  );

  const validSubdomains = ["images.unsplash.com", "images.pexels.com"];
  const hasValidSubdomain = validSubdomains.some((subdomain) =>
    url.includes(subdomain),
  );

  return hasValidExtension || hasValidSubdomain;
};

const imagesBrands = [
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

interface Item {
  id: string;
  name: string;
  imageUrl: string;
  isPublic: boolean;
  userId: string;
}

const CreateChallengeItem = memo(
  ({ setId }: { setId: (id: string) => void }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [fullDate] = useState<string>(new Date().toISOString());
    const [formData, setFormData] = useState({
      name: "",
      imageUrl: "",
      isPublic: true,
    });
    const [searchQuerry, setSearchQuerry] = useState("");
    const [hasError, setHasError] = useState(false);
    const [pickedItem, setPickedItem] = useState("");

    const getPublicItems = useCallback(async () => {
      try {
        const response = await fetch(API.items.list, {
          credentials: "include",
        });
        const data = await response.json();
        console.log("public items : ", data);

        if (!response.ok) {
          throw new Error(data.error || "Server rejected to send public items");
        }
        return data;
      } catch (err) {
        return toast.warning("Error In sending Public Items...", {
          position: "bottom-right",
        });
      }
    }, []);

    const getPrivateItems = useCallback(async () => {
      try {
        const response = await fetch(API.items.private, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          toast.warning("Server rejected to send private items", {
            position: "bottom-right",
          });
          throw new Error(
            data.error || "Server rejected to send private items",
          );
        }
        return data;
      } catch (err) {
        return toast.warning("Error In sending Private Items...", {
          position: "bottom-right",
        });
      }
    }, []);
    useEffect(() => {
      const fetchItems = async () => {
        const privateData = await getPrivateItems();
        const publicData = await getPublicItems();
        const combined = [
          ...(Array.isArray(privateData) ? privateData : []),
          ...(Array.isArray(publicData) ? publicData : []),
        ];

        setItems(combined);
      };

      fetchItems();
    }, [getPrivateItems, getPublicItems]);

    const handlePickItemClick = useCallback(
      (id: string) => {
        if (pickedItem === id) {
          setId("");
          setPickedItem("");
        } else {
          setPickedItem(id);
          setId(id);
          setItems((prevItems) => {
            const itemToMove = prevItems.find((item) => item.id === id);
            if (!itemToMove) return prevItems;

            const remainingItems = prevItems.filter((item) => item.id !== id);
            return [itemToMove, ...remainingItems];
          });
        }

        setItems((prevItems) => {
          const itemToMove = prevItems.find((item) => item.id === id);
          if (!itemToMove) return prevItems;

          const remainingItems = prevItems.filter((item) => item.id !== id);
          return [itemToMove, ...remainingItems];
        });
      },
      [setId, pickedItem],
    );

    const getImageSrc = useCallback(
      (url: string | null | undefined): string => {
        if (!url || typeof url !== "string" || url.trim() === "") {
          return DEFAULT_IMAGE;
        }

        if (url === "image.example.com" || !url.startsWith("http")) {
          return DEFAULT_IMAGE;
        }

        if (!isValidImageSrc(url) || hasError) {
          return DEFAULT_IMAGE;
        }

        return url;
      },
      [hasError],
    );

    const handleAddItem = useCallback(async () => {
      if (!formData?.name.trim()) {
        return toast.warning("Item name is required", {
          position: "bottom-right",
        });
      }
      const createItemRequest = async () => {
        const response = await fetch(API.items.list, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Server rejected the item");
        }

        setItems((prev) => [data, ...prev]);
        setFormData({ name: "", imageUrl: "", isPublic: true });
        return data;
      };

      toast.promise(createItemRequest(), {
        loading: "Saving to your library...",
        success: (data) => `${data.name} has been created successfully!`,
        error: (err) => `Error: ${err.message}`,
      });
    }, [formData]);
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-center items-center "
      >
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="w-full py-6">
            <TabsTrigger
              value="search"
              className="py-5 text-lg flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-6 h-6 shrink-0" /> Search Library
            </TabsTrigger>
            <TabsTrigger
              value="add"
              className="py-5 text-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-6 h-6 shrink-0" /> Add Item
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="w-full py-4 "
            >
              <div className="space-y-2">
                <Label htmlFor="search-item" className="text-foreground">
                  Search Item
                </Label>
                <ButtonGroup className="w-full ">
                  <Input
                    id="search-item"
                    placeholder="e.g. Lionel Messi"
                    className="mb-6 py-6 bg-background"
                    value={searchQuerry}
                    onChange={(e) => setSearchQuerry(e.target.value)}
                  />
                  <Button
                    className="py-6"
                    variant="default"
                    aria-label="Search"
                  >
                    <SearchIcon />
                  </Button>
                </ButtonGroup>
              </div>

              <ScrollArea className="relative w-full h-90 z-10">
                <ul className="w-full flex flex-col gap-2">
                  {items.map((el) => (
                    <li
                      key={el.id}
                      className={
                        el.id === pickedItem
                          ? "sticky top-0 z-4 bg-slate-200 dark:bg-accent dark:hover:bg-card hover:bg-accent p-4 rounded-md shadow-lg "
                          : "z-1 bg-background dark:bg-accent dark:hover:bg-card hover:bg-accent p-4 rounded-md"
                      }
                    >
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative w-[60px] h-[60px] overflow-hidden">
                            <Image
                              src={getImageSrc(el.imageUrl)}
                              alt={el.name || "Item Image"}
                              fill
                              sizes="60px"
                              className="w-auto h-auto object-cover"
                            />
                          </div>
                          <p>{el.name}</p>
                        </div>
                        <div>
                          <Button
                            className={
                              el.id === pickedItem ? "bg-destructive" : ""
                            }
                            onClick={() => handlePickItemClick(el.id as string)}
                          >
                            {el.id === pickedItem ? <CheckCircle /> : "Pick"}
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </motion.div>{" "}
          </TabsContent>

          <TabsContent value="add">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="w-full py-4"
            >
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="item-image" className="text-foreground ">
                    Image URL
                  </Label>
                  <div className="flex items-center gap-2">
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
                <div className="relative flex items-center justify-between">
                  <Input
                    id="item-image"
                    type="url"
                    placeholder="Use Copy Image Address to get a direct link "
                    value={formData.imageUrl}
                    onChange={(e) => {
                      setHasError(false);
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: e.target.value,
                      }));
                    }}
                    className={`border-border focus:border-primary bg-background py-6 ${
                      hasError && formData.imageUrl ? "border-red-500" : ""
                    }`}
                  />
                </div>

                <p className="text-xs text-muted-foreground italic">
                  Leave empty for default placeholder.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, transition: { duration: 0.15 } }}
                  className="flex items-center justify-between gap-8 py-2"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 0.15 } }}
                  >
                    <Label
                      htmlFor="public-toggle"
                      className="cursor-pointer text-primary font-bold text-nowrap"
                    >
                      Make Public ?
                    </Label>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 0.25 } }}
                  >
                    <Switch
                      className="cursor-pointer"
                      id="public-toggle"
                      checked={formData.isPublic}
                      onCheckedChange={(checked: boolean) =>
                        setFormData({ ...formData, isPublic: checked })
                      }
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className=""
                >
                  <Button onClick={handleAddItem} className="px-8 font-bold">
                    Add Item
                  </Button>
                </motion.div>
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, transition: { duration: 0.15 } }}
                  className="text-2xl font-bold capitalize text-muted-foreground"
                >
                  Item Preview
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, transition: { duration: 0.15 } }}
                  className="flex items-start gap-10 w-full"
                >
                  <div className="relative w-[150px] h-[150px] overflow-hidden rounded-md border border-border bg-muted shrink-0">
                    <Image
                      src={getImageSrc(formData.imageUrl)}
                      alt={formData.name || "item name"}
                      fill
                      className="object-cover transition-opacity duration-300"
                      sizes="200px"
                      priority
                      onError={() => setHasError(true)}
                      onLoad={() => setHasError(false)}
                    />
                    {hasError && formData.imageUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                        <span className="bg-destructive text-muted text-xs font-bold px-2 py-1 rounded">
                          Invalid URL
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col overflow-hidden text-ellipsis min-w-0 flex-1">
                    <h2 className="text-xl font-bold capitalize">
                      item informations :
                    </h2>
                    <ul className="flex flex-col overflow-hidden">
                      <li className="flex items-center gap-1  min-w-0">
                        <span className="text-base text-foreground">
                          name :
                        </span>
                        <p className="text-sm font-medium text-foreground/70">
                          {formData.name || "e.g. Ahmed Draya"}
                        </p>
                      </li>
                      <li className="flex items-center gap-1  min-w-0">
                        <span className="text-base text-foreground">
                          state :
                        </span>
                        <p className="text-sm font-medium text-foreground/70">
                          {formData.isPublic ? "Public" : "Private"}
                        </p>
                      </li>
                      <li className="flex items-center gap-1  min-w-0">
                        <span className="text-base text-foreground">
                          created at:
                        </span>
                        <p
                          className="normal text-[13px] font-medium text-foreground/70 "
                          suppressHydrationWarning
                        >
                          {fullDate}
                        </p>
                      </li>
                      <li className="flex items-center gap-1  min-w-0">
                        <span className="text-base text-foreground whitespace-nowrap">
                          image url :
                        </span>
                        <p className="text-sm font-medium text-foreground/70  truncate w-[60%]">
                          {formData.imageUrl || "image.example.com"}
                        </p>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    );
  },
);

CreateChallengeItem.displayName = "CreateChallengeItem";

export default CreateChallengeItem;

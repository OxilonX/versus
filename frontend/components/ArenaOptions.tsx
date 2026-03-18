"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
const ArenaOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set("search", query);
    else params.delete("search");
    router.push(`?${params.toString()}`);
  };

  const reset = () => {
    setQuery("");
    router.push("/arena");
  };

  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-50px" }}
    >
      <ButtonGroup>
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button variant="outline" onClick={handleSearch}>
          <SearchIcon size={18} />
        </Button>
      </ButtonGroup>
      <RotateCcw
        size={22}
        className="stroke-2 stroke-muted-foreground cursor-pointer hover:rotate-180 transition-transform"
        onClick={reset}
      />
    </motion.div>
  );
};

export default ArenaOptions;

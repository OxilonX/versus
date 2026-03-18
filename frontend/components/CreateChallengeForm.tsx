"use client";
//shadcn imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateChallengeItem from "./CreateChallengeItem";
import { useState, useCallback, memo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
//import motions
import { motion } from "motion/react";
//local comps imports
import { SectionHeaders } from "@/motions/GlobalMotion";
const CreateChallengeForm = () => {
  const [challengeInput, setChallengeInput] = useState("");
  const [firstItemId, setFirstItemId] = useState<string>("");
  const [secondnItemId, setSecondItemId] = useState<string>("");
  const setFirst = useCallback((id: string) => setFirstItemId(id), []);
  const setSecond = useCallback((id: string) => setSecondItemId(id), []);
  const router = useRouter();
  const initChallengeHandleClick = useCallback(async () => {
    if (!challengeInput.trim()) {
      return toast.warning("Name required", {
        description: "Please fill the challenge name form, then try again.",
        position: "bottom-right",
        id: "val-challenge-name",
        closeButton: false,
      });
    }

    if (!(firstItemId && secondnItemId)) {
      return toast.warning("Selection missing", {
        description: "Please select two items, then try again.",
        position: "bottom-right",
        id: "val-item",
        closeButton: false,
      });
    }
    const createChallengeAction = async () => {
      const bodyData = {
        title: challengeInput,
        items: [{ itemId: firstItemId }, { itemId: secondnItemId }],
      };
      const response = await fetch("/api/challenges/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create challenge");
      }
      return data;
    };

    toast.promise(createChallengeAction(), {
      closeButton: false,
      loading: "Initializing battle arena...",
      success: (data) => {
        router.push("/arena");
        return `${data.title} is live! Ready for battle?`;
      },
      error: (err) => err.message,
    });
  }, [challengeInput, firstItemId, secondnItemId]);
  return (
    <div className="py-10">
      <div className="pb-4">
        <SectionHeaders>Create Your Challenge</SectionHeaders>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="flex flex-col gap-4 bg-card-offset px-6 py-8 rounded-lg shadow-md"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <Label htmlFor="challenge-name" className="text-muted-foreground">
              Challenge Name
            </Label>
            <Input
              id="challenge-name"
              placeholder="e.g. Best Soccer Player"
              value={challengeInput}
              onChange={(e) => setChallengeInput(e.target.value)}
              className="text-lg md:text-xl py-6 font-black placeholder:text-muted-foreground/20"
            />
          </motion.div>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          <Card className="h-160  shadow-lg">
            <CardHeader>
              <CardTitle>First Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <CreateChallengeItem setId={setFirst} />
              </div>
            </CardContent>
          </Card>
          <Card className="h-160 shadow-lg">
            <CardHeader>
              <CardTitle>Second Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <CreateChallengeItem setId={setSecond} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pt-4 flex justify-center"
        >
          <Button
            onClick={initChallengeHandleClick}
            size="lg"
            className="w-full md:w-1/2 py-8 text-2xl font-black uppercase tracking-widest tracking-widest shadow-lg "
          >
            Initialize Battle
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default memo(CreateChallengeForm);

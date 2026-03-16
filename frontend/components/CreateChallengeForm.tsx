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
import { router } from "better-auth/api";
//local comps imports
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
        <h1 className="hd-font text-3xl font-black uppercase ">
          Create Your Challenge
        </h1>
      </div>
      <div className="flex flex-col gap-4 bg-card-offset px-6 py-8 rounded-lg shadow-md">
        <div>
          <div className="space-y-2">
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
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
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
        </div>
        <div className="pt-4 flex justify-center">
          <Button
            onClick={initChallengeHandleClick}
            size="lg"
            className="w-full md:w-1/2 py-8 text-2xl font-black uppercase tracking-widest tracking-widest shadow-lg "
          >
            Initialize Battle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(CreateChallengeForm);

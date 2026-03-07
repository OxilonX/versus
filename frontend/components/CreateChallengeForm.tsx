"use client";
//shadcn imports

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateChallengeItem from "./CreateChallengeItem";
import { useState } from "react";
//local comps imports
const CreateChallengeForm = () => {
  const [challengeInput, setChallengeInput] = useState("");
  return (
    <div className="py-15">
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
                <CreateChallengeItem />
              </div>
            </CardContent>
          </Card>
          <Card className="h-160 shadow-lg">
            <CardHeader>
              <CardTitle>Second Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <CreateChallengeItem />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-4 flex justify-center">
          <Button
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

export default CreateChallengeForm;

"use client";

import { Input } from "@/components/ui/input";
//shadcn imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateChallengeItem from "./CreateChallengeItem";
//local comps imports
const CreateChallengeForm = () => {
  return (
    <div>
      <div>
        <div>
          <Input placeholder="Challenge name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle>First Item</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aliquam, sit?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <CreateChallengeItem />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Second Item</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aliquam, sit?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <CreateChallengeItem />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateChallengeForm;

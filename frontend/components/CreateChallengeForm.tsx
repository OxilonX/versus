"use client";

import { Input } from "@/components/ui/input";
//shadcn imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
          <Input />
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default CreateChallengeForm;

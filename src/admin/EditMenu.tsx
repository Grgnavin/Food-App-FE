import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type MenuFormSchema = {
  name: string,
  description: string,
  price: number,
  image?: File | undefined;
}

const EditMenu = ({
    selectedMenu,
    editOpen,
    setEditOpen,
}: {
    selectedMenu: MenuFormSchema;
    editOpen: boolean;
    setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const[input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined
});
const loading = false;

  const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(input);
      
  }; 

const ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) :value});
};

useEffect(() => {
  if (selectedMenu) {
    setInput({
      name: selectedMenu.name,
      description: selectedMenu.description,
      price: selectedMenu.price,
      image: undefined
    })
  }
}, [selectedMenu]);

  return (
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Edit Menu</DialogTitle>
            <DialogDescription className="text-center">
              Update your menu to keep your offerings fresh and exciting!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={SubmitHandler} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={input.name}
                onChange={ChangeEventHandler}
                type="text"
                placeholder="Enter menu name"
                name="name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                value={input.description}
                onChange={ChangeEventHandler}
                placeholder="Enter menu description"
                name="description"
              />
            </div>
            <div>
              <Label>Price in (Rupees)</Label>
              <Input
                type="number"
                value={input.price}
                onChange={ChangeEventHandler}
                placeholder="Enter menu price"
                name="price"
              />
            </div>
            <div>
              <Label>Upload menu Image</Label>
              <Input
                type="file"
                onChange={(e) =>
                  setInput({ ...input, image: e.target.files?.[0] || undefined })
                }
                name="image"
              />
            </div>
            <DialogFooter className="mt-5">
              {loading ? (
                <Button className="bg-orange w-full hover:bg-hoverOrange">
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button className="bg-orange w-full hover:bg-hoverOrange">
                  Submit
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

export default EditMenu;

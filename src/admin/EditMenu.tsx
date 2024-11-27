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
import { MenuSchema } from "@/schema/menuSchema";
import { useMenu } from "@/store/useMenuStore";
import { MenuItems } from "@/types/resturantTypes";
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
    selectedMenu: MenuItems;
    editOpen: boolean;
    setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const[input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined
});
const[error, setError] = useState<Partial<MenuFormSchema>>({});
const { editMenu, loading } = useMenu();
  const SubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = MenuSchema.safeParse(input);
        if (!res.success) {
            const fieldError = res.error.formErrors.fieldErrors;
            setError(fieldError as Partial<MenuFormSchema>);
            return;
        }
        const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            if (input.image) {
                formData.append('image', input.image);
            }
          await editMenu(formData ,selectedMenu._id);
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
              {
                error && <span className='text-xs text-red-600 font-medium'>{error.name}</span>
              }
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
              {
                error && <span className='text-xs text-red-600 font-medium'>{error.description}</span>
              }
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
              {
                error && <span className='text-xs text-red-600 font-medium'>{error.price}</span>
              }
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
              {
                error && <span className='text-xs text-red-600 font-medium'>{error.image?.name}</span>
              }
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

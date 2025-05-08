import {useUserStore} from "@/store/userStore.ts";

import * as React from "react"

import {cn} from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {NavLink} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ModeToggle} from "@/components/ModeToggle.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {AuthService} from "@/services/auth.service.ts";


export default function Navbar() {
    const userStore = useUserStore();

    const isSignedUp = useUserStore((state) => state.isSignedUp)

    return (
        <>
            <div className='flex items-center justify-center'>
                <div className='flex flex-row justify-around items-center w-full min-h-[50px] lg:min-h-0 md:mb-[10px]'>
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-16">
                            <NavigationMenuItem>
                                <NavLink to="/" end>
                                    Main
                                </NavLink>
                            </NavigationMenuItem>
                            <div className="hidden md:flex space-x-16">
                                <NavigationMenuItem>
                                    <NavLink to="/movies" end>
                                        Movies
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to="/series" end>
                                        Series
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to="/imdb" end>
                                        Imdb Recomendations
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to="/community" end>
                                        Community Recomendations
                                    </NavLink>
                                </NavigationMenuItem>
                            </div>


                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex space-x-2">

                        {isSignedUp ?
                            <>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src={
                                                userStore.avatar ||
                                                "https://github.com/shadcn.png"}/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-auto">
                                        <DropdownMenuGroup>
                                            <NavLink to="/user/profile">
                                                <DropdownMenuItem>
                                                    Profile
                                                </DropdownMenuItem>
                                            </NavLink>
                                            <DropdownMenuItem>
                                                <span>Billing</span>
                                            </DropdownMenuItem>
                                            <Button onClick={() => AuthService.logout()}
                                                    variant="destructive">LogOut</Button>

                                        </DropdownMenuGroup>

                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </>

                            :
                            <><Button><NavLink to="/signin" end>SignIn</NavLink></Button></>
                        }
                        <ModeToggle/>

                    </div>
                </div>

            </div>
            <Separator/>

        </>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
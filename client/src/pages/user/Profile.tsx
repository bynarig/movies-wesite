import Navbar from "@/components/Navbar.tsx";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useUserStore} from "@/store/userStore";
import {Clock, User, Lock, CalendarIcon} from "lucide-react";
import {NavLink, useNavigate} from "react-router";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {UserService} from "@/services/user.service.ts";
import type {UserType} from "@root/types/userTypes.ts"
import {toPrettyDate} from "@/lib/date.ts";

export default function ProfilePage() {
    const isSignedUp = useUserStore((state) => state.isSignedUp)
    let navigate = useNavigate();
    useEffect(() => {
        if (!isSignedUp) {
            navigate('/')
        }
    }, [isSignedUp]);
    const userStore = useUserStore();
    const [activeTab, setActiveTab] = useState<string>("profile");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserType>({})

    useEffect(() => {
        const fetchProfileData = async () => {
            const profileData = await UserService.getProfileInfo();
            setFormData(profileData);
        };
        fetchProfileData();
    }, []);

    function toggleEditMode() {
        setIsEditing(!isEditing);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            
            <div
                className="container mx-auto py-6 px-4 md:py-10 mt-5 xl:mt-[15vh] ">
                <div className="max-w-5xl mx-auto">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
                            <AvatarImage
                                src={
                                    formData?.avatar
                                        ? formData?.avatar
                                        :
                                        "https://avatars.githubusercontent.com/u/124599?v=4"

                                }
                                alt={formData.name || "User"}
                            />
                            <AvatarFallback className="text-2xl">
                                {formData.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col items-center md:items-start">
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {formData?.name}
                            </h1>
                            <p className="text-muted-foreground">
                                {formData.email}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge
                                    variant="outline"
                                    className="capitalize"
                                >
                                    {formData.role?.toLowerCase() ||
                                        "User"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <Tabs
                        defaultValue="profile"
                        className="w-full"
                        onValueChange={setActiveTab}
                        value={activeTab}
                    >

                        <TabsList className="grid grid-cols-3 mb-8">
                            <TabsTrigger
                                value="profile"
                                className="flex items-center gap-2"
                            >
                                <User className="h-4 w-4"/>
                                <span
                                    className={
                                        "inline"
                                    }
                                >
											Profile
										</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="flex items-center gap-2"
                            >
                                <Lock className="h-4 w-4"/>
                                <span
                                    className={
                                        "inline"
                                    }
                                >
											Security
										</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="activity"
                                className="flex items-center gap-2"
                            >
                                <Clock className="h-4 w-4"/>
                                <span
                                    className={
                                        "inline"
                                    }
                                >
											Activity
										</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Personal Information
                                    </CardTitle>
                                    <CardDescription>
                                        View and manage your personal
                                        information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                                Full Name
                                            </h3>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={
                                                        formData.name
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            ) : (
                                                <p className="text-foreground">
                                                    {formData
                                                            .name ||
                                                        "Not provided"}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                                Email Address
                                            </h3>

                                            <p className="text-foreground">
                                                {formData.email ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                                Username
                                            </h3>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={
                                                        formData.username
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            ) : (
                                            <p className="text-foreground">
                                                {formData
                                                        .username ||
                                                    "Not provided"}
                                            </p>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                                Account Created
                                            </h3>
                                            <p className="text-foreground">
                                                {toPrettyDate(formData.createdAt as Date)}

                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                                Last Updated
                                            </h3>
                                            <p className="text-foreground">
                                                {toPrettyDate(formData.updatedAt as Date)}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                                Last Login
                                            </h3>
                                            <p className="text-foreground">
                                                {toPrettyDate(formData.lastLogin as Date)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                // onClick={saveProfile}
                                                className="w-full md:w-auto"
                                            >
                                                Save Changes
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={toggleEditMode}
                                                className="w-full md:w-auto"
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                    <Button
                                        variant="outline"
                                        onClick={toggleEditMode}
                                        className="w-full md:w-auto"
                                    >
                                        Edit Profile
                                    </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Security Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your account security and
                                        privacy
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div
                                            className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-medium">
                                                    Password
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Change your password
                                                    regularly for better
                                                    security
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                            >
                                                {formData.authProviders?.includes("CREDENTIALS") ? "Change password" : "Set password"}
                                            </Button>
                                        </div>

                                        <div
                                            className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-medium">
                                                    Delete Account
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Delete your account
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
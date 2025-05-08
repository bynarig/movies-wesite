import Navbar from "@/components/Navbar.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
    User,
    Settings,
    Bell,
    Lock,
    Mail,
    Calendar,
    Star,
    Heart,
    Bookmark,
    Clock,
    Edit,
    Camera,
    LogOut,
    Shield,
    Eye,
    EyeOff,
    Key,
    Globe,
    MessageSquare,
    Film,
    Award,
    History,
    List,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { useUserStore } from "@/store/userStore.ts";

// Mock user data
const userData = {
    id: 1,
    username: "johndoe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    avatar: "https://i.pravatar.cc/300?img=1",
    joinDate: "2023-01-15",
    bio: "Movie enthusiast and film critic. Love exploring different genres and sharing thoughts about cinema.",
    location: "New York, USA",
    preferences: {
        emailNotifications: true,
        publicProfile: true,
        showWatchlist: true,
        showRatings: true,
        showComments: true,
        showActivity: true,
    },
    stats: {
        moviesWatched: 156,
        reviewsWritten: 89,
        listsCreated: 12,
        followers: 234,
        following: 156,
    },
    recentActivity: [
        {
            id: 1,
            type: "rating",
            movie: "The Last Adventure",
            rating: 4.5,
            timestamp: "2 hours ago",
            moviePoster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ"
        },
        {
            id: 2,
            type: "review",
            movie: "Eternal Echoes",
            content: "A masterpiece of storytelling and visual effects.",
            timestamp: "1 day ago",
            moviePoster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ"
        }
    ],
    watchlist: [
        {
            id: 1,
            title: "Future Horizons",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            releaseDate: "2025-03-15"
        }
    ],
    customLists: [
        {
            id: 1,
            name: "Favorite Sci-Fi Movies",
            count: 25,
            isPublic: true
        },
        {
            id: 2,
            name: "Movies to Watch",
            count: 15,
            isPublic: false
        }
    ]
};

export default function ProfilePublicPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'activity' | 'lists'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(userData);
    const isSignedUp = useUserStore((state) => state.isSignedUp);

    const handleProfileEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = () => {
        // Here you would typically make an API call to save the changes
        setIsEditing(false);
    };

    if (!isSignedUp) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                            <p className="text-muted-foreground mb-4">You need to be signed in to view your profile.</p>
                            <NavLink to="/signin">
                                <Button>Sign In</Button>
                            </NavLink>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative mb-4">
                                        <img
                                            src={userData.avatar}
                                            alt={userData.fullName}
                                            className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                                        />
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="absolute bottom-0 right-0 rounded-full"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                                    <p className="text-muted-foreground">@{userData.username}</p>
                                </div>

                                <div className="space-y-4">
                                    <Button
                                        variant={activeTab === 'profile' ? 'default' : 'ghost'}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab('profile')}
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Button>
                                    <Button
                                        variant={activeTab === 'settings' ? 'default' : 'ghost'}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab('settings')}
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Button>
                                    <Button
                                        variant={activeTab === 'activity' ? 'default' : 'ghost'}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab('activity')}
                                    >
                                        <History className="mr-2 h-4 w-4" />
                                        Activity
                                    </Button>
                                    <Button
                                        variant={activeTab === 'lists' ? 'default' : 'ghost'}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab('lists')}
                                    >
                                        <List className="mr-2 h-4 w-4" />
                                        Lists
                                    </Button>
                                </div>

                                <Separator className="my-6" />

                                <Button variant="destructive" className="w-full">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {activeTab === 'profile' && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Profile Information</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleProfileEdit}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        {isEditing ? 'Cancel' : 'Edit Profile'}
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium">Full Name</label>
                                                <Input
                                                    value={editedProfile.fullName}
                                                    onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">Bio</label>
                                                <textarea
                                                    className="w-full p-2 border rounded-md"
                                                    value={editedProfile.bio}
                                                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                                                    rows={4}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">Location</label>
                                                <Input
                                                    value={editedProfile.location}
                                                    onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                                                />
                                            </div>
                                            <Button onClick={handleSaveProfile}>Save Changes</Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                                            <span>{userData.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span>Joined {userData.joinDate}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                                            <span>{userData.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="p-3 bg-secondary/10 rounded-lg">
                                                            <p className="text-sm text-muted-foreground">Movies Watched</p>
                                                            <p className="text-2xl font-bold">{userData.stats.moviesWatched}</p>
                                                        </div>
                                                        <div className="p-3 bg-secondary/10 rounded-lg">
                                                            <p className="text-sm text-muted-foreground">Reviews</p>
                                                            <p className="text-2xl font-bold">{userData.stats.reviewsWritten}</p>
                                                        </div>
                                                        <div className="p-3 bg-secondary/10 rounded-lg">
                                                            <p className="text-sm text-muted-foreground">Lists</p>
                                                            <p className="text-2xl font-bold">{userData.stats.listsCreated}</p>
                                                        </div>
                                                        <div className="p-3 bg-secondary/10 rounded-lg">
                                                            <p className="text-sm text-muted-foreground">Followers</p>
                                                            <p className="text-2xl font-bold">{userData.stats.followers}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Bio</h3>
                                                <p className="text-muted-foreground">{userData.bio}</p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'settings' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Eye className="h-4 w-4" />
                                                    <span>Public Profile</span>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    {userData.preferences.publicProfile ? 'Public' : 'Private'}
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Film className="h-4 w-4" />
                                                    <span>Show Watchlist</span>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    {userData.preferences.showWatchlist ? 'Visible' : 'Hidden'}
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Star className="h-4 w-4" />
                                                    <span>Show Ratings</span>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    {userData.preferences.showRatings ? 'Visible' : 'Hidden'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    <span>Email Notifications</span>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    {userData.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Security</h3>
                                        <div className="space-y-4">
                                            <Button variant="outline" className="w-full justify-start">
                                                <Key className="mr-2 h-4 w-4" />
                                                Change Password
                                            </Button>
                                            <Button variant="outline" className="w-full justify-start">
                                                <Shield className="mr-2 h-4 w-4" />
                                                Two-Factor Authentication
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'activity' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {userData.recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex gap-4">
                                                <img
                                                    src={activity.moviePoster}
                                                    alt={activity.movie}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold">{activity.movie}</h4>
                                                        <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                                                    </div>
                                                    {activity.type === 'rating' ? (
                                                        <div className="flex items-center gap-2">
                                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                            <span>Rated {activity.rating}/5</span>
                                                        </div>
                                                    ) : (
                                                        <p className="text-muted-foreground">{activity.content}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'lists' && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>My Lists</CardTitle>
                                    <Button variant="outline" size="sm">
                                        Create New List
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {userData.customLists.map((list) => (
                                            <Card key={list.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold">{list.name}</h4>
                                                        <span className="text-sm text-muted-foreground">
                                                            {list.isPublic ? 'Public' : 'Private'}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        {list.count} movies
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            Share
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 
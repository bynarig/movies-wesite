import Navbar from "@/components/Navbar.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
    User,
    Star,
    Heart,
    Bookmark,
    Calendar,
    Globe,
    MessageSquare,
    Film,
    Award,
    History,
    List,
    Share2,
    Users,
    ThumbsUp,
    MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useParams } from "react-router";

// Mock user data (this would come from an API in a real app)
const userData = {
    id: 1,
    username: "johndoe",
    fullName: "John Doe",
    avatar: "https://i.pravatar.cc/300?img=1",
    joinDate: "2023-01-15",
    bio: "Movie enthusiast and film critic. Love exploring different genres and sharing thoughts about cinema.",
    location: "New York, USA",
    isFollowing: false,
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
    publicLists: [
        {
            id: 1,
            name: "Favorite Sci-Fi Movies",
            count: 25,
            description: "A collection of my favorite science fiction films that have shaped the genre.",
            lastUpdated: "2024-03-15"
        }
    ],
    favoriteGenres: [
        { name: "Science Fiction", count: 45 },
        { name: "Drama", count: 38 },
        { name: "Thriller", count: 32 },
        { name: "Action", count: 28 }
    ],
    topRatedMovies: [
        {
            id: 1,
            title: "The Last Adventure",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            rating: 4.5,
            year: 2024
        },
        {
            id: 2,
            title: "Eternal Echoes",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            rating: 4.8,
            year: 2023
        }
    ]
};

export default function UserProfilePage() {
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'lists' | 'favorites'>('overview');
    const [isFollowing, setIsFollowing] = useState(userData.isFollowing);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // Here you would typically make an API call to follow/unfollow the user
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center md:items-start">
                                <img
                                    src={userData.avatar}
                                    alt={userData.fullName}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 mb-4"
                                />
                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl font-bold">{userData.fullName}</h1>
                                    <p className="text-muted-foreground">@{userData.username}</p>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <Button
                                        variant={isFollowing ? "outline" : "default"}
                                        onClick={handleFollow}
                                        className="flex items-center gap-2"
                                    >
                                        <Users className="h-4 w-4" />
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Message
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Share Profile
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                        <p className="text-sm text-muted-foreground">Movies</p>
                                        <p className="text-2xl font-bold">{userData.stats.moviesWatched}</p>
                                    </div>
                                    <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                        <p className="text-sm text-muted-foreground">Reviews</p>
                                        <p className="text-2xl font-bold">{userData.stats.reviewsWritten}</p>
                                    </div>
                                    <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                        <p className="text-sm text-muted-foreground">Followers</p>
                                        <p className="text-2xl font-bold">{userData.stats.followers}</p>
                                    </div>
                                    <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                        <p className="text-sm text-muted-foreground">Following</p>
                                        <p className="text-2xl font-bold">{userData.stats.following}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    <Button
                        variant={activeTab === 'overview' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </Button>
                    <Button
                        variant={activeTab === 'activity' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('activity')}
                    >
                        Activity
                    </Button>
                    <Button
                        variant={activeTab === 'lists' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('lists')}
                    >
                        Lists
                    </Button>
                    <Button
                        variant={activeTab === 'favorites' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('favorites')}
                    >
                        Favorites
                    </Button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {activeTab === 'overview' && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-4">{userData.bio}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>Joined {userData.joinDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Globe className="h-4 w-4" />
                                            <span>{userData.location}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Favorite Genres</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            {userData.favoriteGenres.map((genre) => (
                                                <div key={genre.name} className="p-3 bg-secondary/10 rounded-lg">
                                                    <p className="font-semibold">{genre.name}</p>
                                                    <p className="text-sm text-muted-foreground">{genre.count} movies</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Top Rated Movies</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {userData.topRatedMovies.map((movie) => (
                                                <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                                                    <Card className="overflow-hidden hover:shadow-lg transition-all">
                                                        <div className="relative">
                                                            <img
                                                                src={movie.poster}
                                                                alt={movie.title}
                                                                className="w-full h-[200px] object-cover"
                                                            />
                                                            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                                                <span className="text-yellow-500 font-bold">{movie.rating}</span>
                                                                <span className="text-yellow-500"> ⭐</span>
                                                            </div>
                                                        </div>
                                                        <CardContent className="p-3">
                                                            <h4 className="font-semibold">{movie.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{movie.year}</p>
                                                        </CardContent>
                                                    </Card>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
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
                                <CardHeader>
                                    <CardTitle>Public Lists</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4">
                                        {userData.publicLists.map((list) => (
                                            <Card key={list.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold">{list.name}</h4>
                                                        <span className="text-sm text-muted-foreground">
                                                            {list.count} movies
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        {list.description}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">
                                                            Last updated: {list.lastUpdated}
                                                        </span>
                                                        <Button variant="outline" size="sm">
                                                            View List
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'favorites' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Favorite Movies</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {userData.topRatedMovies.map((movie) => (
                                            <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                                                <Card className="overflow-hidden hover:shadow-lg transition-all">
                                                    <div className="relative">
                                                        <img
                                                            src={movie.poster}
                                                            alt={movie.title}
                                                            className="w-full h-[200px] object-cover"
                                                        />
                                                        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                                            <span className="text-yellow-500 font-bold">{movie.rating}</span>
                                                            <span className="text-yellow-500"> ⭐</span>
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-3">
                                                        <h4 className="font-semibold">{movie.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{movie.year}</p>
                                                    </CardContent>
                                                </Card>
                                            </NavLink>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Film className="h-4 w-4 text-muted-foreground" />
                                            <span>Movies Watched</span>
                                        </div>
                                        <span className="font-semibold">{userData.stats.moviesWatched}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                            <span>Reviews Written</span>
                                        </div>
                                        <span className="font-semibold">{userData.stats.reviewsWritten}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <List className="h-4 w-4 text-muted-foreground" />
                                            <span>Lists Created</span>
                                        </div>
                                        <span className="font-semibold">{userData.stats.listsCreated}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Reviews</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {userData.recentActivity
                                        .filter(activity => activity.type === 'review')
                                        .map((review) => (
                                            <div key={review.id} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold">{review.movie}</h4>
                                                    <span className="text-sm text-muted-foreground">{review.timestamp}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{review.content}</p>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <button className="flex items-center gap-1">
                                                        <ThumbsUp className="h-4 w-4" />
                                                        <span>Like</span>
                                                    </button>
                                                    <button className="flex items-center gap-1">
                                                        <MessageCircle className="h-4 w-4" />
                                                        <span>Comment</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
} 
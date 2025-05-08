import Navbar from "@/components/Navbar.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {VideoPlayer} from "@/components/videoplayer/player.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import {
    Star,
    Heart,
    Bookmark,
    Clock,
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
    Play,
    Plus,
    ChevronDown,
    ChevronUp,
    Info,
    Users2,
    Tv,
    Clock4,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

// Mock series data
const seriesData = {
    id: 1,
    title: "The Last Adventure",
    description: "A thrilling journey through time and space, following a group of explorers as they uncover the mysteries of an ancient civilization.",
    year: 2024,
    actors: [
        { id: 1, name: "John Smith", character: "Captain James", image: "https://i.pravatar.cc/300?img=1" },
        { id: 2, name: "Emma Johnson", character: "Dr. Sarah", image: "https://i.pravatar.cc/300?img=2" },
        { id: 3, name: "Michael Brown", character: "Engineer Mike", image: "https://i.pravatar.cc/300?img=3" }
    ],
    director: "Christopher Nolan",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    trailer: "https://www.youtube.com/watch?v=oPSsOYD3rXE",
    genre: ["Science Fiction", "Adventure", "Drama"],
    rating: 4.5,
    runtime: "45 min",
    country: "USA",
    language: "English",
    imdbLink: "https://www.imdb.com/title/tt1234567",
    likes: 1234,
    awards: ["Best Series 2024", "Outstanding Visual Effects"],
    budget: "$50M per season",
    boxOffice: "$200M",
    releaseDate: "2024-01-15",
    production: "Warner Bros. Television",
    ageRating: "TV-14",
    status: "Ongoing",
    network: "HBO",
    seasons: [
        {
            id: 1,
            number: 1,
            title: "Season 1",
            episodes: [
                {
                    id: 1,
                    number: 1,
                    title: "The Beginning",
                    description: "The journey begins as our heroes discover a mysterious artifact.",
                    runtime: "45 min",
                    airDate: "2024-01-15",
                    rating: 4.5,
                    image: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ"
                },
                {
                    id: 2,
                    number: 2,
                    title: "First Contact",
                    description: "The team makes first contact with the ancient civilization.",
                    runtime: "42 min",
                    airDate: "2024-01-22",
                    rating: 4.3,
                    image: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ"
                }
            ]
        },
        {
            id: 2,
            number: 2,
            title: "Season 2",
            episodes: [
                {
                    id: 3,
                    number: 1,
                    title: "New Horizons",
                    description: "The team faces new challenges in their quest.",
                    runtime: "48 min",
                    airDate: "2024-07-15",
                    rating: 4.7,
                    image: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ"
                }
            ]
        }
    ],
    similarSeries: [
        {
            id: 2,
            title: "Eternal Echoes",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            rating: 4.8,
            year: 2023
        },
        {
            id: 3,
            title: "Future Horizons",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            rating: 4.6,
            year: 2024
        }
    ],
    comments: [
        {
            id: 1,
            user: {
                id: 1,
                name: "John Doe",
                avatar: "https://i.pravatar.cc/300?img=1"
            },
            rating: 4.5,
            content: "Amazing series! The character development is incredible.",
            timestamp: "2 hours ago",
            likes: 12
        },
        {
            id: 2,
            user: {
                id: 2,
                name: "Jane Smith",
                avatar: "https://i.pravatar.cc/300?img=2"
            },
            rating: 5,
            content: "Best sci-fi series I've watched this year!",
            timestamp: "1 day ago",
            likes: 8
        }
    ]
};

export default function SeriesPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedSeason, setSelectedSeason] = useState(seriesData.seasons[0]);
    const [expandedEpisodes, setExpandedEpisodes] = useState<number[]>([]);

    const toggleEpisode = (episodeId: number) => {
        setExpandedEpisodes(prev =>
            prev.includes(episodeId)
                ? prev.filter(id => id !== episodeId)
                : [...prev, episodeId]
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            
            {/* Hero Section with Video Player */}
            <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full">
                <VideoPlayer
                    src={seriesData.trailer}
                    title={seriesData.title}
                    poster={seriesData.poster}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <div className="container mx-auto">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{seriesData.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-muted-foreground">
                            <span>{seriesData.year}</span>
                            <span>•</span>
                            <span>{seriesData.runtime}</span>
                            <span>•</span>
                            <span>{seriesData.genre.join(", ")}</span>
                            <span>•</span>
                            <span>{seriesData.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Button className="flex items-center gap-2">
                                <Play className="h-4 w-4" />
                                Watch Now
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Bookmark className="h-4 w-4" />
                                Save
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Share2 className="h-4 w-4" />
                                Share
                            </Button>
                        </div>

                        {/* Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                                <TabsTrigger value="comments">Comments</TabsTrigger>
                                <TabsTrigger value="similar">Similar Series</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-4">{seriesData.description}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="font-semibold mb-2">Series Info</h3>
                                                <div className="space-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Release Date: {seriesData.releaseDate}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Tv className="h-4 w-4" />
                                                        <span>Network: {seriesData.network}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock4 className="h-4 w-4" />
                                                        <span>Runtime: {seriesData.runtime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="h-4 w-4" />
                                                        <span>Country: {seriesData.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Production</h3>
                                                <div className="space-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Film className="h-4 w-4" />
                                                        <span>Production: {seriesData.production}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users2 className="h-4 w-4" />
                                                        <span>Director: {seriesData.director}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Award className="h-4 w-4" />
                                                        <span>Age Rating: {seriesData.ageRating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Cast</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {seriesData.actors.map((actor) => (
                                                <div key={actor.id} className="flex items-center gap-3">
                                                    <img
                                                        src={actor.image}
                                                        alt={actor.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{actor.name}</p>
                                                        <p className="text-sm text-muted-foreground">{actor.character}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="episodes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Episodes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {seriesData.seasons.map((season) => (
                                                <div key={season.id}>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-xl font-semibold">{season.title}</h3>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setSelectedSeason(season)}
                                                            className={selectedSeason.id === season.id ? "bg-primary text-primary-foreground" : ""}
                                                        >
                                                            Select Season
                                                        </Button>
                                                    </div>
                                                    {selectedSeason.id === season.id && (
                                                        <div className="space-y-4">
                                                            {season.episodes.map((episode) => (
                                                                <Card key={episode.id}>
                                                                    <CardContent className="p-4">
                                                                        <div className="flex gap-4">
                                                                            <img
                                                                                src={episode.image}
                                                                                alt={episode.title}
                                                                                className="w-32 h-20 object-cover rounded-lg"
                                                                            />
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center justify-between mb-2">
                                                                                    <h4 className="font-semibold">
                                                                                        {episode.number}. {episode.title}
                                                                                    </h4>
                                                                                    <Button
                                                                                        variant="ghost"
                                                                                        size="sm"
                                                                                        onClick={() => toggleEpisode(episode.id)}
                                                                                    >
                                                                                        {expandedEpisodes.includes(episode.id) ? (
                                                                                            <ChevronUp className="h-4 w-4" />
                                                                                        ) : (
                                                                                            <ChevronDown className="h-4 w-4" />
                                                                                        )}
                                                                                    </Button>
                                                                                </div>
                                                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                                                                    <span>{episode.runtime}</span>
                                                                                    <span>•</span>
                                                                                    <span>{episode.airDate}</span>
                                                                                    <span>•</span>
                                                                                    <div className="flex items-center gap-1">
                                                                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                                                        <span>{episode.rating}</span>
                                                                                    </div>
                                                                                </div>
                                                                                {expandedEpisodes.includes(episode.id) && (
                                                                                    <div className="mt-2">
                                                                                        <p className="text-sm text-muted-foreground mb-4">
                                                                                            {episode.description}
                                                                                        </p>
                                                                                        <Button className="flex items-center gap-2">
                                                                                            <Play className="h-4 w-4" />
                                                                                            Watch Episode
                                                                                        </Button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="comments">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Comments</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {seriesData.comments.map((comment) => (
                                                <div key={comment.id} className="flex gap-4">
                                                    <img
                                                        src={comment.user.avatar}
                                                        alt={comment.user.name}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div>
                                                                <h4 className="font-semibold">{comment.user.name}</h4>
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                                    <span>{comment.rating}</span>
                                                                    <span>•</span>
                                                                    <span>{comment.timestamp}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-muted-foreground mb-2">{comment.content}</p>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <button className="flex items-center gap-1">
                                                                <ThumbsUp className="h-4 w-4" />
                                                                <span>Like ({comment.likes})</span>
                                                            </button>
                                                            <button className="flex items-center gap-1">
                                                                <MessageCircle className="h-4 w-4" />
                                                                <span>Reply</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="similar">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Similar Series</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {seriesData.similarSeries.map((series) => (
                                                <NavLink key={series.id} to={`/series/${series.id}`}>
                                                    <Card className="overflow-hidden hover:shadow-lg transition-all">
                                                        <div className="relative">
                                                            <img
                                                                src={series.poster}
                                                                alt={series.title}
                                                                className="w-full h-[200px] object-cover"
                                                            />
                                                            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                                                <span className="text-yellow-500 font-bold">{series.rating}</span>
                                                                <span className="text-yellow-500"> ⭐</span>
                                                            </div>
                                                        </div>
                                                        <CardContent className="p-3">
                                                            <h4 className="font-semibold">{series.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{series.year}</p>
                                                        </CardContent>
                                                    </Card>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Series Info</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span>Rating</span>
                                        </div>
                                        <span className="font-semibold">{seriesData.rating}/5</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-4 w-4 text-red-500" />
                                            <span>Likes</span>
                                        </div>
                                        <span className="font-semibold">{seriesData.likes}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Tv className="h-4 w-4 text-muted-foreground" />
                                            <span>Seasons</span>
                                        </div>
                                        <span className="font-semibold">{seriesData.seasons.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>Total Episodes</span>
                                        </div>
                                        <span className="font-semibold">
                                            {seriesData.seasons.reduce((acc, season) => acc + season.episodes.length, 0)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Awards & Recognition</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {seriesData.awards.map((award, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Award className="h-4 w-4 text-yellow-500" />
                                            <span>{award}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Production Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Budget</h4>
                                        <p className="text-muted-foreground">{seriesData.budget}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Box Office</h4>
                                        <p className="text-muted-foreground">{seriesData.boxOffice}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Status</h4>
                                        <p className="text-muted-foreground">{seriesData.status}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
} 
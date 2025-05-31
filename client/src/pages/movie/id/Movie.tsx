import Navbar from "@/components/Navbar.tsx";
import {VideoPlayer} from "@/components/videoplayer/player.tsx";
import {NavLink} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    PlayCircle,
    ExternalLink,
    MessageSquare,
    Film,
    Heart,
    Bookmark,
    Clock,
    ThumbsUp,
    Reply,
    Share2,
    Star,
    Calendar,
    Globe,
    Languages,
    Clock as ClockIcon,
    Users,
    Award,
    Info
} from "lucide-react";
import {useState} from "react";
import {CommentRatings} from "@/components/videoplayer/components/rating.tsx";
import {useUserStore} from "@/store/userStore.ts";
import {TrimmedComment} from "@/components/trimmed-comment.tsx";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs.tsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

const movieData = {
    title: "The Last Adventure",
    src: "https://ashdi.vip/video06/1/films/1408_teatralna_versya__1408_theatrical_cut_2007_107113/hls/BqiXi3+HjuRUmxH+BYk=/index.m3u8",
    description: "An epic journey through time and space, where heroes face their greatest challenges yet. As they navigate through parallel dimensions and encounter ancient civilizations, they must make difficult choices that will determine the fate of multiple worlds. The stunning visuals and compelling narrative make this a must-watch for sci-fi enthusiasts.",
    year: 2024,
    actors: ["John Smith", "Emma Johnson", "Michael Brown", "Sarah Wilson", "David Lee"],
    director: "Christopher Nolan",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    genre: ["Action", "Adventure", "Sci-Fi", "Drama"],
    rating: 8.5,
    runtime: 120,
    country: "USA",
    language: "English",
    imdb: "https://www.imdb.com/title/tt0000000/",
    likes: 3542,
    awards: ["Best Visual Effects", "Best Sound Design", "Best Original Score"],
    budget: "$150,000,000",
    boxOffice: "$450,000,000",
    releaseDate: "2024-03-15",
    production: "Paramount Pictures",
    ageRating: "PG-13",
    similarMovies: [
        {
            id: 1,
            title: "Future Frontiers",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            rating: 8.7,
            year: 2023
        },
        {
            id: 2,
            title: "Eternal Echoes",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            rating: 8.5,
            year: 2023
        },
        {
            id: 3,
            title: "Midnight Mystery",
            poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
            rating: 8.3,
            year: 2023
        }
    ]
};

// Mock data for comments
const comments = [
    {
        id: 1,
        user: "Alex Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        text: "Great movie! I loved the plot twists and the character development. The cinematography was also outstanding.",
        timestamp: "2 hours ago",
        likes: 12,
        rating: 4,
    },
    {
        id: 2,
        user: "Sam Wilson",
        avatar: "https://i.pravatar.cc/150?img=2",
        text: "The acting was superb, especially by the lead actor. I was completely immersed in the story from beginning to end.",
        timestamp: "5 hours ago",
        likes: 8,
        rating: 3
    },
    {
        id: 3,
        user: "Taylor Reed",
        avatar: "https://i.pravatar.cc/150?img=3",
        text: "I didn't expect that ending! Mind blown. Definitely going to watch it again to catch all the subtle hints I missed.",
        timestamp: "1 day ago",
        likes: 24,
        rating: 5
    },
];

export default function MoviePage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'similar'>('overview');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const isSignedUp = useUserStore((state) => state.isSignedUp);

    return (
        <div className="min-h-screen bg-background">
            
            
            {/* Hero Section with Video Player */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background pointer-events-none z-10"/>
                <VideoPlayer
                    src={movieData.src}
                    title={movieData.title}
                    poster={movieData.poster}
                    className="w-full h-[70vh] object-cover"
                />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-20">
                {/* Movie Info Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3">
                                <Card className="overflow-hidden">
                                    <img
                                        src={movieData.poster}
                                        alt={`${movieData.title} poster`}
                                        className="w-full h-auto object-cover"
                                    />
                                </Card>
                            </div>
                            <div className="md:w-2/3">
                                <h1 className="text-4xl font-bold mb-4">{movieData.title}</h1>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500"/>
                                        <span className="font-bold">{movieData.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-muted-foreground"/>
                                        <span>{movieData.year}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="h-5 w-5 text-muted-foreground"/>
                                        <span>{movieData.runtime} min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-5 w-5 text-muted-foreground"/>
                                        <span>{movieData.country}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {movieData.genre.map((genre, index) => (
                                        <span key={index} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6">{movieData.description}</p>
                                <div className="flex flex-wrap gap-4">
                                    <Button size="lg" className="flex items-center gap-2">
                                        <PlayCircle className="h-5 w-5"/> Watch Now
                                    </Button>
                                    <Button size="lg" variant="outline" className="flex items-center gap-2">
                                        <Clock className="h-5 w-5"/> Watch Later
                                    </Button>
                                    <Button size="lg" variant="outline" className="flex items-center gap-2">
                                        <Share2 className="h-5 w-5"/> Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Movie Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Release Date</span>
                                    <span>{movieData.releaseDate}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Budget</span>
                                    <span>{movieData.budget}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Box Office</span>
                                    <span>{movieData.boxOffice}</span>
                                </div>
                                <Separator/>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">IMDb Rating</span>
                                    <NavLink to={movieData.imdb} target="_blank" className="flex items-center gap-1 text-primary hover:underline">
                                        <span>{movieData.rating}</span>
                                        <ExternalLink className="h-4 w-4"/>
                                    </NavLink>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Likes</span>
                                    <div className="flex items-center gap-1">
                                        <Heart className="h-4 w-4 text-primary"/>
                                        <span>{movieData.likes.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button 
                                    variant="outline" 
                                    className="w-full flex items-center justify-center gap-2"
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                >
                                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary' : ''}`}/>
                                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full flex items-center justify-center gap-2"
                                    onClick={() => setIsWatchLater(!isWatchLater)}
                                >
                                    <Clock className={`h-4 w-4 ${isWatchLater ? 'fill-primary/20 stroke-primary' : ''}`}/>
                                    {isWatchLater ? 'Added to Watch Later' : 'Watch Later'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* Tabs Section - Now below both main content and sidebar */}
                <div className="w-full">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full flex justify-center mb-8">
                            <TabsTrigger value="overview" className="flex-1 md:flex-none">Overview</TabsTrigger>
                            <TabsTrigger value="comments" className="flex-1 md:flex-none">Comments</TabsTrigger>
                            <TabsTrigger value="similar" className="flex-1 md:flex-none">Similar Movies</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Movie Details</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-5 w-5 text-muted-foreground"/>
                                                    <span><strong>Director:</strong> {movieData.director}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Languages className="h-5 w-5 text-muted-foreground"/>
                                                    <span><strong>Language:</strong> {movieData.language}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Info className="h-5 w-5 text-muted-foreground"/>
                                                    <span><strong>Age Rating:</strong> {movieData.ageRating}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Film className="h-5 w-5 text-muted-foreground"/>
                                                    <span><strong>Production:</strong> {movieData.production}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Cast</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {movieData.actors.map((actor, index) => (
                                                    <span key={index} className="px-3 py-1 bg-secondary/20 rounded-full text-sm">
                                                        {actor}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="my-6"/>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Awards & Recognition</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {movieData.awards.map((award, index) => (
                                                <div key={index} className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-full">
                                                    <Award className="h-4 w-4 text-yellow-500"/>
                                                    <span className="text-sm">{award}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="comments">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        {comments.map(comment => (
                                            <div key={comment.id} className="p-4 rounded-lg bg-secondary/10">
                                                <div className="flex items-start gap-4">
                                                    <img
                                                        src={comment.avatar}
                                                        alt={`${comment.user}'s avatar`}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-semibold">{comment.user}</h4>
                                                                <CommentRatings rating={comment.rating} variant="yellow" isDisplayOnly={true}/>
                                                            </div>
                                                            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                                                        </div>
                                                        <p className="text-muted-foreground mb-3">{comment.text}</p>
                                                        <div className="flex items-center gap-4">
                                                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                                <ThumbsUp className="h-4 w-4"/>
                                                                <span>{comment.likes}</span>
                                                            </button>
                                                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                                <Reply className="h-4 w-4"/>
                                                                <span>Reply</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {isSignedUp ? (
                                            <div className="mt-6 bg-secondary/5 p-4 rounded-lg border border-border/50">
                                                <div className="flex gap-4">
                                                    <img
                                                        src="https://i.pravatar.cc/150?img=5"
                                                        alt="Your avatar"
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h4 className="font-semibold">Add your thoughts</h4>
                                                            <CommentRatings rating={0} variant="yellow"/>
                                                        </div>
                                                        <textarea
                                                            className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all mb-3"
                                                            placeholder="Share your thoughts about this movie..."
                                                            rows={3}
                                                        />
                                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                                            <p className="text-sm text-muted-foreground">
                                                                Be respectful and constructive in your comments.
                                                            </p>
                                                            <Button>Post Comment</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-6">
                                                <p className="text-muted-foreground mb-4">Sign in to join the discussion</p>
                                                <NavLink to="/signin">
                                                    <Button>Sign In</Button>
                                                </NavLink>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="similar">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {movieData.similarMovies.map((movie) => (
                                    <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                                        <Card className="overflow-hidden hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer">
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
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold mb-2">{movie.title}</h3>
                                                <p className="text-sm text-muted-foreground">{movie.year}</p>
                                            </CardContent>
                                        </Card>
                                    </NavLink>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

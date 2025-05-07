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
import {PlayCircle, ExternalLink, MessageSquare, Film, Heart, Bookmark, Clock, ThumbsUp, Reply} from "lucide-react";
import {useState} from "react";
import {CommentRatings} from "@/components/videoplayer/components/rating.tsx";
import {useUserStore} from "@/store/userStore.ts";
import {TrimmedComment} from "@/components/trimmed-comment.tsx";

const movieData = {
    title: "Movie NAME",
    src: "https://ashdi.vip/video06/1/films/1408_teatralna_versya__1408_theatrical_cut_2007_107113/hls/BqiXi3+HjuRUmxH+BYk=/index.m3u8",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    year: 2021,
    actors: ["<NAME>", "<NAME>", "<NAME>"],
    director: "<NAME>",
    poster: "https://uakino.me/uploads/mini/poster/cb/f281d17f3dd81987b4edcf6deabef2.webp",
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    genre: ["Action", "Adventure", "Comedy"],
    rating: 8.5,
    runtime: 120,
    country: "USA",
    language: "English",
    imdb: "https://www.imdb.com/title/tt0000000/",
    likes: 3542,
}
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

// Mock data for movie recommendations
const recommendations = [
    {
        id: 1,
        title: "The Adventure Begins",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 8.2,
        year: 2020,
        likes: 1245,
        isBookmarked: false,
        isWatchLater: true
    },

    {
        id: 2,
        title: "Midnight Mystery",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 7.9,
        year: 2019,
        likes: 876,
        isBookmarked: true,
        isWatchLater: false
    },
    {
        id: 4,
        title: "Midnight Mystery",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 7.9,
        year: 2019,
        likes: 876,
        isBookmarked: true,
        isWatchLater: false
    },
    {
        id: 4,
        title: "Midnight Mystery",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 7.9,
        year: 2019,
        likes: 876,
        isBookmarked: true,
        isWatchLater: false
    }, {
        id: 5,
        title: "Midnight Mystery",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 7.9,
        year: 2019,
        likes: 876,
        isBookmarked: true,
        isWatchLater: false
    }, {
        id: 6,
        title: "Midnight Mystery",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 7.9,
        year: 2019,
        likes: 876,
        isBookmarked: true,
        isWatchLater: false
    }, {
        id: 9,
        title: "Midnight Mystery",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 7.9,
        year: 2019,
        likes: 876,
        isBookmarked: true,
        isWatchLater: false
    }, {
        id: 7,
        title: "Midnight Mystery",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 7.9,
        year: 2019,
        likes: 876,
        isBookmarked: true,
        isWatchLater: false
    },


    {
        id: 8,
        title: "Future Frontiers",
        poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
        rating: 8.7,
        year: 2022,
        likes: 2103,
        isBookmarked: false,
        isWatchLater: false
    },
];
export default function MoviePage() {
    const [activeTab, setActiveTab] = useState<'comments' | 'recommendations'>('recommendations');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const isSignedUp = useUserStore((state) => state.isSignedUp)


    return (
        <div className="min-h-screen bg-background relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background pointer-events-none"/>

            <Navbar/>
            <div className="container mx-auto py-8 px-4 relative">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Video Player Section */}
                    <div className="lg:w-2/3">
                        <VideoPlayer
                            src={movieData.src}
                            title={movieData.title}
                            poster={movieData.poster}
                            className="overflow-hidden  transition-shadow"
                        />
                    </div>

                    {/* Movie Details Section */}
                    <div className="lg:w-1/3">
                        <Card className="shadow-lg hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img
                                    src={movieData.poster}
                                    alt={`${movieData.title} poster`}
                                    className="w-full h-[200px] object-contain hidden 2xl:flex"
                                />
                                <div
                                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                    <span className="text-yellow-500 font-bold">{movieData.rating}</span>
                                    <span className="text-yellow-500"> ⭐</span>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">{movieData.title}</CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{movieData.year}</span>
                                    <span>•</span>
                                    <span>{movieData.runtime} min</span>
                                    <span>•</span>
                                    <span>{movieData.country}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {movieData.genre.map((genre, index) => (
                                        <span
                                            key={index}
                                            className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs transition-all hover:bg-primary/20 cursor-pointer"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">


                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-1">Director</h3>
                                        <p className="text-sm text-muted-foreground">{movieData.director}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Language</h3>
                                        <p className="text-sm text-muted-foreground">{movieData.language}</p>
                                    </div>
                                </div>

                                <Separator/>

                                <div>
                                    <h3 className="font-semibold mb-1">Cast</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movieData.actors.map((actor, index) => (
                                            <span key={index} className="text-sm text-muted-foreground">
                                                {actor}{index < movieData.actors.length - 1 ? "," : ""}
                                            </span>
                                        ))}
                                    </div>
                                </div>


                            </CardContent>
                            <CardFooter className="flex flex-col gap-3">
                                <div
                                    className="flex justify-between items-center w-full mb-2 pb-3 border-b border-border/30">
                                    <button
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className={`flex items-center gap-1 text-sm ${isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'} transition-colors`}
                                    >
                                        <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary' : ''}`}/>
                                        <span>Bookmark</span>
                                    </button>

                                    <button
                                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                                        <Heart className="h-5 w-5"/>
                                        <span>{movieData.likes.toLocaleString()}</span>
                                    </button>

                                    <button
                                        onClick={() => setIsWatchLater(!isWatchLater)}
                                        className={`flex items-center gap-1 text-sm ${isWatchLater ? 'text-primary' : 'text-muted-foreground hover:text-primary'} transition-colors`}
                                    >
                                        <Clock
                                            className={`h-5 w-5 ${isWatchLater ? 'fill-primary/20 stroke-primary' : ''}`}/>
                                        <span>Watch Later</span>
                                    </button>
                                </div>
                                <div className="flex flex-row w-full">
                                    <Button
                                        variant="default"
                                        className="w-1/2 group transition-all hover:shadow-md hover:translate-y-[-2px]"
                                        asChild
                                    >
                                        <a href={movieData.trailer} target="_blank" rel="noopener noreferrer">
                                            <PlayCircle className="mr-2 h-4 w-4 group-hover:animate-pulse"/>
                                            Watch Trailer
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-1/2 group transition-all hover:bg-secondary"
                                        asChild
                                    >
                                        <NavLink to={movieData.imdb}>
                                            <ExternalLink
                                                className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform"/>
                                            View on IMDB
                                        </NavLink>
                                    </Button>
                                </div>


                                <div>
                                    <h3 className="font-semibold mb-1">Description</h3>
                                    <TrimmedComment
                                        text={movieData.description}
                                        maxLength={180}
                                        className="text-sm text-muted-foreground"
                                    />
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* Comments and Recommendations Section */}
                <div className="mt-8">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <CardTitle
                                    className="text-2xl font-bold mb-[20px] md:mb-0">{activeTab === 'comments' ? "Comments" : "Recommendations"}</CardTitle>
                                <div className="flex bg-secondary/30 rounded-lg p-1">
                                    <Button
                                        variant={activeTab === 'comments' ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setActiveTab('comments')}
                                        className="flex items-center gap-2 transition-all"
                                    >
                                        <MessageSquare className="h-4 w-4"/>
                                        Comments
                                    </Button>
                                    <Button
                                        variant={activeTab === 'recommendations' ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setActiveTab('recommendations')}
                                        className="flex items-center gap-2 transition-all"
                                    >
                                        <Film className="h-4 w-4"/>
                                        Recommendations
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {activeTab === 'comments' ? (
                                <div className="space-y-4">
                                    {comments.map(comment => (
                                        <div
                                            className="p-5 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={comment.avatar}
                                                        alt={`${comment.user}'s avatar`}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className='flex flex-col md:flex-row '>
                                                            <h3 className="font-semibold text-primary/90">{comment.user}</h3>
                                                            <div className="md:ml-[10px]"><CommentRatings
                                                                rating={comment.rating} variant="yellow"
                                                                isDisplayOnly={true}/></div>

                                                        </div>

                                                        <span
                                                            className="text-xs text-muted-foreground bg-secondary/20 px-2 py-1 rounded-full">{comment.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm mb-3">{comment.text}</p>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                                            <ThumbsUp className="h-3.5 w-3.5"/>
                                                            <span>{comment.likes}</span>
                                                        </button>
                                                        <button
                                                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                                            <Reply className="h-3.5 w-3.5"/>
                                                            <span>Reply</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {
                                        isSignedUp ?
                                            <div className="mt-6 bg-secondary/5 p-4 rounded-lg border border-border/50">
                                                <div className="flex gap-3">
                                                    <div className="flex-shrink-0">

                                                    </div>
                                                    <div className="flex-1">

                                                        <div className='flex flex-row  mb-2'>

                                                            <img
                                                                src="https://i.pravatar.cc/150?img=5"
                                                                alt="Your avatar"
                                                                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                                                            />
                                                            <div className="flex flex-col md:flex-row ml-[10px]">
                                                                <h3 className="font-semibold text-primary/90">Add your
                                                                    thoughts</h3>
                                                                <div className="md:ml-[10px]">
                                                                    <CommentRatings rating={0} variant="yellow"/>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <textarea
                                                            className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all mb-3"
                                                            placeholder="Share your thoughts about this movie..."
                                                            rows={3}
                                                        />
                                                        <div
                                                            className="flex flex-col md:flex-row justify-between items-center">
                                                            <div className="text-xs text-muted-foreground text-center">
                                                                <p>Be respectful and constructive in your comments.</p>

                                                            </div>
                                                            <Button
                                                                className="transition-all hover:shadow-md hover:translate-y-[-2px] mt-[10px] md:mt-0">
                                                                Post Comment
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : (
                                                <div className='flex justify-end'>
                                                    <NavLink to="/ signin">
                                                        <Button
                                                            className="transition-all hover:shadow-md hover:translate-y-[-2px] mt-[10px] md:mt-0">
                                                            SignIn to post comments
                                                        </Button>
                                                    </NavLink>
                                                </div>
                                            )
                                    }

                                </div>
                            ) : (
                                <div className="flex flex-row space-x-4 overflow-x-scroll">
                                    {recommendations.map(movie => (
                                        <Card
                                            className="w-40  hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer">
                                            <div className="relative">
                                                <img
                                                    src={movie.poster}
                                                    alt={`${movie.title} poster`}
                                                    className="w-full h-[150px] object-cover"
                                                />
                                                <div
                                                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                                    <span className="text-yellow-500 font-bold">{movie.rating}</span>
                                                    <span className="text-yellow-500"> ⭐</span>
                                                </div>
                                            </div>
                                            <CardContent className="p-3">
                                                <h3 className="font-semibold truncate">{movie.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-3">{movie.year}</p>

                                                <div
                                                    className="flex justify-between items-center mt-2 pt-2 border-t border-border/30">
                                                    <button
                                                        className={`flex items-center gap-1 text-xs ${movie.isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'} transition-colors`}>
                                                        <Bookmark
                                                            className={`h-4 w-4 ${movie.isBookmarked ? 'fill-primary' : ''}`}/>
                                                    </button>

                                                    <button
                                                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                                        <Heart className="h-4 w-4"/>
                                                        <span>{movie.likes.toLocaleString()}</span>
                                                    </button>

                                                    <button
                                                        className={`flex items-center gap-1 text-xs ${movie.isWatchLater ? 'text-primary' : 'text-muted-foreground hover:text-primary'} transition-colors`}>
                                                        <Clock
                                                            className={`h-4 w-4 ${movie.isWatchLater ? 'fill-primary/20 stroke-primary' : ''}`}/>
                                                    </button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

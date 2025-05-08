import Navbar from "@/components/Navbar.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
    Search,
    Star,
    Film,
    Award,
    Calendar,
    Globe,
    Heart,
    Bookmark,
    Share2,
    Filter,
    ArrowUpDown,
    ChevronDown,
    ChevronUp,
    Camera,
    DollarSign,
    Users,
    Clock,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

// Mock data for directors
const directors = [
    {
        id: 1,
        name: "Christopher Nolan",
        image: "https://i.pravatar.cc/300?img=3",
        age: 53,
        nationality: "British",
        birthPlace: "London, England",
        birthDate: "1970-07-30",
        bio: "Christopher Nolan is a renowned filmmaker known for his innovative storytelling and technical mastery. His films often explore complex themes of time, memory, and identity, while pushing the boundaries of practical filmmaking.",
        rating: 9.5,
        movies: 12,
        awards: ["Oscar for Best Director", "BAFTA", "Golden Globe"],
        totalBoxOffice: "$4.7 billion",
        averageBudget: "$150 million",
        filmography: [
            {
                id: 1,
                title: "Oppenheimer",
                year: 2023,
                budget: "$100 million",
                boxOffice: "$950 million",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 8.9
            },
            {
                id: 2,
                title: "Tenet",
                year: 2020,
                budget: "$200 million",
                boxOffice: "$363 million",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 7.4
            },
            {
                id: 3,
                title: "Dunkirk",
                year: 2017,
                budget: "$100 million",
                boxOffice: "$527 million",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 7.8
            }
        ],
        upcomingMovies: [
            {
                id: 4,
                title: "Untitled Project",
                year: 2025,
                budget: "TBA",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ"
            }
        ],
        signatureStyle: [
            "Non-linear storytelling",
            "Practical effects",
            "IMAX cinematography",
            "Complex narratives",
            "Time manipulation themes"
        ]
    },
    {
        id: 2,
        name: "Denis Villeneuve",
        image: "https://i.pravatar.cc/300?img=4",
        age: 56,
        nationality: "Canadian",
        birthPlace: "Quebec, Canada",
        birthDate: "1967-10-03",
        bio: "Denis Villeneuve is a visionary director known for his atmospheric storytelling and stunning visuals. His films often explore themes of identity, memory, and human nature, with a distinctive visual style.",
        rating: 9.2,
        movies: 10,
        awards: ["BAFTA", "Canadian Screen Award", "Venice Film Festival"],
        totalBoxOffice: "$1.2 billion",
        averageBudget: "$80 million",
        filmography: [
            {
                id: 5,
                title: "Dune: Part Two",
                year: 2024,
                budget: "$190 million",
                boxOffice: "$700 million",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 8.8
            }
        ],
        upcomingMovies: [],
        signatureStyle: [
            "Atmospheric storytelling",
            "Visual grandeur",
            "Slow-burn narratives",
            "Character-driven plots",
            "Sound design emphasis"
        ]
    }
];

export default function DirectorsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedDirector, setSelectedDirector] = useState<typeof directors[0] | null>(null);

    const filteredDirectors = directors.filter(director =>
        director.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedDirectors = [...filteredDirectors].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedDirector(null);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search directors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="flex items-center gap-2"
                        >
                            <ArrowUpDown className="h-4 w-4" />
                            {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            Sort
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Directors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedDirectors.map((director) => (
                        <Card
                            key={director.id}
                            className="overflow-hidden hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer"
                            onClick={() => setSelectedDirector(director)}
                        >
                            <div className="relative">
                                <img
                                    src={director.image}
                                    alt={director.name}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                    <span className="text-yellow-500 font-bold">{director.rating}</span>
                                    <span className="text-yellow-500"> ⭐</span>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="text-xl font-bold mb-2">{director.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Film className="h-4 w-4" />
                                    <span>{director.movies} films</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Total Box Office: {director.totalBoxOffice}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Director Details Modal */}
                {selectedDirector && (
                    <div 
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto"
                        onClick={handleBackdropClick}
                    >
                        <div className="container mx-auto px-4 py-8">
                            <Card className="max-w-4xl mx-auto">
                                <CardHeader className="relative">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-4 top-4"
                                        onClick={() => setSelectedDirector(null)}
                                    >
                                        Close
                                    </Button>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3">
                                            <img
                                                src={selectedDirector.image}
                                                alt={selectedDirector.name}
                                                className="w-full rounded-lg"
                                            />
                                        </div>
                                        <div className="md:w-2/3">
                                            <CardTitle className="text-3xl mb-4">{selectedDirector.name}</CardTitle>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Age</p>
                                                    <p>{selectedDirector.age} years</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Nationality</p>
                                                    <p>{selectedDirector.nationality}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Birth Place</p>
                                                    <p>{selectedDirector.birthPlace}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Birth Date</p>
                                                    <p>{selectedDirector.birthDate}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mb-4">
                                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                                    <Heart className="h-4 w-4" />
                                                    Follow
                                                </Button>
                                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                                    <Bookmark className="h-4 w-4" />
                                                    Save
                                                </Button>
                                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                                    <Share2 className="h-4 w-4" />
                                                    Share
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Biography</h3>
                                        <p className="text-muted-foreground">{selectedDirector.bio}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Career Highlights</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                                                <Film className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total Films</p>
                                                    <p className="font-semibold">{selectedDirector.movies}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                                                <DollarSign className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total Box Office</p>
                                                    <p className="font-semibold">{selectedDirector.totalBoxOffice}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                                                <DollarSign className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Average Budget</p>
                                                    <p className="font-semibold">{selectedDirector.averageBudget}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Signature Style</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedDirector.signatureStyle.map((style, index) => (
                                                <div key={index} className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                                                    <Camera className="h-4 w-4 text-primary" />
                                                    <span className="text-sm">{style}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Awards & Recognition</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedDirector.awards.map((award, index) => (
                                                <div key={index} className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-full">
                                                    <Award className="h-4 w-4 text-yellow-500" />
                                                    <span className="text-sm">{award}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Filmography</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {selectedDirector.filmography.map((movie) => (
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
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <DollarSign className="h-4 w-4" />
                                                                <span>Budget: {movie.budget}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <DollarSign className="h-4 w-4" />
                                                                <span>Box Office: {movie.boxOffice}</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedDirector.upcomingMovies.length > 0 && (
                                        <>
                                            <Separator />
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Upcoming Projects</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {selectedDirector.upcomingMovies.map((movie) => (
                                                        <Card key={movie.id} className="overflow-hidden">
                                                            <div className="relative">
                                                                <img
                                                                    src={movie.poster}
                                                                    alt={movie.title}
                                                                    className="w-full h-[200px] object-cover"
                                                                />
                                                            </div>
                                                            <CardContent className="p-3">
                                                                <h4 className="font-semibold">{movie.title}</h4>
                                                                <p className="text-sm text-muted-foreground">{movie.year}</p>
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <DollarSign className="h-4 w-4" />
                                                                    <span>Budget: {movie.budget}</span>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 
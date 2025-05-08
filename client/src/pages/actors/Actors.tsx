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
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

// Mock data for actors
const actors = [
    {
        id: 1,
        name: "John Smith",
        image: "https://i.pravatar.cc/300?img=1",
        age: 45,
        nationality: "American",
        birthPlace: "Los Angeles, California",
        birthDate: "1978-05-15",
        bio: "John Smith is an acclaimed actor known for his versatile performances across various genres. With over 20 years of experience in the industry, he has established himself as one of the most respected actors of his generation.",
        rating: 9.2,
        movies: 45,
        awards: ["Oscar for Best Actor", "Golden Globe", "BAFTA"],
        filmography: [
            {
                id: 1,
                title: "The Last Adventure",
                year: 2024,
                role: "Lead Actor",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 8.5
            },
            {
                id: 2,
                title: "Eternal Echoes",
                year: 2023,
                role: "Supporting Actor",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 8.7
            },
            {
                id: 3,
                title: "Midnight Mystery",
                year: 2022,
                role: "Lead Actor",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 8.3
            }
        ],
        upcomingMovies: [
            {
                id: 4,
                title: "Future Horizons",
                year: 2025,
                role: "Lead Actor",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ"
            }
        ]
    },
    {
        id: 2,
        name: "Emma Johnson",
        image: "https://i.pravatar.cc/300?img=2",
        age: 38,
        nationality: "British",
        birthPlace: "London, England",
        birthDate: "1985-08-22",
        bio: "Emma Johnson is a talented actress who has made her mark in both independent and mainstream cinema. Her ability to portray complex characters has earned her critical acclaim and numerous awards.",
        rating: 8.9,
        movies: 32,
        awards: ["BAFTA", "Screen Actors Guild Award"],
        filmography: [
            {
                id: 5,
                title: "The Last Adventure",
                year: 2024,
                role: "Lead Actress",
                poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
                rating: 8.5
            }
        ],
        upcomingMovies: []
    }
];

export default function ActorsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedActor, setSelectedActor] = useState<typeof actors[0] | null>(null);

    const filteredActors = actors.filter(actor =>
        actor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedActors = [...filteredActors].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedActor(null);
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
                            placeholder="Search actors..."
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

                {/* Actors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedActors.map((actor) => (
                        <Card
                            key={actor.id}
                            className="overflow-hidden hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer"
                            onClick={() => setSelectedActor(actor)}
                        >
                            <div className="relative">
                                <img
                                    src={actor.image}
                                    alt={actor.name}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                    <span className="text-yellow-500 font-bold">{actor.rating}</span>
                                    <span className="text-yellow-500"> ⭐</span>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="text-xl font-bold mb-2">{actor.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{actor.age} years old</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Film className="h-4 w-4" />
                                    <span>{actor.movies} movies</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Actor Details Modal */}
                {selectedActor && (
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
                                        onClick={() => setSelectedActor(null)}
                                    >
                                        Close
                                    </Button>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3">
                                            <img
                                                src={selectedActor.image}
                                                alt={selectedActor.name}
                                                className="w-full rounded-lg"
                                            />
                                        </div>
                                        <div className="md:w-2/3">
                                            <CardTitle className="text-3xl mb-4">{selectedActor.name}</CardTitle>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Age</p>
                                                    <p>{selectedActor.age} years</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Nationality</p>
                                                    <p>{selectedActor.nationality}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Birth Place</p>
                                                    <p>{selectedActor.birthPlace}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Birth Date</p>
                                                    <p>{selectedActor.birthDate}</p>
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
                                        <p className="text-muted-foreground">{selectedActor.bio}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Awards & Recognition</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedActor.awards.map((award, index) => (
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
                                            {selectedActor.filmography.map((movie) => (
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
                                                            <p className="text-sm text-muted-foreground">{movie.role}</p>
                                                        </CardContent>
                                                    </Card>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedActor.upcomingMovies.length > 0 && (
                                        <>
                                            <Separator />
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Upcoming Movies</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {selectedActor.upcomingMovies.map((movie) => (
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
                                                                <p className="text-sm text-muted-foreground">{movie.role}</p>
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
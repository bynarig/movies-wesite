import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Clock, Film, Heart, PlayCircle, Star, TrendingUp, Tv} from "lucide-react";
import {NavLink} from "react-router";
import MovieCard from "@/components/MovieCard.tsx";
import type {MovieType} from "@root/types/movieTypes.ts";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"


const featuredContent = {
    title: "The Last Adventure",
    id: '1234567890',
    description: "An epic journey through time and space, where heroes face their greatest challenges yet.",
    rating: 9.2,
    releasedAt: new Date("2022-07-15"),
    genre: ["Action", "Adventure", "Sci-Fi"],
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    link: "https://www.youtube.com/watch?v=oPSsOYD3rXE",
    likes: 15420
};

const trendingMovies: MovieType[] = [
    {
        id: "1",
        title: "The Last Adventure",
        poster: "https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/X1EAAOSw-SJkZYD9/$_57.JPG?set_id=880000500F",
        trailer: "https://youtube.com/watch?v=lastadventure123",
        description: "A group of explorers discover a hidden civilization in the Amazon jungle.",
        runtime: 128,
        country: "USA",
        language: "English",
        imdb: "tt1234567",
        rating: 8.2,
        releasedAt: new Date("2022-07-15"),
        createdAt: new Date("2022-01-10"),
        updatedAt: new Date("2022-06-20"),
        likes: 12453,
    },
    {
        id: "2",
        title: "Midnight in Paris",
        poster: "https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/X1EAAOSw-SJkZYD9/$_57.JPG?set_id=880000500F",
        trailer: "https://youtube.com/watch?v=midnightparis456",
        description: "A nostalgic writer finds himself mysteriously traveling back to the 1920s every night at midnight.",
        runtime: 94,
        country: "France",
        language: "French",
        imdb: "tt2345678",
        rating: 7.7,
        releasedAt: new Date("2021-11-05"),
        createdAt: new Date("2021-03-15"),
        updatedAt: new Date("2021-10-22"),
        likes: 8765,
    },
    {
        id: "3",
        title: "Quantum Paradox",
        poster: "https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/X1EAAOSw-SJkZYD9/$_57.JPG?set_id=880000500F",
        trailer: "https://youtube.com/watch?v=quantumparadox789",
        description: "A scientist accidentally creates a time loop and must solve a quantum equation to break free.",
        runtime: 112,
        country: "UK",
        language: "English",
        imdb: "tt3456789",
        rating: 8.9,
        releasedAt: new Date("2023-03-22"),
        createdAt: new Date("2022-09-30"),
        updatedAt: new Date("2023-02-15"),
        likes: 21567,
    },
    {
        id: "4",
        title: "Quantum Paradox",
        poster: "https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/X1EAAOSw-SJkZYD9/$_57.JPG?set_id=880000500F",
        trailer: "https://youtube.com/watch?v=quantumparadox789",
        description: "A scientist accidentally creates a time loop and must solve a quantum equation to break free.",
        runtime: 112,
        country: "UK",
        language: "English",
        imdb: "tt3456789",
        rating: 8.9,
        releasedAt: new Date("2023-03-22"),
        createdAt: new Date("2022-09-30"),
        updatedAt: new Date("2023-02-15"),
        likes: 21567,
    },
    {
        id: "5",
        title: "Quantum Paradox",
        poster: "https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/X1EAAOSw-SJkZYD9/$_57.JPG?set_id=880000500F",
        trailer: "https://youtube.com/watch?v=quantumparadox789",
        description: "A scientist accidentally creates a time loop and must solve a quantum equation to break free.",
        runtime: 112,
        country: "UK",
        language: "English",
        imdb: "tt3456789",
        rating: 8.9,
        releasedAt: new Date("2023-03-22"),
        createdAt: new Date("2022-09-30"),
        updatedAt: new Date("2023-02-15"),
        likes: 21567,
    },
    {
        id: "6",
        title: "Quantum Paradox",
        poster: "https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/X1EAAOSw-SJkZYD9/$_57.JPG?set_id=880000500F",
        trailer: "https://youtube.com/watch?v=quantumparadox789",
        description: "A scientist accidentally creates a time loop and must solve a quantum equation to break free.",
        runtime: 112,
        country: "UK",
        language: "English",
        imdb: "tt3456789",
        rating: 8.9,
        releasedAt: new Date("2023-03-22"),
        createdAt: new Date("2022-09-30"),
        updatedAt: new Date("2023-02-15"),
        likes: 21567,
    }
];

// Categories data
const categories = [
    {id: "1", name: "Action", icon: <Film className="h-6 w-6"/>, count: 245},
    {id: "2", name: "Drama", icon: <Tv className="h-6 w-6"/>, count: 189},
    {id: "3", name: "Comedy", icon: <Heart className="h-6 w-6"/>, count: 156},
    {id: "4", name: "Sci-Fi", icon: <Star className="h-6 w-6"/>, count: 98}
];

export default function Main() {
    return (
        <div className="min-h-screen bg-background">


            {/* Featured Content Section */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"/>
                <img
                    src={featuredContent.poster}
                    alt={featuredContent.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{featuredContent.title}</h1>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-yellow-500 font-bold flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-500"/> {featuredContent.rating}
                        </span>
                        {/*<span className="text-muted-foreground">{featuredContent.year}</span>*/}
                        <div className="flex gap-2">
                            {featuredContent.genre.map((genre, index) => (
                                <span key={index} className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                    <p className="text-lg mb-6 text-muted-foreground">{featuredContent.description}</p>
                    <div className="flex gap-4">
                        <NavLink to={featuredContent.link}>

                            <Button size="lg" className="flex items-center gap-2">
                                <PlayCircle className="h-5 w-5"/> Watch Now
                            </Button>
                        </NavLink>

                        <Button size="lg" variant="outline" className="flex items-center gap-2">
                            <Clock className="h-5 w-5"/> Watch Later
                        </Button>

                    </div>
                </div>
            </div>

            {/* Trending Movies Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-primary"/> Trending Now
                    </h2>
                    <NavLink to="/movies">
                        <Button variant="ghost">View All</Button>
                    </NavLink>
                </div>
                <Carousel className="relative">
                    <CarouselContent className="flex pb-4 space-x-6 hide-scrollbar -ml-2 md:-ml-1">
                        {trendingMovies.map((movie, index) => (
                            <CarouselItem key={index} className="pl-1  basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div key={movie.id}
                                         >
                                        <MovieCard movie={movie}/>
                                    </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>

            {/* Categories Section */}
            <div className="container mx-auto px-4 py-12 bg-secondary/5">
                <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <NavLink key={category.id} to={`/category/${category.name.toLowerCase()}`}>
                            <Card
                                className="p-6 hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        {category.icon}
                                    </div>
                                    <h3 className="font-semibold text-lg">{category.name}</h3>
                                    <span className="text-muted-foreground">{category.count} titles</span>
                                </div>
                            </Card>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Today's Recommendations Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-primary"/> Popular this week
                    </h2>
                    <NavLink to="/movies">
                        <Button variant="ghost">View All</Button>
                    </NavLink>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingMovies.map((movie) => (
                        <MovieCard
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
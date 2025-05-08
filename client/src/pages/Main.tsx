import Navbar from "@/components/Navbar.tsx";
import {CarouselRecomendation} from "@/components/CarouselRecomendation.tsx";
import MovieImages from "@/components/MovieImages.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Star, Clock, TrendingUp, Film, Tv, Heart } from "lucide-react";
import { NavLink } from "react-router";

// Mock data for featured content
const featuredContent = {
  title: "The Last Adventure",
  description: "An epic journey through time and space, where heroes face their greatest challenges yet.",
  rating: 9.2,
  year: 2024,
  genre: ["Action", "Adventure", "Sci-Fi"],
  poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
  likes: 15420
};

// Mock data for trending movies
const trendingMovies = [
  {
    id: 1,
    title: "Eternal Echoes",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    rating: 8.5,
    year: 2024,
    likes: 12450
  },
  {
    id: 2,
    title: "Midnight Mystery",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    rating: 8.3,
    year: 2024,
    likes: 9876
  },
  {
    id: 3,
    title: "Future Frontiers",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    rating: 8.7,
    year: 2024,
    likes: 15678
  }
];

// Categories data
const categories = [
  { id: 1, name: "Action", icon: <Film className="h-6 w-6" />, count: 245 },
  { id: 2, name: "Drama", icon: <Tv className="h-6 w-6" />, count: 189 },
  { id: 3, name: "Comedy", icon: <Heart className="h-6 w-6" />, count: 156 },
  { id: 4, name: "Sci-Fi", icon: <Star className="h-6 w-6" />, count: 98 }
];

export default function Main() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar/>
            
            {/* Featured Content Section */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"/>
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
                        <span className="text-muted-foreground">{featuredContent.year}</span>
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
                        <Button size="lg" className="flex items-center gap-2">
                            <PlayCircle className="h-5 w-5"/> Watch Now
                        </Button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingMovies.map((movie) => (
                        <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                            <Card className="overflow-hidden hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer">
                                <div className="relative">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-full h-[300px] object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                                        <span className="text-yellow-500 font-bold">{movie.rating}</span>
                                        <span className="text-yellow-500"> ⭐</span>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">{movie.year}</span>
                                        <div className="flex items-center gap-1">
                                            <Heart className="h-4 w-4 text-primary"/>
                                            <span>{movie.likes.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div className="container mx-auto px-4 py-12 bg-secondary/5">
                <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <NavLink key={category.id} to={`/category/${category.name.toLowerCase()}`}>
                            <Card className="p-6 hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer">
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
                    <h2 className="text-3xl font-bold">Today's Recommendations</h2>
                    <NavLink to="/recommendations">
                        <Button variant="ghost">View All</Button>
                    </NavLink>
                </div>
                <CarouselRecomendation/>
            </div>
        </div>
    )
}
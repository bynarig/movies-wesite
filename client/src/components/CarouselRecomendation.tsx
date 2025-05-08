import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Bookmark, Clock, Heart } from "lucide-react"
import { NavLink } from "react-router"

// Mock data for recommendations - replace with actual API data later
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
    id: 3,
    title: "Future Frontiers",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    rating: 8.7,
    year: 2022,
    likes: 2103,
    isBookmarked: false,
    isWatchLater: false
  },
  {
    id: 4,
    title: "Eternal Echoes",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    rating: 8.5,
    year: 2021,
    likes: 1542,
    isBookmarked: true,
    isWatchLater: true
  },
  {
    id: 5,
    title: "Lost in Time",
    poster: "https://i.ytimg.com/vi/oPSsOYD3rXE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFXYi4cT5RqAgKzuyfrIaeBPGZCQ",
    rating: 8.0,
    year: 2023,
    likes: 987,
    isBookmarked: false,
    isWatchLater: false
  }
]

export function CarouselRecomendation() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full md:w-[1000px] max-w-[90vw]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {recommendations.map((movie) => (
          <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <NavLink to={`/movie/${movie.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all hover:translate-y-[-2px] cursor-pointer">
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={`${movie.title} poster`}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                      <span className="text-yellow-500 font-bold">{movie.rating}</span>
                      <span className="text-yellow-500"> ⭐</span>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold truncate">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{movie.year}</p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/30">
                      <button
                        className={`flex items-center gap-1 text-xs ${movie.isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'} transition-colors`}
                      >
                        <Bookmark className={`h-4 w-4 ${movie.isBookmarked ? 'fill-primary' : ''}`} />
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{movie.likes.toLocaleString()}</span>
                      </button>
                      <button
                        className={`flex items-center gap-1 text-xs ${movie.isWatchLater ? 'text-primary' : 'text-muted-foreground hover:text-primary'} transition-colors`}
                      >
                        <Clock className={`h-4 w-4 ${movie.isWatchLater ? 'fill-primary/20 stroke-primary' : ''}`} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </NavLink>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}
